
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <section className="container max-w-3xl mx-auto px-4 py-16 sm:py-24 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold">Get in Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    We'd love to hear from you! Whether you have a question, feedback, or a partnership proposal, please don't hesitate to reach out.
                </p>
            </div>
            <div className="mt-12 bg-card border border-border rounded-lg p-8 shadow-lg">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg text-primary">General Inquiries</h3>
                        <p className="text-muted-foreground mt-1">For any general questions about our tool or services.</p>
                        <a href="mailto:animatevk@gmail.com" className="text-foreground font-medium hover:underline">
                            animatevk@gmail.com
                        </a>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-primary">Support</h3>
                        <p className="text-muted-foreground mt-1">Need help with a generation or have a technical issue?</p>
                        <a href="mailto:animatevk@gmail.com" className="text-foreground font-medium hover:underline">
                            animatevk@gmail.com
                        </a>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-primary">Business & Press</h3>
                        <p className="text-muted-foreground mt-1">For partnership opportunities and media inquiries.</p>
                        <a href="mailto:animatevk@gmail.com" className="text-foreground font-medium hover:underline">
                            animatevk@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;