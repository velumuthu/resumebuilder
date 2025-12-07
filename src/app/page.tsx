'use client'

import SiteHeader from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { CircleCheckBig, FileText, Sparkles, CheckCircle, Mail, MessageSquare, Phone, MapPin, Code, Heart } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import AnimatedLogo from '@/components/animated-logo';
import AnimatedEyeIcon from '@/components/animated-eye-icon';
import AnimatedPencilIcon from '@/components/animated-pencil-icon';
import AnimatedDownloadIcon from '@/components/animated-download-icon';
import CountUp from '@/components/count-up';
import Section from '@/components/section';
import Script from 'next/script';

export default function HomePage() {
  const [year, setYear] = useState<number | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  const features = [
    'AI-powered suggestions for impactful resume content',
    'Real-time preview as you type',
    'Professionally designed and customizable resume templates',
    'Download your resume as a pixel-perfect PDF',
    'Your data is saved securely in your browser',
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:velumuthu.cse@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(contactName)}%0AEmail:%20${encodeURIComponent(contactEmail)}%0AMessage:%20${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <SiteHeader />

      <main className="container mx-auto py-16 px-4 text-center">
        <Section>
        <div className="mx-auto max-w-3xl">
        <AnimatedLogo />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            LiveCareer Resume Builder: Create Your Perfect Resume with AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Create a professional resume that stands out with our free online resume builder. Get intelligent suggestions, customize beautiful resume templates, and land your dream job faster. We have plenty of resume samples and resume examples to help you get started. Our resume tips and resume writing advice will help you create a resume that gets noticed.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/build">Start Building for Free</Link>
          </Button>
        </div>
        </Section>

        <Section className="mt-24 text-left">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <AnimatedEyeIcon />
              <h3 className="text-xl font-semibold mb-2">1. Pick a Template</h3>
              <p className="text-muted-foreground">Choose from our professionally designed resume templates.</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedPencilIcon />
              <h3 className="text-xl font-semibold mb-2">2. Fill in Your Details</h3>
              <p className="text-muted-foreground">Add your personal information, work experience, and skills.</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedDownloadIcon />
              <h3 className="text-xl font-semibold mb-2">3. Download Your Resume</h3>
              <p className="text-muted-foreground">Download your resume as a PDF and start applying for jobs.</p>
            </div>
          </div>
        </Section>

        <Section className="mt-24 bg-primary/10 py-16">
          <div className="container mx-auto text-center">
            <Script id="ad-config" strategy="afterInteractive">
              {`
                atOptions = {
                  'key' : '0dda2f2d0f7beb3b23e264405e06a0e0',
                  'format' : 'iframe',
                  'height' : 60,
                  'width' : 468,
                  'params' : {}
                };
              `}
            </Script>
            <Script type="text/javascript" src="//hardypistol.com/0dda2f2d0f7beb3b23e264405e06a0e0/invoke.js" strategy="afterInteractive" />
            <h2 className="text-3xl font-bold mb-8 text-primary">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-bold text-primary"><CountUp end={1000} />+</h3>
                <p className="text-muted-foreground mt-2">Site Visits</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-bold text-primary"><CountUp end={500} />+</h3>
                <p className="text-muted-foreground mt-2">Happy Clients</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-bold text-primary"><CountUp end={750} />+</h3>
                <p className="text-muted-foreground mt-2">Resumes Built</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-bold text-primary"><CountUp end={2} />+</h3>
                <p className="text-muted-foreground mt-2">Years of Excellence</p>
              </div>
            </div>
          </div>
        </Section>

        <Section className="mt-24 text-left">
            <h2 className="text-3xl font-bold text-center mb-12">All the Resume Tools You Need</h2>
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
        </Section>

        <Section className="mt-24 text-left">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LiveCareer Resume Builder?</h2>
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
        </Section>

        <Section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">See LiveCareer Resume Builder in Action</h2>
          <div className="max-w-3xl mx-auto">
            <VideoPlayer videoId="DsT1fFy3Wb0" />
            <p className="mt-4 text-muted-foreground">
              Watch a short video to see how our resume builder can help you build the perfect resume in minutes.
            </p>
          </div>
        </Section>

        <Section id="about" className="mt-24 text-left">
           <h2 className="text-3xl font-bold text-center mb-12">About LiveCareer Resume Builder</h2>
           <Card className="bg-background shadow-lg max-w-4xl mx-auto">
              <CardContent className="p-8">
                  <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                      <p>LiveCareer Resume Builder was born from a simple idea: everyone deserves a fair chance to land their dream job, regardless of their writing skills or design experience. This tool was built by me, <strong>Velumuthu</strong>, a passionate software developer dedicated to creating tools that empower people to achieve their career goals. Having seen many talented individuals struggle to effectively communicate their value on a resume, I was motivated to create a solution.</p>
                      <p>I built LiveCareer Resume Builder to level the playing field. By leveraging the power of artificial intelligence, this tool helps you articulate your experience and skills in the most impactful way possible. It's more than just a resume builder; it's your personal career assistant, designed to help you shine and make a lasting impression on potential employers.</p>
                      
                      <h3 className="text-xl font-semibold text-foreground !mt-8">Our Mission & Commitment</h3>
                      <p>Our mission is to provide a powerful, user-friendly, and free tool that makes professional resume building accessible to everyone. We are committed to maintaining your privacy, which is why all your data is stored locally in your browser. We will never sell your data or lock essential features behind a paywall. The optional contributions help us cover server costs and continue improving the tool for the community.</p>

                       <h4 className="font-semibold flex items-center gap-2 text-foreground !mt-8"><Code className="h-5 w-5 text-primary" /> What LiveCareer Resume Builder Does</h4>
                      <ul className="!mt-2">
                          <li><strong>AI-Powered Content Suggestions:</strong> Overcome writer's block with tailored bullet points that highlight your strengths and align with job descriptions.</li>
                          <li><strong>Real-Time Editing & Preview:</strong> See your resume come to life as you type with a live preview, ensuring what you see is what you get.</li>
                          <li><strong>Privacy by Design:</strong> Your data is stored locally in your browser, ensuring your information remains private and secure. No sign-up required.</li>
                          <li><strong>Professional Resume Templates:</strong> Start with a polished, modern resume template that you can easily customize to fit your style and industry.</li>
                          <li><strong>Free PDF Export:</strong> Download a pixel-perfect PDF of your resume at any time, for free.</li>
                      </ul>
                  </div>
              </CardContent>
           </Card>
        </Section>

        <Section id="support" className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Support LiveCareer Resume Builder</h2>
          <Card className="bg-background max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="text-red-500" />
                <span>Enjoying LiveCareer Resume Builder?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                LiveCareer Resume Builder is a free tool, and I plan to keep it that way. If you find it helpful, please consider supporting its development and server costs. Your contribution, no matter how small, helps a lot!
              </p>
              <Button asChild size="lg" className="bg-[#1976D2] hover:bg-[#1565C0] text-white">
                <a href="upi://pay?pa=velumbalaji-1@oksbi&pn=VELU%20M&am=3.00&cu=INR" target="_blank" rel="noopener noreferrer">
                  Support with Google Pay
                </a>
              </Button>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">Or use the UPI ID:</p>
                <p className="font-mono text-primary bg-secondary/50 rounded px-2 py-1 inline-block">velumbalaji-1@oksbi</p>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="contact" className="mt-24 text-left">
          <h2 className="text-3xl font-bold text-center mb-12">Contact LiveCareer Resume Builder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
              <Card className="bg-background">
                  <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleContactSubmit}>
                      <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your Name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your.email@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" placeholder="How can I help you?" rows={5} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} />
                      </div>
                      <Button type="submit" className="w-full mt-4">Send Message</Button>
                    </form>
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
        </Section>
      </main>
      
      <footer className="w-full border-t bg-background p-4 print:hidden mt-16">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <div className="flex justify-center gap-4 mb-2">
                  <a href="#about" className="underline hover:text-primary">About</a>
                  <a href="#support" className="underline hover:text-primary">Support Us</a>
                  <a href="#contact" className="underline hover:text-primary">Contact</a>
                  <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
              </div>
              <p>&copy; {year} LiveCareer Resume Builder. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
