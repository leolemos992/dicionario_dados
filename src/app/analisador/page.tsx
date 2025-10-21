import DbAnalyzer from "@/components/db-analyzer";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";

function DbAnalyzerFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Skeleton className="h-16 w-1/3 mb-6" />
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-12 w-full mb-6" />
      <div className="flex gap-6">
        <div className="w-1/4">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="w-3/4">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  )
}


export default function AnalisadorPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 pt-8">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Home
          </Link>
        </Button>
      </div>
      <Suspense fallback={<DbAnalyzerFallback />}>
        <DbAnalyzer />
      </Suspense>
      <Toaster />
      <BackToTop />
    </main>
  );
}
