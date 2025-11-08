import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const CookiePolicyPage: React.FC = () => {
    return (
        <LegalPageLayout title="Cookie Policy">
            <p><em>Last Updated: {new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

            <h2>1. What Are Cookies?</h2>
            <p>A cookie is a small text file that a website stores on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>
            
            <h2>2. How Do We Use Cookies?</h2>
            <p>We use cookies for several purposes on our website:</p>
            <ul>
                <li><strong>Functionality:</strong> To remember your choices, such as your theme preference or cookie consent decision.</li>
                <li><strong>Advertising (Google AdSense):</strong> We use third-party advertising from Google AdSense to support our site. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                <li><strong>Analytics:</strong> To understand how our visitors use the website, so we can measure and improve performance.</li>
            </ul>

            <h2>3. Third-Party Cookies</h2>
            <p>Our website uses Google AdSense, which is a third-party service. This means that Google will place and read cookies on your browser, or use web beacons to collect information, as a result of ad serving on our website. This information may include your IP address, your ISP, the browser you used to visit our site, and in some cases, whether you have Flash installed.</p>

            <h2>4. Managing Cookies</h2>
            <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
            <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.</p>

            <h2>5. Changes to This Policy</h2>
            <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
        </LegalPageLayout>
    );
};

export default CookiePolicyPage;