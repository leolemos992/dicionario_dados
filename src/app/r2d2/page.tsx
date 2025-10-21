import { R2D2Docs } from '@/components/r2d2-docs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';

export default function R2D2Page() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-background">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Home
          </Link>
        </Button>
        <R2D2Docs />
      </div>
      <BackToTop />
    </>
  );
}
