'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="block relative bg-background rounded-lg shadow-lg overflow-hidden group w-full">
          <Image
            src={thumbnailUrl}
            alt="ResumAI video tutorial"
            width={800}
            height={450}
            className="w-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="tutorial video screenshot"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayCircle className="h-20 w-20 text-white" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>ResumAI Video Tutorial</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <iframe
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
