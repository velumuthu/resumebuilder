import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, CheckCircle } from 'lucide-react';
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
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <FileText />
            <Sparkles className="text-accent" />
            <h1>ResumAI</h1>
          </Link>
          <Button asChild>
            <Link href="/build">Get Started</Link>
          </Button>
        </div>
      </header>

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

        <section className="mt-24 text-left">
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
                  <CheckCircle className="h-6 w-6 text-green-500" />
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
      </main>
      
      <footer className="w-full border-t bg-background p-4 print:hidden mt-16">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} ResumAI. All Rights Reserved. | <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link></p>
          </div>
      </footer>
    </div>
  );
}
