
import React from 'react';
import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/LegalPageLayout';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <LegalPageLayout title="Privacy Policy">
            <p><em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

            <h2>1. Introduction</h2>
            <p>Welcome to AI Image Styles. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you use our services. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use.</p>
            <ul>
                <li><strong>Uploaded Images:</strong> Images you upload for processing are sent to our servers and third-party AI service providers to generate the stylized image. We do not store your images long-term.</li>
                <li><strong>Usage Data:</strong> We may collect data about how you use our application to improve our services.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect or receive:</p>
            <ul>
                <li>To provide and maintain our Service.</li>
                <li>To improve, personalize, and expand our Service.</li>
                <li>To understand and analyze how you use our Service.</li>
                <li>For security purposes and to prevent fraud.</li>
            </ul>
            
            <h2>4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Your images are processed by third-party AI providers under strict confidentiality agreements.</p>
            
            <h2>5. Advertising and Cookies</h2>
            <p>We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. This helps us keep our service free. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide personalized advertisements about goods and services of interest to you.</p>
            <p>
                Our partners use cookies to collect this data and serve ads based on your prior visits. For more detailed information on how we use cookies and how you can manage them, please read our <Link to="/cookies">Cookie Policy</Link>. To understand how Google uses data, please visit their policy page: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data when you use our partners' sites or apps</a>.
            </p>

            <h2>6. How Long Do We Keep Your Information?</h2>
            <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law. Uploaded and generated images are typically deleted from our servers within 24 hours.</p>

            <h2>7. Do We Make Updates to This Policy?</h2>
            <p>Yes, we will update this policy as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Last Updated" date.</p>

            <h2>8. How Can You Contact Us About This Policy?</h2>
            <p>If you have questions or comments about this policy, you may email us at animatevk@gmail.com.</p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;
