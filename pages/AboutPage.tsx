
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <section className="container max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 py-2">
                Transform Your Photos into Timeless Memories
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                Welcome to AI Image Styles, where your cherished photographs are reborn as unique works of art. Have you ever looked at a photo and wished you could capture not just the moment, but the feeling of a different era? Or perhaps blend two separate memories into a single, beautiful composition? Our application harnesses the power of advanced generative AI to do just that. We provide a canvas for your imagination, allowing you to merge your own images with professionally designed, thematic templates to create something entirely new and deeply personal.
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                The process is simple yet powerful. You begin by uploading two of your own photos—perhaps a picture of yourself today and one from your childhood, or photos of two different people you wish to bring together. Then, you select from our curated library of artistic templates. Each template contains a unique prompt that guides the AI, instructing it to reimagine your photos in a specific style, setting, or mood, from nostalgic Polaroid effects to dreamy, painterly scenes. The AI intelligently analyzes the subjects of your photos and seamlessly integrates them into the new artistic context, preserving faces and key features while transforming the background and overall aesthetic. The result is a high-quality, emotionally resonant image that tells a story.
            </p>
        </section>
    );
};

export default AboutPage;
