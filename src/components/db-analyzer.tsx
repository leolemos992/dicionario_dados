
'use client';

import { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { parseDataDictionary, type Table } from '@/lib/parser';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, FileUp, Search, X, FileSearch, Rows, Type, Columns, UploadCloud, ChevronUp, FilterX } from "lucide-react";
import { ModeToggle } from './mode-toggle';
import { Highlight } from './highlight';
import { Skeleton } from "@/components/ui/skeleton";
import { BackToTop } from '@/components/back-to-top';


// Main Component
export default function DbAnalyzer() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isClient, setIsClient] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tableFilter, setTableFilter] = useState('');
  
  const [isPending, startTransition] = useTransition();

  const searchTerm = searchParams.get('q') || '';
  const searchMode = searchParams.get('mode') || 'all';
  const isExactMatch = searchParams.get('exact') === 'true';
  const selectedTableName = searchParams.get('tabela') || null;

  useEffect(() => {
    setIsClient(true);
    try {
      const savedHtml = localStorage.getItem('dicionarioHtml');
      if (savedHtml) {
        processFileContent(savedHtml);
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processFileContent = useCallback((html: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const parsedTables = parseDataDictionary(html);
        if (parsedTables.length === 0) {
          throw new Error("Nenhuma tabela encontrada no arquivo. Verifique o formato.");
        }
        setTables(parsedTables);
        setFileContent(html);
        localStorage.setItem('dicionarioHtml', html);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao processar arquivo",
          description: error.message,
        });
        localStorage.removeItem('dicionarioHtml');
        setFileContent(null);
        setTables([]);
      } finally {
        setIsProcessing(false);
      }
    }, 50);
  }, [toast]);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    if (!file.name.endsWith('.html')) {
      toast({
        variant: "destructive",
        title: "Arquivo inválido",
        description: "Por favor, selecione um arquivo .html",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if(content) {
        processFileContent(content);
      }
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Erro de Leitura",
        description: "Não foi possível ler o arquivo selecionado.",
      });
    };
    reader.readAsText(file);
  };
  
  const handleFullReset = () => {
    localStorage.removeItem('dicionarioHtml');
    setFileContent(null);
    setTables([]);
    updateUrlParams({});
  };

  const updateUrlParams = (params: Record<string, string | null>) => {
    startTransition(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    });
  };

  const handleSearchChange = (term: string) => updateUrlParams({ q: term || null });
  const handleSearchModeChange = (mode: string) => updateUrlParams({ mode });
  const handleExactMatchChange = (checked: boolean) => updateUrlParams({ exact: checked ? 'true' : null });
  const handleSelectTable = (tableName: string | null) => updateUrlParams({ tabela: tableName });

  const handleClearFilters = () => {
    updateUrlParams({ q: null, mode: 'all', exact: null });
  };

  const filteredTablesForSearch = useMemo(() => {
    if (!tables) return [];
    let filtered = tables;
    if (searchTerm) {
      const matchFn = (text: string) => isExactMatch
          ? text.toLowerCase() === searchTerm.toLowerCase()
          : text.toLowerCase().includes(searchTerm.toLowerCase());

      filtered = tables.filter(table => {
          switch(searchMode) {
              case 'tableName': return matchFn(table.name);
              case 'columnName': return table.fields.some(f => matchFn(f.name));
              case 'dataType': return table.fields.some(f => matchFn(f.type));
              default: return table.searchableText.toLowerCase().includes(searchTerm.toLowerCase());
          }
      });
    }
    return filtered;
  }, [tables, searchTerm, searchMode, isExactMatch]);

  const filteredTablesForList = useMemo(() => {
    let tablesToFilter = searchTerm ? filteredTablesForSearch : tables;
    if (tableFilter) {
      tablesToFilter = tablesToFilter.filter(table => 
        table.name.toLowerCase().includes(tableFilter.toLowerCase())
      );
    }
    return tablesToFilter.sort((a, b) => a.name.localeCompare(b.name));
  }, [tables, searchTerm, filteredTablesForSearch, tableFilter]);


  const selectedTable = useMemo(() => {
    if (!selectedTableName) return null;
    return tables.find(t => t.name === selectedTableName) || null;
  }, [tables, selectedTableName]);


  if (isLoading) {
    return <DbAnalyzerFallback />;
  }

  if (!fileContent) {
    return <UploadView onFileSelect={handleFileSelect} isProcessing={isProcessing} />;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 pt-0">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-foreground">Analisador de Dicionário de Dados</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleFullReset} variant="outline">
            <UploadCloud className="mr-2 h-4 w-4" />
            Carregar Novo Arquivo
          </Button>
          <ModeToggle />
        </div>
      </header>

      <StatsPanel tables={tables} />
      
      <div className="my-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Buscar em todas as tabelas, colunas, tipos..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleSearchChange('')}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <RadioGroup defaultValue={searchMode} onValueChange={handleSearchModeChange} className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="r-all" /><Label htmlFor="r-all">Tudo</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="tableName" id="r-table" /><Label htmlFor="r-table">Nomes de Tabela</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="columnName" id="r-column" /><Label htmlFor="r-column">Nomes de Coluna</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="dataType" id="r-type" /><Label htmlFor="r-type">Tipos de Dados</Label></div>
          </RadioGroup>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="exact-match" checked={isExactMatch} onCheckedChange={(checked) => handleExactMatchChange(checked as boolean)} />
              <Label htmlFor="exact-match">Busca Exata</Label>
            </div>
            <Button onClick={handleClearFilters} variant="outline" size="sm" disabled={!searchTerm && searchMode === 'all' && !isExactMatch}>
              <FilterX className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        </div>
        {(searchTerm) && <div className="text-right text-sm text-muted-foreground mt-2">{filteredTablesForSearch.length} de {tables.length} tabelas correspondem à busca principal.</div>}
      </div>
      
      <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader className='pb-4'>
              <CardTitle>Tabelas ({filteredTablesForList.length})</CardTitle>
              <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                      placeholder="Filtrar tabelas..."
                      value={tableFilter}
                      onChange={(e) => setTableFilter(e.target.value)}
                      className="pl-8 h-9"
                  />
                  {tableFilter && (
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setTableFilter('')}>
                          <X className="h-4 w-4" />
                      </Button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[calc(60vh-60px)]">
                <ul>
                  {filteredTablesForList.map(table => (
                    <li key={table.name}>
                      <a 
                        href={`?tabela=${table.name}`}
                        onClick={(e) => { e.preventDefault(); handleSelectTable(table.name);}}
                        className={`block p-2 rounded-md transition-colors ${selectedTableName === table.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                      >
                       <Highlight text={table.name} term={searchTerm || tableFilter} />
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        <section className="md:col-span-3">
          <Card className="h-full">
            <ScrollArea className="h-[calc(60vh+88px)] p-1">
              <div className="p-6">
                {selectedTable ? (
                  <TableDetails 
                    table={selectedTable}
                    searchTerm={searchTerm}
                    onSelectTable={handleSelectTable}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
                    <FileSearch className="w-16 h-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold">Selecione uma Tabela</h2>
                    <p className="text-muted-foreground">Escolha uma tabela na lista à esquerda para ver seus detalhes.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </section>
      </main>

       {isClient && <BackToTop />}
    </div>
  );
}

// Sub-components

const UploadView = ({ onFileSelect, isProcessing }: { onFileSelect: (file: File) => void, isProcessing: boolean }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragOver(true);
    } else if (e.type === 'dragleave') {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl mx-auto text-center">
        <UploadCloud className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">Analisador de Dicionário de Dados</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Arraste e solte o arquivo HTML do seu dicionário de dados para começar a análise.
        </p>
        <label
          htmlFor="file-upload"
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          className={`mt-10 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 cursor-pointer transition-colors ${isDragOver ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
        >
          <div className="text-center">
            {isProcessing ? (
              <>
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 font-semibold text-foreground">Processando arquivo...</p>
                <p className="text-sm text-muted-foreground">Isso pode levar alguns instantes.</p>
              </>
            ) : (
              <>
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-semibold text-foreground">Arraste e solte o arquivo <code className="bg-muted px-1 py-0.5 rounded">.html</code> aqui</p>
                <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
              </>
            )}
          </div>
          <input id="file-upload" type="file" className="sr-only" accept=".html" onChange={(e) => e.target.files && onFileSelect(e.target.files[0])} disabled={isProcessing} />
        </label>
      </div>
    </div>
  );
};


const StatsPanel = ({ tables }: { tables: Table[] }) => {
  const totalFields = useMemo(() => tables.reduce((acc, t) => acc + t.fields.length, 0), [tables]);
  const totalFks = useMemo(() => tables.reduce((acc, t) => acc + t.fks.length, 0), [tables]);
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Tabelas</CardTitle>
          <Rows className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{tables.length}</div></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Colunas</CardTitle>
          <Columns className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{totalFields}</div></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chaves Estrangeiras</CardTitle>
          <Type className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{totalFks}</div></CardContent>
      </Card>
    </div>
  );
};

const TableDetails = ({ table, searchTerm, onSelectTable }: { 
  table: Table, 
  searchTerm: string, 
  onSelectTable: (name: string) => void,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-2"><Highlight text={table.name} term={searchTerm} /></h2>
      <p className="text-muted-foreground mb-4"><Highlight text={table.description} term={searchTerm} /></p>
      
      <h3 className="text-xl font-semibold mb-2 mt-6">Colunas ({table.fields.length})</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b">
              <th className="p-2 font-semibold">Nome</th>
              <th className="p-2 font-semibold">Tipo</th>
              <th className="p-2 font-semibold">Tamanho</th>
              <th className="p-2 font-semibold">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {table.fields.map(field => (
              <tr key={field.name} className="border-b hover:bg-muted/50">
                <td className="p-2"><Highlight text={field.name} term={searchTerm} /></td>
                <td className="p-2"><Highlight text={field.type} term={searchTerm} /></td>
                <td className="p-2"><Highlight text={field.size} term={searchTerm} /></td>
                <td className="p-2"><Highlight text={field.description} term={searchTerm} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.fks.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2 mt-6">Chaves Estrangeiras ({table.fks.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="p-2 font-semibold">Nome</th>
                  <th className="p-2 font-semibold">Coluna</th>
                  <th className="p-2 font-semibold">Tabela Relacionada</th>
                  <th className="p-2 font-semibold">Coluna Relacionada</th>
                </tr>
              </thead>
              <tbody>
                {table.fks.map(fk => (
                  <tr key={fk.name} className="border-b hover:bg-muted/50">
                    <td className="p-2"><Highlight text={fk.name} term={searchTerm} /></td>
                    <td className="p-2"><Highlight text={fk.column} term={searchTerm} /></td>
                    <td className="p-2">
                      <a 
                        href={`?tabela=${fk.relatedTable}`} 
                        onClick={(e) => {e.preventDefault(); onSelectTable(fk.relatedTable);}}
                        className="text-primary hover:underline"
                      >
                        <Highlight text={fk.relatedTable} term={searchTerm} />
                      </a>
                    </td>
                    <td className="p-2"><Highlight text={fk.relatedColumn} term={searchTerm} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1"><Skeleton className="h-[60vh] w-full" /></div>
        <div className="md:col-span-3"><Skeleton className="h-[60vh] w-full" /></div>
      </div>
    </div>
  )
}
