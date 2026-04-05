import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FolderKanban } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
          <FolderKanban className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Project Management System
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Manage your construction projects efficiently with our simple and
          clean interface.
        </p>
        <Link href="/projects">
          <Button size="lg" className="gap-2">
            View Projects
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
