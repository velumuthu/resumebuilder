import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function SupportCard() {
    return (
        <Card className="bg-secondary/50 border-primary/20 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="text-red-500" />
                <span>Support ResumAI</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                If you find this tool helpful, please consider supporting its development. It helps a lot!
              </p>
              <Button asChild size="sm" className="bg-[#1976D2] hover:bg-[#1565C0] text-white w-full">
                <a href="upi://pay?pa=velumbalaji-1@oksbi&pn=VELU%20M&am=3.00&cu=INR" target="_blank" rel="noopener noreferrer">
                  Support with Google Pay
                </a>
              </Button>
              <div className="text-center pt-1">
                <p className="text-xs text-muted-foreground">Or use UPI ID:</p>
                <p className="font-mono text-xs text-primary bg-background/50 rounded px-1.5 py-0.5 inline-block">velumbalaji-1@oksbi</p>
              </div>
            </CardContent>
          </Card>
    )
}
