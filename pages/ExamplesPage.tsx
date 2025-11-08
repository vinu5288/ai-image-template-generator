
import React from 'react';
import { IMAGE_TEMPLATES } from '../constants';

const ExamplesPage: React.FC = () => {
    return (
        <section className="container max-w-5xl mx-auto px-4 py-16 sm:py-24 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold">Tips for a Masterpiece</h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Follow these simple tips to get the best results from our AI.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
                <ul className="space-y-6 text-muted-foreground">
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <div><strong className="font-semibold text-foreground">Use High-Quality Photos:</strong> Clear, well-lit images with distinct subjects produce the most stunning transformations.</div>
                    </li>
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <div><strong className="font-semibold text-foreground">Complementary Poses:</strong> For best results, use images where the subjects' poses and eyelines are similar. This helps the AI create a more natural-looking composition.</div>
                    </li>
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <div><strong className="font-semibold text-foreground">Experiment with Templates:</strong> Don't be afraid to try different styles! The same set of photos can produce wonderfully different results with each unique template.</div>
                    </li>
                </ul>
                <div className="grid grid-cols-2 gap-4">
                    {IMAGE_TEMPLATES.slice(0, 4).map(template => (
                        <div key={template.id} className="rounded-lg overflow-hidden shadow-lg aspect-[9/16]">
                            <img src={template.previewImage} alt={`Example of ${template.name}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExamplesPage;
