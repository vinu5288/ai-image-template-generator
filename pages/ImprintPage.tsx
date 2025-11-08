
import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const ImprintPage: React.FC = () => {
    return (
        <LegalPageLayout title="Owner Information & Contact">
            <p><em>Information provided as a best practice for transparency and user contact.</em></p>

            <h2>1. About the Owner</h2>
            <p>
                This website is owned, operated, and maintained by an individual developer.
            </p>
            <p>
                <strong>Name:</strong> Vinayak Kalal<br />
                <strong>Location:</strong> Gadag, Karnataka, India.
            </p>

            <h2>2. Contact Information</h2>
            <p>
                For any queries, feedback, or support, you can reach out via the following email:
                <br />
                <strong>Email:</strong> animatevk@gmail.com
            </p>
            
            <h2>3. Grievance Contact</h2>
            <p>
                For any complaints or concerns regarding the content or use of this service, please contact us at the email provided below. This is in the spirit of the Grievance Redressal Mechanism outlined in the Information Technology Rules, 2021 of India.
            </p>
            <p>
                <strong>Grievance Contact Email:</strong> animatevk@gmail.com
            </p>
            <p>
                We aim to acknowledge your complaint within 48 hours and will do our best to resolve it within a period of 15 days from the date of receipt.
            </p>
        </LegalPageLayout>
    );
};

export default ImprintPage;