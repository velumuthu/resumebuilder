import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <FileText />
            <Sparkles className="text-accent" />
            <h1>ResumAI</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
            <Button asChild>
              <Link href="/build">Get Started</Link>
            </Button>
          </nav>
           <Button asChild className="md:hidden">
            <Link href="/build">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
            <h1>About ResumAI</h1>
            
            <p>Welcome to ResumAI, your partner in crafting the perfect resume. Our mission is to empower job seekers by providing them with intelligent, easy-to-use tools that simplify the resume-building process and produce professional, high-impact results.</p>

            <h2>Our Vision</h2>
            <p>In today's competitive job market, a standout resume is more important than ever. We believe that everyone deserves a fair chance to land their dream job, regardless of their writing skills or design experience. ResumAI was created to level the playing field, using the power of artificial intelligence to help you articulate your experience and skills in the most effective way possible.</p>

            <h2>What We Do</h2>
            <p>ResumAI combines state-of-the-art AI technology with intuitive design. Our platform offers:</p>
            <ul>
                <li><strong>AI-Powered Content Suggestions:</strong> Overcome writer's block with tailored bullet points that highlight your strengths.</li>
                <li><strong>Real-Time Editing:</strong> See your resume come to life as you type with a live preview.</li>
                <li><strong>Privacy by Design:</strong> Your data is stored locally in your browser, ensuring your information remains private and secure.</li>
                <li><strong>Professional Templates:</strong> Start with a polished, modern template that you can customize to fit your style.</li>
            </ul>

            <h2>Our Commitment</h2>
            <p>We are committed to continuous improvement, constantly updating our AI models and adding new features based on user feedback. Our goal is to be the most trusted and effective resume-building tool available.</p>

            <p>Thank you for choosing ResumAI. We're excited to be a part of your career journey.</p>
        </div>
      </main>
    </div>
  );
}
