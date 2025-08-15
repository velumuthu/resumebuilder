import { Mail, Phone, MapPin, MessageSquare, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SiteHeader from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <SiteHeader />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About & Contact</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Learn more about the developer behind ResumAI and get in touch with any questions, feedback, or support requests.
          </p>

          <section id="about" className="mb-24">
             <Card className="bg-background shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">About the Developer</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-8">
                   <div className="flex-shrink-0 text-center">
                     <Avatar className="w-32 h-32 mx-auto border-4 border-primary">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/12874249" alt="Velu M" />
                        <AvatarFallback>VM</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mt-4">Velu M</h3>
                    <p className="text-muted-foreground">Individual Developer</p>
                   </div>
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

          <section id="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                    <h2 className="text-2xl font-semibold">Contact Information</h2>
                    <p className="text-muted-foreground">Reach out to me directly through the channels below.</p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <a href="mailto:velumuthu.cse@gmail.com" className="text-primary hover:underline">velumuthu.cse@gmail.com</a>
                                <p className="text-sm text-muted-foreground">For general inquiries and support</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">WhatsApp</h3>
                                <a href="https://wa.me/918695172090" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+91 86951 72090</a>
                                <p className="text-sm text-muted-foreground">For quick questions and support</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-primary">+91 86951 72090</p>
                                <p className="text-sm text-muted-foreground">Mon-Fri, 9am - 6pm IST</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p className="text-primary">165/2, Main road, Malaiyarasan kuppam, <br/>Mazhavandhagal, Gingee, <br/>Villupuram - 605701, TN, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
