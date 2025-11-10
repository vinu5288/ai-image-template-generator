import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  slot,
  format = 'auto',  // 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  layout = '',
  layoutKey = '',
  style = { display: 'block' },
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only show ads if the page has enough content
      const hasSufficientContent = () => {
        // Get all text content from the main content area
        const mainContent = document.querySelector('main') || document.body;
        if (!mainContent) return false;
        
        // Count text nodes (excluding scripts and styles)
        const textNodes = Array.from(mainContent.childNodes).filter(node => 
          node.nodeType === Node.TEXT_NODE && 
          node.textContent && 
          node.textContent.trim().length > 0
        );
        
        const textLength = textNodes.reduce((acc, node) => 
          acc + (node.textContent?.trim().length || 0), 0
        );
        
        // Consider a page with at least 500 characters of text as having sufficient content
        return textLength > 500;
      };

      if (hasSufficientContent() && (window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          console.error('Error pushing ad:', e);
        }
      }
    } catch (e) {
      console.error('Error in AdSenseAd:', e);
    }
  }, []);

  // Don't render the ad container if it's a low-content page
  if (typeof window !== 'undefined') {
    const mainContent = document.querySelector('main') || document.body;
    const textLength = mainContent ? mainContent.textContent?.trim().length || 0 : 0;
    
    if (textLength < 500) {
      return null; // Don't show ad on low-content pages
    }
  }

  return (
    <div className={`adsense-ad ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6414916104528991"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        ref={adRef}
      />
    </div>
  );
};

export default AdSenseAd;
