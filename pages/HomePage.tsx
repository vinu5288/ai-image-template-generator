
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Template, UploadedImage } from '../types';
import { IMAGE_TEMPLATES } from '../constants';
import { generateImageFromTemplate } from '../services/geminiService';
import { UploadIcon, ElegantSpinnerIcon, DownloadIcon, ShareIcon, CloseIcon, WhatsAppIcon, FacebookIcon, InstagramIcon } from '../components/icons';

const LOADING_MESSAGES = [
    "Warming up the AI...",
    "Painting digital pixels...",
    "Styling your creation...",
    "Almost there...",
];

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseUnit: React.FC<{ publisherId: string; adSlot: string; keySuffix: string }> = ({ publisherId, adSlot, keySuffix }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [adSlot]);

  return (
    <div className="w-full text-center my-2" key={`${adSlot}-${keySuffix}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={publisherId}
           data-ad-slot={adSlot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

const ImageGenerator: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<[UploadedImage | null, UploadedImage | null]>([null, null]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        let interval: number | undefined;
        if (isLoading) {
          interval = window.setInterval(() => {
            setLoadingMessage(prev => {
              const currentIndex = LOADING_MESSAGES.indexOf(prev);
              const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
              return LOADING_MESSAGES[nextIndex];
            });
          }, 2500);
        }
        return () => clearInterval(interval);
      }, [isLoading]);

    const handleReset = () => {
        setUploadedImages([null, null]);
        setSelectedTemplateId(null);
        setGeneratedImage(null);
        setError(null);
        setIsLoading(false);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
        const file = event.target.files?.[0];
        if (file) {
          if(file.size > 4 * 1024 * 1024) {
            setError(`Image "${file.name}" is too large. Please upload files smaller than 4MB.`);
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(',')[1];
            const newImages: [UploadedImage | null, UploadedImage | null] = [...uploadedImages];
            newImages[index] = {
              base64: base64Data,
              mimeType: file.type,
              name: file.name
            };
            setUploadedImages(newImages);
            setError(null);
          };
          reader.onerror = () => {
            setError(`Failed to read the file: ${file.name}`);
          }
          reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index: 0 | 1) => {
        const newImages: [UploadedImage | null, UploadedImage | null] = [...uploadedImages];
        newImages[index] = null;
        setUploadedImages(newImages);
    };

    const handleGenerateClick = useCallback(async () => {
        if (!uploadedImages[0] || !uploadedImages[1] || !selectedTemplateId) {
          setError("Please upload two images and select a template first.");
          return;
        }
    
        const template = IMAGE_TEMPLATES.find(t => t.id === selectedTemplateId);
        if (!template) {
          setError("Invalid template selected.");
          return;
        }
    
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setLoadingMessage(LOADING_MESSAGES[0]);
    
        try {
          const result = await generateImageFromTemplate(
            [uploadedImages[0], uploadedImages[1]],
            template.prompt
          );
          setGeneratedImage(result);
          setIsModalOpen(true);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
          setIsLoading(false);
        }
    }, [uploadedImages, selectedTemplateId]);

    const selectedTemplate = useMemo(() => {
        return IMAGE_TEMPLATES.find(t => t.id === selectedTemplateId);
    }, [selectedTemplateId]);

    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        const templateName = selectedTemplate?.name.replace(/\s+/g, '_') || 'generated_image';
        link.download = `${templateName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (!generatedImage) return;
        try {
            const response = await fetch(generatedImage);
            const blob = await response.blob();
            const file = new File([blob], 'ai-generated-image.png', { type: blob.type });
    
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'AI Generated Image',
                    text: 'Check out this image I created with AI Image Styles!',
                    files: [file],
                });
            } else {
                alert("Your browser doesn't support sharing files directly. Please download the image to share it.");
            }
        } catch (err) {
            console.error("Sharing failed:", err);
            setError("Sharing failed. Please try downloading the image instead.");
        }
    };

    const handleTemplateKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, templateId: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedTemplateId(templateId);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleReset();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    const ImageUploader: React.FC<{ index: 0 | 1 }> = ({ index }) => {
        const image = uploadedImages[index];
        return (
            <div className="relative h-full bg-card rounded-lg">
                <label htmlFor={`file-upload-${index}`} className="cursor-pointer w-full h-full">
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-muted/50 h-full flex flex-col justify-center items-center">
                        {image ? (
                            <div className='flex flex-col items-center justify-center w-full h-full'>
                                <img src={`data:${image.mimeType};base64,${image.base64}`} alt={`Preview ${index + 1}`} className="max-h-32 object-contain rounded-lg mx-auto mb-2" />
                                <p className="text-muted-foreground text-xs truncate max-w-full px-2" title={image.name}>{image.name}</p>
                                <span className="mt-1 text-xs text-primary font-semibold">Change Image</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <UploadIcon className="w-10 h-10 text-muted-foreground mb-2" />
                                <span className="text-primary font-semibold text-sm">Choose Image {index + 1}</span>
                                <p className="text-muted-foreground text-xs mt-1">PNG, JPG, etc.</p>
                            </div>
                        )}
                    </div>
                </label>
                <input id={`file-upload-${index}`} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleImageUpload(e, index)} />
                {image && (
                    <button 
                      onClick={() => handleRemoveImage(index)} 
                      className="absolute top-2 right-2 p-1 rounded-full bg-secondary hover:bg-destructive text-secondary-foreground hover:text-destructive-foreground transition-colors"
                      aria-label={`Remove image ${index + 1}`}
                    >
                        <CloseIcon className="w-4 h-4"/>
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <section className="w-full py-16 sm:py-24 bg-secondary/30">
                <div className="container max-w-2xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-10">Generate Your Image</h1>
                    <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg border border-border flex flex-col gap-6 w-full">
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-3">
                            <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center font-bold text-sm sm:text-base">1</span>
                            Upload Your Photos
                            </h2>
                            <div className="grid grid-cols-2 gap-4 h-48">
                                <ImageUploader index={0} />
                                <ImageUploader index={1} />
                            </div>
                             <p className="text-xs text-muted-foreground text-center mt-3">
                                You are solely responsible for the images you upload. By uploading, you agree to our <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-3">
                                <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center font-bold text-sm sm:text-base">2</span>
                                Choose a Template
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {IMAGE_TEMPLATES.map((template) => (
                                <div
                                key={template.id}
                                onClick={() => setSelectedTemplateId(template.id)}
                                onKeyDown={(e) => handleTemplateKeyDown(e, template.id)}
                                role="button"
                                tabIndex={0}
                                className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 aspect-[9/16] transition-all duration-300 transform hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                                    selectedTemplateId === template.id ? 'border-primary scale-105 shadow-lg' : 'border-border hover:border-muted-foreground'
                                }`}
                                aria-pressed={selectedTemplateId === template.id}
                                >
                                <img 
                                    src={template.previewImage} 
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-colors duration-300 flex items-end p-2">
                                    <p className="text-sm font-semibold text-white">{template.name}</p>
                                </div>
                                {selectedTemplateId === template.id && (
                                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                </div>
                            ))}
                            </div>
                        </div>

                        {error && !isLoading && (
                            <div className="text-center text-destructive-foreground bg-destructive/80 p-4 rounded-lg border border-destructive">
                                <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
                                <p className="text-sm">{error}</p>
                                <button onClick={handleReset} className="mt-4 bg-secondary hover:bg-accent text-secondary-foreground font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-xs">
                                    Try Again
                                </button>
                            </div>
                        )}
                        
                        <div className="mt-auto pt-6">
                            <button
                                onClick={handleGenerateClick}
                                disabled={!uploadedImages[0] || !uploadedImages[1] || !selectedTemplateId || isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg shadow-lg disabled:shadow-none hover:shadow-purple-500/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                {isLoading ? (
                                    <>
                                    <div className="h-5 w-5 mr-3"></div>
                                    Generating...
                                    </>
                                ) : (
                                    '✨ Generate Image'
                                )}
                            </button>
                        </div>
                        
                        <div className="mt-4 border-t border-border pt-4">
                            <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>
                            <AdSenseUnit publisherId="ca-pub-XXXXXXXXXXXXXXXX" adSlot="YYYYYYYYYY" keySuffix="home" />
                        </div>
                    </div>
                </div>
            </section>
            {isLoading && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="loading-title"
                >
                    {uploadedImages[0] && (
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-all duration-500 animate-pulse-slow"
                            style={{ 
                                backgroundImage: `url(data:${uploadedImages[0].mimeType};base64,${uploadedImages[0].base64})`,
                                filter: 'blur(16px) saturate(120%)',
                                transform: 'scale(1.1)',
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>

                    <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-sm m-auto flex flex-col items-center justify-center p-8 sm:p-12 animate-fade-in-up animate-border-glow">
                        <button
                            onClick={handleReset}
                            className="absolute top-3 right-3 z-20 p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Cancel image generation"
                        >
                            <CloseIcon className="w-5 h-5" />
                        </button>
                        
                        <div className="relative text-center z-10 flex flex-col items-center">
                            <ElegantSpinnerIcon className="h-16 w-16 text-primary" />
                            <div className="h-8 mt-6">
                                <p 
                                    id="loading-title"
                                    key={loadingMessage}
                                    className="text-lg text-foreground font-medium animate-fade-in-text"
                                >
                                    {loadingMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && generatedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="image-modal-title"
                >
                    <div 
                        className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg m-auto flex flex-col animate-fade-in-up overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="p-4 border-b border-border flex justify-between items-center">
                            <h2 id="image-modal-title" className="text-lg font-semibold text-foreground">Your Creation is Ready!</h2>
                            <button 
                                onClick={handleCloseModal} 
                                className="p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon className="w-5 h-5"/>
                            </button>
                        </header>

                        <div className="p-4 sm:p-6 flex-grow flex items-center justify-center bg-muted/30">
                            <img src={generatedImage} alt="Generated result" className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg" />
                        </div>

                        <footer className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-b border-border">
                            <div className='flex flex-col sm:flex-row items-center gap-3 w-full'>
                                <button 
                                    onClick={handleDownload} 
                                    className="w-full sm:w-auto flex-1 bg-primary text-primary-foreground font-bold py-3 px-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg hover:bg-primary/90 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    <DownloadIcon/>
                                    Download
                                </button>
                                <button 
                                    onClick={handleShare} 
                                    className="w-full sm:w-auto flex-1 bg-secondary text-secondary-foreground font-bold py-3 px-5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-base hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    <ShareIcon/>
                                    Share
                                </button>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <p className="text-xs text-muted-foreground mr-2">Or share on:</p>
                                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:bg-green-500/10 hover:text-green-500 transition-colors" aria-label="Share on WhatsApp">
                                    <WhatsAppIcon className="w-6 h-6"/>
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:bg-blue-600/10 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
                                    <FacebookIcon className="w-6 h-6"/>
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:bg-pink-500/10 hover:text-pink-500 transition-colors" aria-label="Share on Instagram">
                                    <InstagramIcon className="w-6 h-6"/>
                                </a>
                            </div>
                        </footer>
                        
                        <div className="p-4 sm:p-6 bg-secondary/30">
                            <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>
                            <AdSenseUnit publisherId="ca-pub-XXXXXXXXXXXXXXXX" adSlot="ZZZZZZZZZZ" keySuffix="modal" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const HomePage: React.FC = () => {
    return (
        <ImageGenerator />
    );
};

export default HomePage;
