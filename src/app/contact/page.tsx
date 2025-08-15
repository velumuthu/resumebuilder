import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SiteHeader from "@/components/site-header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <SiteHeader />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Me</h1>
          <p className="text-center text-muted-foreground mb-12">
            Have a question, feedback, or need support? I'd love to hear from you.
          </p>

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
        </div>
      </main>
    </div>
  );
}
