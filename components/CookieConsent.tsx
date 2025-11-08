
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            setIsVisible(true);
        }
    }, []);

    const handleConsent = (consent: 'accepted' | 'declined') => {
        localStorage.setItem('cookie_consent', consent);
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-t border-border animate-fade-in-up">
            <div className="container max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left flex-grow">
                    We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. 
                    <Link to="/cookies" className="underline hover:text-primary transition-colors ml-1">Learn more</Link>.
                </p>
                <div className="flex-shrink-0 flex items-center gap-3">
                    <button 
                        onClick={() => handleConsent('declined')}
                        className="text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2 rounded-md"
                    >
                        Decline
                    </button>
                    <button 
                        onClick={() => handleConsent('accepted')}
                        className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;