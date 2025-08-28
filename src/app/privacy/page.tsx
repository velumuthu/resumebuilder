
'use client';

import SiteHeader from "@/components/site-header";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="min-h-screen bg-secondary/40">
       <SiteHeader />
      <main className="container mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
            <h1>Privacy Policy for ResumAI</h1>
            
            <p><strong>Last updated:</strong> {lastUpdated}</p>

            <p>Welcome to ResumAI ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and store your information when you use our AI-powered resume builder application (the "Service").</p>

            <h2>1. Information We Collect</h2>
            <p>The core functionality of ResumAI is designed to work entirely on your local device. We use your browser's local storage to save your resume data.</p>
            <ul>
                <li><strong>Resume Data:</strong> All information you enter into the resume form, such as personal details, work experience, education, skills, and other related content, is stored in your browser's local storage.</li>
                <li><strong>AI Interaction Data:</strong> To provide content suggestions, the job history and target job descriptions you provide are sent to a secure, third-party AI service (Google Gemini). This data is processed to generate suggestions and is not stored by us or used to train AI models.</li>
            </ul>
            <p><strong>We do not transmit or store your personal resume data on our servers.</strong> Your resume is saved directly in your browser, giving you full control over your information.</p>

            <h2>2. How We Use Your Information</h2>
            <ul>
                <li><strong>To Provide the Service:</strong> We use the data stored locally to render your resume preview and maintain your session across visits.</li>
                <li><strong>For AI Suggestions:</strong> Your anonymized job history and description are used solely to process your request for AI-powered content suggestions.</li>
            </ul>
            
            <h2>3. Cookies and Local Storage</h2>
            <p>We use your browser's <strong>local storage</strong> to save your resume data. This is essential for the app's core "save" functionality. We also use a single local storage item to remember your choice regarding our cookie consent banner, so we don't have to ask you again on every visit.</p>

            <h2>4. Data Security</h2>
            <p>Since your resume data is stored on your own device, you are in control. We recommend using a secure computer and clearing your browser's data if you are using a public or shared device.</p>

            <h2>5. Third-Party Services</h2>
            <p>We use Google AdSense to display advertisements on our site. Google may use cookies to serve ads based on a user's prior visits. You can learn more about how Google uses this data and how to opt out by visiting Google's Privacy & Terms site and <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please feel free to contact us at velumuthu.cse@gmail.com.</p>
        </div>
      </main>
    </div>
  );
}
