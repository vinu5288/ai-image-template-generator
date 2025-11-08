

import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className || "w-8 h-8"}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || 'w-12 h-12 text-gray-500'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className || "animate-spin h-8 w-8 text-white"}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const ElegantSpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className || "w-12 h-12"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <style>{`
      .spinner_blade { animation: spinner_fade 1s linear infinite; animation-delay: 0s; }
      .spinner_blade:nth-child(1) { animation-delay: -0.875s; }
      .spinner_blade:nth-child(2) { animation-delay: -0.75s; }
      .spinner_blade:nth-child(3) { animation-delay: -0.625s; }
      .spinner_blade:nth-child(4) { animation-delay: -0.5s; }
      .spinner_blade:nth-child(5) { animation-delay: -0.375s; }
      .spinner_blade:nth-child(6) { animation-delay: -0.25s; }
      .spinner_blade:nth-child(7) { animation-delay: -0.125s; }
      @keyframes spinner_fade {
        0% { opacity: 1; }
        100% { opacity: 0.15; }
      }
    `}</style>
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(0, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(45, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(90, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(135, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(180, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(225, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(270, 12, 12)" />
    <rect className="spinner_blade" x="11" y="1" width="2" height="6" rx="1" transform="rotate(315, 12, 12)" />
  </svg>
);


export const PhotoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-16 h-16 text-gray-600"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-4.991-2.691V5.25a3.75 3.75 0 0 0-3.75-3.75H8.25a3.75 3.75 0 0 0-3.75 3.75v5.25m12 0-3.181 3.183a8.25 8.25 0 0 1-11.664 0l-3.181-3.183" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.95-4.243-1.59-1.59M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25c.48 0 .945-.154 1.326-.425a2.25 2.25 0 0 0-1.326-4.075 2.25 2.25 0 0 0 0 4.5 2.25 2.25 0 0 0 2.25-2.25A2.25 2.25 0 0 0 12 12Z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-4 h-4"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.195.025.39.05.588.08a2.25 2.25 0 0 1 2.828 2.828.06.06 0 0 0 .08.08c.03.02.06.038.09.058a2.25 2.25 0 0 0 2.186 0c.03-.02.06-.037.09-.057a.06.06 0 0 0 .08-.08 2.25 2.25 0 0 1 2.828-2.828c.03-.02.06-.037.09-.057a2.25 2.25 0 0 0 0-2.186c-.03-.02-.06-.037-.09-.057a2.25 2.25 0 0 1-2.828-2.828.06.06 0 0 0-.08-.08c-.03-.02-.06-.038-.09-.058a2.25 2.25 0 0 0-2.186 0c-.03.02-.06.037-.09.057a.06.06 0 0 0-.08.08 2.25 2.25 0 0 1-2.828 2.828c-.025.03-.05.06-.079.09Z" />
    </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6,14.2l-1.5-0.8c-0.3-0.1-0.5-0.1-0.7,0.1c-0.2,0.2-0.4,0.5-0.6,0.7c-0.1,0.2-0.3,0.2-0.5,0.1 c-0.7-0.3-1.4-0.8-2-1.3c-0.6-0.5-1.1-1.2-1.3-2c-0.1-0.2,0-0.4,0.1-0.5c0.2-0.2,0.4-0.4,0.6-0.6c0.2-0.2,0.2-0.4,0.1-0.7l-0.8-1.5 c-0.1-0.3-0.3-0.5-0.5-0.5c-0.2,0-0.4,0-0.6,0c-0.2,0-0.4,0.1-0.6,0.3C7.6,7.2,7.4,7.5,7.2,7.9c-0.2,0.4-0.3,0.8-0.3,1.2 c0,0.5,0.1,1,0.4,1.6c0.3,0.6,0.6,1.1,1.1,1.7c0.8,0.9,1.7,1.7,2.8,2.2c0.6,0.3,1.3,0.5,2,0.6c0.5,0.1,1,0.1,1.4,0 c0.5-0.1,0.9-0.3,1.2-0.6c0.2-0.2,0.4-0.4,0.5-0.6c0.1-0.2,0.1-0.4,0.1-0.6c0-0.2,0-0.4-0.1-0.6C17.1,14.5,16.9,14.3,16.6,14.2z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M12,20.5c-4.7,0-8.5-3.8-8.5-8.5 c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5C20.5,16.7,16.7,20.5,12,20.5z"/>
    </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.196h3.312z"/>
    </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.625C8.724.538 8.316.527 7.053.582 3.645.728 1.884 2.454.728 5.862.582 7.125.527 7.532.527 10.703c0 3.172.055 3.578.19 4.843.155 3.402 1.898 5.143 5.308 5.282 1.269.055 1.674.065 4.849.065 3.175 0 3.58-.01 4.85-.065 3.403-.147 5.14-1.893 5.279-5.282.146-1.264.192-1.67.192-4.843 0-3.171-.046-3.578-.192-4.843-.14-3.402-1.877-5.13-5.28-5.275C15.58.527 15.275.538 12 .538z"/>
        <path d="M12 6.865A5.135 5.135 0 1 0 17.135 12 5.135 5.135 0 0 0 12 6.865zm0 8.518A3.383 3.383 0 1 1 15.383 12 3.383 3.383 0 0 1 12 15.383z"/>
        <path d="M16.949 5.232a1.26 1.26 0 1 0 1.26 1.26 1.26 1.26 0 0 0-1.26-1.26z"/>
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.03-.78-.84-1.9-1.36-3.14-1.36-2.38 0-4.3 1.92-4.3 4.3 0 .34.04.67.11.98-3.57-.18-6.74-1.89-8.86-4.49-.37.64-.58 1.38-.58 2.18 0 1.49.76 2.81 1.92 3.58-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.14.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.22 4.16 1.93 6.58 1.93 7.89 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z"/>
    </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525 0.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.75-1.91-1.26-1.02-2.08-2.52-2.4-4.13-.18-.91-.28-1.86-.35-2.87.04-1.4.55-2.81 1.3-4.04 1.52-2.44 4.26-3.88 7.03-3.95 1.13-.03 2.25-.01 3.38-.02z"/>
    </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.54 9.04h16.92M3.54 14.96h16.92M9.04 3.54v16.92M14.96 3.54v16.92" />
    </svg>
);


export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

export const GalleryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Z" />
    </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);