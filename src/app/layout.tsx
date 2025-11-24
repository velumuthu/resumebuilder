
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import CookieConsent from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: 'LiveCareer Resume Builder - AI-Powered Resume Builder',
  description: 'Create a professional resume with LiveCareer Resume Builder, the best online resume builder. We offer a wide variety of resume templates, resume samples and resume examples to help you create the perfect resume. Our resume tips and resume writing guide will help you land your dream job.',
  keywords: [
    'resume builder', 
    'AI resume builder', 
    'free resume builder', 
    'cv maker', 
    'resume creator', 
    'professional resume', 
    'AI resume writer',
    'online resume builder',
    'resume templates',
    'free resume templates',
    'job application',
    'career tools',
    'CV builder',
    'resume help',
    'resume software',
    'job resume',
    'easy resume builder',
    'best resume builder 2025',
    'top resume builder',
    'latest resume templates',
    'trending resume formats',
    'ultimate resume guide',
    'powerful resume builder',
    'how to create a resume',
    'step-by-step resume builder',
    'build resume online',
    'create professional cv',
    'boost your career',
    'improve resume with AI',
    'discover resume templates',
    'master resume writing',
    'smart resume builder',
    'essential career tool',
    'build resume in minutes',
    'quick resume creator',
    'instant resume download',
    'LiveCareer Resume Builder',
    'resume samples',
    'resume examples',
    'resume',
    'resumes',
    'resume tips',
    'online resume',
    'resume writing',
    'create resume'
  ],
  icons: {
    icon: 'https://i.ibb.co/L6wVwLd/btechnologies-high-resolution-logo-transparent.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script type='text/javascript' src='https://www.effectivegatecpm.com/ds3z4pn4?key=ab323940b5f2a19e67e927c3cee73326'></script>
        <script type='text/javascript' src='//hardypistol.com/c1/07/c6/c107c6279db4c9be955b16a5f0a9b2b7.js'></script>
        <script async src="//hardypistol.com/0b2761533619c7ae9692d519a7e5bcbf/invoke.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LiveCareer Resume Builder",
              "applicationCategory": "Productivity",
              "operatingSystem": "Web",
              "description": "Create a professional resume with LiveCareer Resume Builder, the best online resume builder. We offer a wide variety of resume templates, resume samples and resume examples to help you create the perfect resume. Our resume tips and resume writing guide will help you land your dream job.",
              "offers": {
                "@type": "Offer",
                "price": "0"
              },
              "author": {
                "@type": "Person",
                "name": "Velu M"
              }
            }
          `}
        </script>
      </head>
      <body className="font-body antialiased">
        <div id="container-0b2761533619c7ae9692d519a7e5bcbf"></div>
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
