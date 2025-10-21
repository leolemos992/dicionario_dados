import { ArrowRight, BookText, Share2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline text-foreground">Bem-vindo</h1>
        <p className="text-muted-foreground text-xl mt-2">Selecione uma ferramenta para começar</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Analisador de Dicionário de Dados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Faça o upload de um arquivo de dicionário de dados em HTML para analisar tabelas, colunas e chaves estrangeiras de forma interativa.
            </CardDescription>
            <Button asChild variant="outline">
              <Link href="/analisador">
                Acessar Analisador <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Share2 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-2xl">Documentação R2D2</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Consulte a documentação completa do utilitário R2D2 para importação e exportação de dados no sistema Uniplus.
            </CardDescription>
            <Button asChild>
              <Link href="/r2d2">
                Ver Documentação <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

    