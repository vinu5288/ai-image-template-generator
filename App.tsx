
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExamplesPage from './pages/ExamplesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import ImprintPage from './pages/ImprintPage';
import AdSenseScript from './components/AdSenseScript';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
  
    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') as Theme;
        setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    }, []);
  
    useEffect(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <AdSenseScript />
            <Routes>
            <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="examples" element={<ExamplesPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="privacy" element={<PrivacyPolicyPage />} />
                <Route path="terms" element={<TermsOfServicePage />} />
                <Route path="cookies" element={<CookiePolicyPage />} />
                <Route path="owner-info" element={<ImprintPage />} />
            </Route>
            </Routes>
        </>
    );
};

export default App;

const style = document.createElement('style');
style.innerHTML = `
  html {
    scroll-behavior: smooth;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  .animate-fade-out {
    animation: fadeOut 0.3s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: scale(0.95) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out forwards;
  }
  
  @keyframes borderGlow {
    0% { box-shadow: 0 0 10px 0px rgba(167, 139, 250, 0.4), 0 0 20px 0px rgba(167, 139, 250, 0.3); }
    50% { box-shadow: 0 0 20px 5px rgba(236, 72, 153, 0.4), 0 0 40px 5px rgba(236, 72, 153, 0.3); }
    100% { box-shadow: 0 0 10px 0px rgba(167, 139, 250, 0.4), 0 0 20px 0px rgba(167, 139, 250, 0.3); }
  }
  .animate-border-glow {
    animation: borderGlow 3s ease-in-out infinite;
  }

  @keyframes fadeInText {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-text {
    animation: fadeInText 0.5s ease-out forwards;
  }

  @keyframes pulseSlow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.8; }
  }
  .animate-pulse-slow {
    animation: pulseSlow 4s ease-in-out infinite;
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  .animate-slide-in-from-right {
      animation: slideInFromRight 0.3s ease-out forwards;
  }
  
  @keyframes slideOutToRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  .animate-slide-out-to-right {
      animation: slideOutToRight 0.3s ease-out forwards;
  }

  @keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);