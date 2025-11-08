
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { 
    LogoIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon, GlobeIcon, 
    FacebookIcon, InstagramIcon, TwitterIcon, TikTokIcon, YouTubeIcon, LinkedInIcon 
} from './icons';
import CookieConsent from './CookieConsent';

type Theme = 'light' | 'dark';

interface LayoutProps {
    theme: Theme;
    toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const handleCloseMenu = () => {
        setIsMenuClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsMenuClosing(false);
        }, 300); // Match animation duration
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `relative text-base font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
            isActive 
                ? 'text-primary after:w-full' 
                : 'text-muted-foreground hover:text-primary'
        }`;
    
    const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 border-b border-border last:border-b-0 transform hover:translate-x-2 ${
            isActive 
                ? 'bg-accent text-primary' 
                : 'text-foreground hover:bg-accent'
    }`;

    const NavLinks: React.FC = () => (
        <>
            <NavLink to="/" className={navLinkClasses}>Generator</NavLink>
            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
            <NavLink to="/examples" className={navLinkClasses}>Examples</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </>
    );

    const SocialLink: React.FC<{ href: string; ariaLabel: string; children: React.ReactNode }> = ({ href, ariaLabel, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110">
            {children}
        </a>
    );

    return (
        <div className="min-h-screen text-foreground flex flex-col transition-colors duration-300">
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
                <div className="container max-w-7xl mx-auto flex h-20 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
                    <Link to="/" className="flex items-center space-x-3">
                        <LogoIcon className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold">AI Image Styles</span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
                            <NavLinks />
                        </nav>
                        <button onClick={toggleTheme} className="p-2.5 rounded-full text-foreground hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                        <button onClick={handleOpenMenu} className="p-2 rounded-md text-foreground hover:bg-accent transition-colors md:hidden outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open menu">
                           <MenuIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div 
                    className="fixed inset-0 z-50 md:hidden"
                    role="dialog" 
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div 
                        className={`fixed inset-0 bg-black/60 backdrop-blur-sm ${isMenuClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                        onClick={handleCloseMenu}
                        aria-hidden="true"
                    />
                    
                    {/* Slide-out Panel (The Menu) */}
                    <div 
                        className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-card shadow-xl ${isMenuClosing ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right'}`}
                    >
                        {/* Menu Header */}
                        <div className="flex items-center justify-between px-4 py-5 border-b border-border">
                            <Link to="/" className="flex items-center space-x-3" onClick={handleCloseMenu}>
                                <LogoIcon className="h-7 w-7 text-primary" />
                                <span className="text-lg font-bold">AI Image Styles</span>
                            </Link>
                            <button onClick={handleCloseMenu} className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close menu">
                                <CloseIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        
                        {/* Menu Links */}
                        <div className="p-4">
                            <nav className="flex flex-col">
                                <NavLink to="/" className={mobileNavLinkClasses} onClick={handleCloseMenu}>Generator</NavLink>
                                <NavLink to="/about" className={mobileNavLinkClasses} onClick={handleCloseMenu}>About</NavLink>
                                <NavLink to="/examples" className={mobileNavLinkClasses} onClick={handleCloseMenu}>Examples</NavLink>
                                <NavLink to="/contact" className={mobileNavLinkClasses} onClick={handleCloseMenu}>Contact</NavLink>
                            </nav>
                        </div>

                        {/* Theme Toggle at bottom */}
                        <div className="mt-auto border-t border-border p-4">
                            <button onClick={toggleTheme} className="w-full flex items-center justify-center gap-4 p-3 rounded-lg text-foreground bg-secondary hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                                {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                                <span className='font-medium'>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="w-full bg-card">
                <div className="container max-w-5xl mx-auto py-12 px-4 flex flex-col items-center gap-8 text-center">
                    <button className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground font-semibold py-2 px-5 rounded-full flex items-center gap-2 transition-colors">
                        <GlobeIcon className="w-5 h-5"/>
                        <span>English</span>
                    </button>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <SocialLink href="https://facebook.com" ariaLabel="Facebook">
                            <FacebookIcon className="w-5 h-5" />
                        </SocialLink>
                        <SocialLink href="https://instagram.com" ariaLabel="Instagram">
                            <InstagramIcon className="w-5 h-5" />
                        </SocialLink>
                        <SocialLink href="https://twitter.com" ariaLabel="Twitter">
                            <TwitterIcon className="w-5 h-5" />
                        </SocialLink>
                        <SocialLink href="https://tiktok.com" ariaLabel="TikTok">
                            <TikTokIcon className="w-5 h-5" />
                        </SocialLink>
                        <SocialLink href="https://youtube.com" ariaLabel="YouTube">
                            <YouTubeIcon className="w-5 h-5" />
                        </SocialLink>
                        <SocialLink href="https://linkedin.com" ariaLabel="LinkedIn">
                            <LinkedInIcon className="w-5 h-5" />
                        </SocialLink>
                    </div>

                    <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
                        <NavLink to="/terms" className="hover:text-primary transition-colors">Terms of Service</NavLink>
                        <a href="mailto:animatevk@gmail.com?subject=Content%20Report" className="hover:text-primary transition-colors">Report Content</a>
                        <NavLink to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</NavLink>
                        <NavLink to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</NavLink>
                        <NavLink to="/owner-info" className="hover:text-primary transition-colors">Owner Information</NavLink>
                    </div>

                    <div className="border-t border-border w-full my-4"></div>

                    <p className="text-xs text-muted-foreground">&copy; 2024 AI Image Styles. All Rights Reserved.</p>

                </div>
            </footer>
            <CookieConsent />
        </div>
    );
};

export default Layout;