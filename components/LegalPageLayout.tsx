import React from 'react';

interface LegalPageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
    return (
        <section className="w-full py-12 md:py-20 bg-secondary/30 animate-fade-in">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="bg-card rounded-2xl p-4 sm:p-6 md:p-10 shadow-lg border border-border">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-center">{title}</h1>
                    <div 
                        className="prose prose-invert lg:prose-lg max-w-none mx-auto text-foreground"
                        style={{
                            '--tw-prose-invert-body': 'var(--muted-foreground)',
                            '--tw-prose-invert-headings': 'var(--foreground)',
                            '--tw-prose-invert-lead': 'var(--foreground)',
                            '--tw-prose-invert-links': 'var(--primary)',
                            '--tw-prose-invert-bold': 'var(--foreground)',
                            '--tw-prose-invert-counters': 'var(--muted-foreground)',
                            '--tw-prose-invert-bullets': 'var(--primary)',
                            '--tw-prose-invert-hr': 'var(--border)',
                            '--tw-prose-invert-quotes': 'var(--foreground)',
                            '--tw-prose-invert-quote-borders': 'var(--border)',
                            '--tw-prose-invert-captions': 'var(--muted-foreground)',
                            '--tw-prose-invert-code': 'var(--foreground)',
                            '--tw-prose-invert-pre-code': 'var(--card-foreground)',
                            '--tw-prose-invert-pre-bg': 'var(--secondary)',
                            '--tw-prose-invert-th-borders': 'var(--border)',
                            '--tw-prose-invert-td-borders': 'var(--border)',
                        } as React.CSSProperties}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LegalPageLayout;