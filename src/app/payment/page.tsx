'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentPage() {
    const upiLink = 'upi://pay?pa=velumbalaji-1@oksbi&pn=VELU%20M&am=5.00&cu=INR&aid=uGICAgIDX-4z8Ag';

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Scan to Pay</CardTitle>
                    <CardDescription>Use any UPI app to complete the payment.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <Image
                        src="https://storage.googleapis.com/stedi-assets/resumai/sample-qr-code.png"
                        alt="UPI QR Code"
                        width={250}
                        height={250}
                        className="rounded-lg border"
                    />
                    <div className="text-center">
                        <p className="font-semibold">UPI ID:</p>
                        <p>velumbalaji-1@oksbi</p>
                        <p className="font-semibold mt-2">Amount:</p>
                        <p>₹5.00</p>
                    </div>
                    <a href={upiLink} className="w-full">
                       <Button className="w-full">Pay using UPI App</Button>
                    </a>
                     <Link href="/" passHref>
                        <Button variant="outline" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Resume
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
