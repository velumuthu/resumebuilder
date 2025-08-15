import AdSpace from '@/components/ad-space';
import SiteHeader from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { CircleCheckBig, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    'AI-powered suggestions for impactful resume content',
    'Real-time preview as you type',
    'Professionally designed and customizable templates',
    'Download your resume as a pixel-perfect PDF',
    'Your data is saved securely in your browser',
  ];

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <SiteHeader />

      <main className="container mx-auto py-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Build Your Perfect Resume with the Power of AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Create a professional resume that stands out. Get intelligent suggestions, customize beautiful templates, and land your dream job faster.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/build">Start Building for Free</Link>
          </Button>
        </div>

        <section className="my-12">
          <AdSpace />
        </section>
        
        <section className="mt-12 text-left">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ResumAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                  <span>AI Content Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Overcome writer's block. Get AI-powered bullet points tailored to your experience and the job you want.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See your changes instantly. Your resume updates in real-time as you edit, so what you see is what you get.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleCheckBig className="h-6 w-6 text-green-500" />
                  <span>Privacy First</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data is yours. All your resume information is stored locally in your browser, not on our servers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">See It in Action</h2>
          <div className="max-w-3xl mx-auto">
            <VideoPlayer videoId="DsT1fFy3Wb0" />
            <p className="mt-4 text-muted-foreground">
              Watch a short video to see how ResumAI can help you build the perfect resume in minutes.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t bg-background p-4 print:hidden mt-16">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <div className="flex justify-center gap-4 mb-2">
                  <Link href="/about" className="underline hover:text-primary">About Us</Link>
                  <Link href="/contact" className="underline hover:text-primary">Contact</Link>
                  <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} ResumAI. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
