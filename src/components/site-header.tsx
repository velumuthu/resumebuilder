
'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FileText, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/#about', label: 'About' },
        { href: '/#contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                    <FileText />
                    <Sparkles className="text-accent" />
                    <h1>ResumAI</h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-2">
                    <Button asChild>
                        <Link href="/build">Get Started</Link>
                    </Button>
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 pt-10">
                             <Link href="/" className="flex items-center gap-2 font-semibold text-lg" onClick={() => setOpen(false)}>
                                <FileText />
                                <Sparkles className="text-accent" />
                                <h1>ResumAI</h1>
                            </Link>
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-primary",
                                        pathname === link.href ? "text-primary" : "text-foreground"
                                    )}>
                                    {link.label}
                                </a>
                            ))}
                            <Button asChild>
                                <Link href="/build" onClick={() => setOpen(false)}>Get Started</Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
