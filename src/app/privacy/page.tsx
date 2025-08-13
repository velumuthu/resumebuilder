import { FileText } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-secondary/40">
       <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <FileText />
            <h1>ResumAI</h1>
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
            <h1>Privacy Policy for ResumAI</h1>
            
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Welcome to ResumAI ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and store your information when you use our AI-powered resume builder application (the "Service").</p>

            <h2>1. Information We Collect</h2>
            <p>The core functionality of ResumAI is designed to work entirely on your local device. We use your browser's local storage to save your resume data. This includes:</p>
            <ul>
                <li><strong>Resume Data:</strong> All information you enter into the resume form, such as personal details, work experience, education, skills, and other related content.</li>
                <li><strong>AI Interaction Data:</strong> The job history and target job descriptions you provide to our AI content suggester.</li>
            </ul>
            <p><strong>We do not transmit or store your personal resume data on our servers.</strong> Your resume is saved directly in your browser's local storage for your convenience, allowing you to resume your work later.</p>

            <h2>2. How We Use Your Information</h2>
            <ul>
                <li><strong>To Provide the Service:</strong> We use the data stored locally to render your resume preview and maintain your session.</li>
                <li><strong>For AI Suggestions:</strong> The job history and description you provide are sent to a secure AI service (such as Google's Gemini) to generate content suggestions. This data is used only to process your request and is not stored or used to train the AI models.</li>
            </ul>
            
            <h2>3. Cookies and Local Storage</h2>
            <p>We use your browser's <strong>local storage</strong> to save your resume data. This is essential for the app's functionality. We also use a single cookie or local storage item to remember your choice regarding cookie consent.</p>

            <h2>4. Data Security</h2>
            <p>Since your data is stored on your own device, you are in control of it. We recommend using a secure computer and clearing your browser's cache and local storage if you are using a public or shared device.</p>

            <h2>5. Third-Party Services</h2>
            <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on a user's prior visits to this website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>
        </div>
      </main>
    </div>
  );
}
