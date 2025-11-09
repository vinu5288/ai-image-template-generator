import { useEffect } from 'react';

const AdSenseScript = () => {
  useEffect(() => {
    // Check if the script already exists
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      return;
    }

    // Add Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6414916104528991';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Google AdSense script');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove the script as it's needed across page navigations
      // The script is designed to be loaded once and managed by Google
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AdSenseScript;
