import { ArrowRight, BookText, Database, Share2, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Analisador de Dados Interativo",
    href: "/analisador",
    icon: <Database className="w-6 h-6 text-primary" />,
    description: "Faça upload do dicionário de dados do Uniplus para analisar tabelas e colunas de forma interativa",
    cta: "Acessar Analisador",
    variant: "default" as const,
  },
  {
    title: "Documentação R2D2",
    href: "/r2d2",
    icon: <BookText className="w-6 h-6 text-accent" />,
    description: "Consulte a documentação completa do utilitário R2D2 para importação e exportação de dados.",
    cta: "Ver Documentação",
    variant: "outline" as const,
  }
]

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex items-center justify-between p-4 px-6 border-b">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold tracking-tighter">UniplusDB Insights</h1>
        </div>
        <nav>
          {/* Future navigation links can go here */}
        </nav>
      </header>
      <main className="flex-1">
        <div className="container relative py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Análise Inteligente de Banco de Dados Uniplus
            </h1>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <Card key={tool.title} className="flex flex-col hover:border-primary/50 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {tool.icon}
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardDescription className="mb-6 flex-grow">
                    {tool.description}
                  </CardDescription>
                  <Button asChild variant={tool.variant} className="mt-auto w-fit">
                    <Link href={tool.href}>
                      {tool.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
