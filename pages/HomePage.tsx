import React, { useState, useCallback, useEffect } from 'react';
import { Template, UploadedImage } from '../types';
import { IMAGE_TEMPLATES } from '../constants';
import { generateImageFromTemplate } from '../services/geminiService';
import { UploadIcon, ElegantSpinnerIcon, DownloadIcon, ShareIcon, CloseIcon } from '../components/icons';

const LOADING_MESSAGES = [
    "Warming up the AI...",
    "Painting digital pixels...",
    "Styling your creation...",
    "Almost there...",
];

const ImageGenerator: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<[UploadedImage | null, UploadedImage | null]>([null, null]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Handle loading message rotation
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
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            setError(`Image "${file.name}" is too large. Please upload files smaller than 4MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(',')[1];
            const newImages = [...uploadedImages] as [UploadedImage | null, UploadedImage | null];
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
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (index: 0 | 1) => {
        const newImages = [...uploadedImages] as [UploadedImage | null, UploadedImage | null];
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

        try {
            const result = await generateImageFromTemplate(
                [uploadedImages[0], uploadedImages[1]],
                template.prompt
            );
            setGeneratedImage(result);
            setIsModalOpen(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [uploadedImages, selectedTemplateId]);

    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'generated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (!generatedImage) return;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'AI Generated Image',
                    text: 'Check out this image I created with AI!',
                    url: generatedImage,
                });
            } else {
                await navigator.clipboard.writeText(generatedImage);
                alert('Image URL copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            setError('Failed to share image. Please try downloading it instead.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTemplateKeyDown = (e: React.KeyboardEvent, templateId: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedTemplateId(templateId);
        }
    };

    const ImageUploader = ({ index }: { index: 0 | 1 }) => (
        <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center h-48 relative">
            {uploadedImages[index] ? (
                <div className="relative w-full h-full">
                    <img 
                        src={`data:${uploadedImages[index]?.mimeType};base64,${uploadedImages[index]?.base64}`}
                        alt={`Uploaded ${index + 1}`}
                        className="max-h-full w-full object-contain"
                    />
                    <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
                        aria-label="Remove image"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                        <UploadIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, or JPEG (max. 4MB)
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, index)}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                        AI Image Style Generator
                    </h1>
                    <p className="text-xl text-foreground font-medium mb-6 max-w-3xl mx-auto">
                        Transform your photos into stunning AI-generated artwork with our powerful image generation tool.
                    </p>
                    <div className="prose prose-lg text-muted-foreground max-w-3xl mx-auto text-left mb-8">
                        <p className="mb-4">
                            Create beautiful, unique images by combining your photos with our AI-powered style templates. 
                            Perfect for social media, digital art, or personal projects. Our advanced AI technology 
                            ensures high-quality results every time.
                        </p>
                        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How It Works</h2>
                        <ol className="space-y-2 list-decimal pl-6">
                            <li>Upload two images using the upload areas below</li>
                            <li>Choose from our collection of style templates</li>
                            <li>Click "Generate" and let our AI work its magic</li>
                            <li>Download or share your creation</li>
                        </ol>
                        
                        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">About Our Templates</h2>
                        <p className="mb-4">
                            Our carefully curated templates are designed to work with a variety of image types. 
                            Each template applies unique artistic styles and transformations to your photos, 
                            creating one-of-a-kind results.
                        </p>
                        
                        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Tips for Best Results</h2>
                        <ul className="space-y-2 list-disc pl-6 mb-8">
                            <li>Use high-quality, well-lit photos for best results</li>
                            <li>Choose images with clear subjects and good contrast</li>
                            <li>Experiment with different templates to find your favorite style</li>
                            <li>For portraits, ensure faces are clearly visible</li>
                            <li>Try different combinations of images for unique effects</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                First Image
                            </label>
                            <ImageUploader index={0} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Second Image
                            </label>
                            <ImageUploader index={1} />
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Style Template</h2>
                        <p className="text-muted-foreground mb-6 text-center max-w-3xl mx-auto">
                            Select from our collection of AI-powered style templates. Each template applies a unique 
                            artistic transformation to your images. Hover over each template to see a preview 
                            and click to select your favorite style.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {IMAGE_TEMPLATES.map((template) => (
                                <div
                                    key={template.id}
                                    className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 aspect-[9/16] transition-all duration-300 transform hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                                        selectedTemplateId === template.id ? 'border-primary scale-105 shadow-lg' : 'border-border hover:border-muted-foreground'
                                    }`}
                                    onClick={() => setSelectedTemplateId(template.id)}
                                    onKeyDown={(e) => handleTemplateKeyDown(e, template.id)}
                                    role="button"
                                    tabIndex={0}
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

                    <div className="flex justify-center">
                        <button
                            onClick={handleGenerateClick}
                            disabled={isLoading || !selectedTemplateId || !uploadedImages[0] || !uploadedImages[1]}
                            className={`relative px-8 py-3 rounded-lg font-bold text-white transition-all ${
                                (isLoading || !selectedTemplateId || !uploadedImages[0] || !uploadedImages[1])
                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <ElegantSpinnerIcon className="w-5 h-5 mr-2 inline-block" />
                                    Generating...
                                </>
                            ) : (
                                '✨ Generate Image'
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive-foreground rounded-lg">
                        {error}
                    </div>
                )}
            </main>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-sm p-8 sm:p-12 text-center">
                        <ElegantSpinnerIcon className="h-16 w-16 text-primary mx-auto mb-6" />
                        <p className="text-lg font-medium">{loadingMessage}</p>
                        <button
                            onClick={handleReset}
                            className="mt-6 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Result Modal */}
            {isModalOpen && generatedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleCloseModal}
                >
                    <div 
                        className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Your Creation is Ready!</h2>
                            <button 
                                onClick={handleCloseModal}
                                className="p-1 rounded-full hover:bg-accent transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <img 
                                src={generatedImage} 
                                alt="Generated result" 
                                className="w-full max-h-[60vh] object-contain rounded-lg"
                            />
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <DownloadIcon className="w-5 h-5" />
                                    Download
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex-1 border border-border bg-card text-foreground font-medium py-2 px-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShareIcon className="w-5 h-5" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
