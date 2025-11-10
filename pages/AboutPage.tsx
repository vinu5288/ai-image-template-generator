
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    return (
        <main className="container max-w-5xl mx-auto px-4 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-center">
                Transform Your Photos into Timeless Memories
            </h1>
            
            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Our Story</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                            Founded in 2023, AI Image Styles was born from a simple idea: what if we could help people reimagine their memories in new and creative ways? Our team of AI enthusiasts and photography experts came together to build a platform that makes professional-quality photo transformations accessible to everyone.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            We believe that every photo tells a story, and with our advanced AI technology, we're making it possible to tell those stories in ways that were never before possible. Whether you're looking to create a nostalgic throwback, a stunning artistic piece, or a unique gift, our platform provides the tools you need to bring your vision to life.
                        </p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">✓</span>
                                <span>Advanced AI technology for stunning results</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">✓</span>
                                <span>User-friendly interface for all skill levels</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">✓</span>
                                <span>Fast and secure processing of your images</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">✓</span>
                                <span>Regularly updated with new styles and features</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {[
                        {
                            title: 'Upload Your Photos',
                            description: 'Start by uploading two photos you want to transform. These could be photos of yourself, loved ones, or any images you want to combine in a unique way.'
                        },
                        {
                            title: 'Choose a Style',
                            description: 'Browse our collection of artistic templates and select the one that best matches your vision. Each template is designed to create a specific mood or effect.'
                        },
                        {
                            title: 'Generate & Download',
                            description: 'Let our AI work its magic! In just moments, you\'ll have a beautifully transformed image ready to download and share with the world.'
                        }
                    ].map((step, index) => (
                        <div key={index} className="bg-muted/30 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16 bg-muted/20 p-8 rounded-xl">
                <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Ready to Get Started?</h2>
                <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-6">
                    Join thousands of users who are already transforming their photos with AI Image Styles. No design skills required – just your creativity and our powerful AI technology.
                </p>
                <div className="flex justify-center">
                    <Link 
                        to="/" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Try It Now - It's Free
                    </Link>
                </div>
            </section>

            <section className="mt-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        {
                            question: 'Is my data secure?',
                            answer: 'Absolutely! We take your privacy seriously. Your uploaded images are processed securely and automatically deleted from our servers within 24 hours.'
                        },
                        {
                            question: 'Do I need any special software?',
                            answer: 'No special software is needed! Our platform works entirely in your web browser on both desktop and mobile devices.'
                        },
                        {
                            question: 'Can I use the generated images commercially?',
                            answer: 'Yes, you own the rights to all images you create using our platform. Feel free to use them for personal or commercial projects.'
                        },
                        {
                            question: 'How can I contact support?',
                            answer: 'We\'re here to help! Visit our <Link to="/contact" className="text-purple-500 hover:underline">contact page</Link> to get in touch with our support team.'
                        }
                    ].map((faq, index) => (
                        <div key={index} className="border-b border-muted pb-4">
                            <h3 className="font-medium text-foreground">{faq.question}</h3>
                            <p className="text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
