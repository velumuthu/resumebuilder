import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import './print.css';
import PrintFooter from '@/components/print-footer';
import CookieConsent from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: 'ResumAI - AI-Powered Resume Builder',
  description: 'Create professional resumes for free with AI-driven content suggestions. Build your CV with our smart resume maker and land your dream job.',
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
    'easy resume builder'
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060063571353216" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <PrintFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
