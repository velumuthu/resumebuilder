
import AdSpace from '@/components/ad-space';
import SiteHeader from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { CircleCheckBig, FileText, Sparkles, CheckCircle, Mail, MessageSquare, Phone, MapPin, Code } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
        
        <section className="mt-24 text-left">
            <h2 className="text-3xl font-bold text-center mb-12">All The Tools You Need</h2>
            <div className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                            <span className="text-lg text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

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

        <section id="about" className="mt-24 text-left">
           <h2 className="text-3xl font-bold text-center mb-12">About The Developer</h2>
           <Card className="bg-background shadow-lg max-w-4xl mx-auto">
              <CardContent className="p-8">
                  <div className="prose prose-invert max-w-none">
                      <p>ResumAI was created by me, an individual developer passionate about building tools that help people achieve their career goals. I believe that everyone deserves a fair chance to land their dream job, regardless of their writing skills or design experience.</p>
                      <p>I built ResumAI to level the playing field, using the power of artificial intelligence to help you articulate your experience and skills in the most effective way possible.</p>
                       <h4 className="font-semibold flex items-center gap-2"><Code className="h-5 w-5 text-primary" /> What ResumAI Does</h4>
                      <ul>
                          <li><strong>AI-Powered Content Suggestions:</strong> Overcome writer's block with tailored bullet points that highlight your strengths.</li>
                          <li><strong>Real-Time Editing:</strong> See your resume come to life as you type with a live preview.</li>
                          <li><strong>Privacy by Design:</strong> Your data is stored locally in your browser, ensuring your information remains private and secure.</li>
                          <li><strong>Professional Templates:</strong> Start with a polished, modern template that you can customize to fit your style.</li>
                      </ul>
                  </div>
              </CardContent>
           </Card>
        </section>

        <section id="contact" className="mt-24 text-left">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
              <Card className="bg-background">
                  <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can I help you?" rows={5} />
                  </div>
                  <Button className="w-full">Send Message</Button>
                  </CardContent>
              </Card>
              </div>
              
              <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Contact Information</h3>
                  <p className="text-muted-foreground">Reach out directly through the channels below.</p>
                  <div className="space-y-4">
                      <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                              <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-semibold">Email</h4>
                              <a href="mailto:velumuthu.cse@gmail.com" className="text-primary hover:underline">velumuthu.cse@gmail.com</a>
                              <p className="text-sm text-muted-foreground">For general inquiries and support</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                              <MessageSquare className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-semibold">WhatsApp</h4>
                              <a href="https://wa.me/918695172090" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+91 86951 72090</a>
                              <p className="text-sm text-muted-foreground">For quick questions and support</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                              <Phone className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-semibold">Phone</h4>
                              <p className="text-primary">+91 86951 72090</p>
                              <p className="text-sm text-muted-foreground">Mon-Fri, 9am - 6pm IST</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                              <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-semibold">Address</h4>
                              <p className="text-primary">165/2, Main road, Malaiyarasan kuppam, <br/>Mazhavandhagal, Gingee, <br/>Villupuram - 605701, TN, India</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t bg-background p-4 print:hidden mt-16">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <div className="flex justify-center gap-4 mb-2">
                  <a href="#about" className="underline hover:text-primary">About</a>
                  <a href="#contact" className="underline hover:text-primary">Contact</a>
                  <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} ResumAI. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
