import DbAnalyzer from "@/components/db-analyzer";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BackToTop } from "@/components/back-to-top";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

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
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-10 flex items-center justify-between p-4 px-6 border-b bg-background/80 backdrop-blur-sm">
        <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        <h1 className="text-xl font-semibold tracking-tighter">Analisador de Dicionário</h1>
        <ModeToggle />
      </header>
      <main className="flex-grow">
        <Suspense fallback={<DbAnalyzerFallback />}>
          <DbAnalyzer />
        </Suspense>
      </main>
      <Toaster />
      <BackToTop />
    </div>
  );
}
