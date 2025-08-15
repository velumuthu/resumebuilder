import SiteHeader from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <SiteHeader />
      <main className="container mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
            <h1>About ResumAI</h1>
            
            <p>Welcome to ResumAI. My mission is to empower job seekers by providing an intelligent, easy-to-use tool that simplifies the resume-building process and produces professional, high-impact results.</p>
            
            <h2>From the Developer</h2>
            <p>ResumAI was created by me, <strong>Velu M</strong>, an individual developer passionate about building tools that help people achieve their career goals. I believe that everyone deserves a fair chance to land their dream job, regardless of their writing skills or design experience.</p>
            <p>I built ResumAI to level the playing field, using the power of artificial intelligence to help you articulate your experience and skills in the most effective way possible.</p>

            <h2>What ResumAI Does</h2>
            <p>ResumAI combines state-of-the-art AI technology with intuitive design. The platform offers:</p>
            <ul>
                <li><strong>AI-Powered Content Suggestions:</strong> Overcome writer's block with tailored bullet points that highlight your strengths.</li>
                <li><strong>Real-Time Editing:</strong> See your resume come to life as you type with a live preview.</li>
                <li><strong>Privacy by Design:</strong> Your data is stored locally in your browser, ensuring your information remains private and secure.</li>
                <li><strong>Professional Templates:</strong> Start with a polished, modern template that you can customize to fit your style.</li>
            </ul>

            <h2>My Commitment</h2>
            <p>I am committed to continuous improvement, constantly updating the AI models and adding new features based on user feedback. My goal is to make ResumAI the most trusted and effective resume-building tool available.</p>

            <p>Thank you for choosing ResumAI. I'm excited to be a part of your career journey.</p>
        </div>
      </main>
    </div>
  );
}
