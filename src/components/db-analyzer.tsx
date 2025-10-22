'use client';

import { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { parseDataDictionary, type Table, type Field } from '@/lib/parser';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, FileUp, Search, X, FileSearch, Rows, Columns, UploadCloud, ChevronUp, FilterX, Link, Download, ArrowLeft, Bot, ChevronDown, Database } from "lucide-react";
import { Highlight } from './highlight';
import { Skeleton } from "@/components/ui/skeleton";
import { getR2D2Layout } from '@/lib/r2d2-layouts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Main Component
export default function DbAnalyzer() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tableFilter, setTableFilter] = useState('');
  
  const [isPending, startTransition] = useTransition();

  const searchTerm = searchParams.get('q') || '';
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const searchMode = searchParams.get('mode') || 'all';
  const isExactMatch = searchParams.get('exact') === 'true';
  const selectedTableName = searchParams.get('tabela') || null;

  useEffect(() => {
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

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

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
    setLocalSearchTerm('');
    updateUrlParams({});
  };

  const updateUrlParams = (params: Record<string, string | null>) => {
    startTransition(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '' || value === undefined) {
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

  const handleSearchSubmit = () => {
    updateUrlParams({ q: localSearchTerm });
  };
  const handleSearchChange = (term: string) => {
    setLocalSearchTerm(term);
    if (!term) {
      updateUrlParams({ q: null });
    }
  };
  const handleSearchModeChange = (mode: string) => updateUrlParams({ mode });
  const handleExactMatchChange = (checked: boolean) => updateUrlParams({ exact: checked ? 'true' : null });
  const handleSelectTable = (tableName: string | null) => updateUrlParams({ tabela: tableName });

  const handleClearFilters = () => {
    setLocalSearchTerm('');
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
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-end mb-6">
        <Button onClick={handleFullReset} variant="outline">
          <UploadCloud className="mr-2 h-4 w-4" />
          Carregar Novo Arquivo
        </Button>
      </div>


      <StatsPanel tables={tables} />
      
      <Card className="my-8 p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Buscar em todas as tabelas, colunas, tipos..."
            className="pl-10 pr-24 h-12 text-base"
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {localSearchTerm && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSearchChange('')}>
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button size="sm" className="h-9" onClick={handleSearchSubmit} disabled={isPending}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <RadioGroup defaultValue={searchMode} onValueChange={handleSearchModeChange} className="flex flex-wrap gap-x-4 gap-y-2">
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
            <Button onClick={handleClearFilters} variant="ghost" size="sm" disabled={!searchTerm && searchMode === 'all' && !isExactMatch}>
              <FilterX className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>
        {(searchTerm) && <div className="text-right text-sm text-muted-foreground mt-2">{filteredTablesForSearch.length} de {tables.length} tabelas correspondem à busca.</div>}
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 md:sticky top-24 self-start">
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
              <ScrollArea className="h-[60vh]">
                <ul className="space-y-1 py-2">
                  {filteredTablesForList.map(table => (
                    <li key={table.name}>
                      <a 
                        href={`?tabela=${table.name}`}
                        onClick={(e) => { e.preventDefault(); handleSelectTable(table.name);}}
                        className={`block p-2 text-sm rounded-md transition-colors ${selectedTableName === table.name ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted'}`}
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
            {selectedTable ? (
              <div className='min-h-[calc(60vh+150px)]'>
                <TableDetails 
                  table={selectedTable}
                  searchTerm={searchTerm}
                  onSelectTable={handleSelectTable}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted min-h-[60vh] text-center p-8">
                <FileSearch className="w-16 h-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">Selecione uma Tabela</h2>
                <p className="text-muted-foreground mt-2 max-w-sm">Escolha uma tabela na lista à esquerda para ver seus detalhes, colunas e chaves estrangeiras.</p>
              </div>
            )}
        </section>
      </div>
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
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <Database className="mx-auto h-16 w-16 text-primary/80" />
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
                <p className="mt-4 font-semibold text-foreground">Arraste e solte o arquivo <code className="bg-muted px-1.5 py-1 rounded-sm text-sm">.html</code> aqui</p>
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
          <Link className="h-4 w-4 text-muted-foreground" />
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
  const [columnFilter, setColumnFilter] = useState('');
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Reset selected fields when table changes
    setSelectedFields({});
    setColumnFilter('');
  }, [table]);

  const handleGenerateModel = () => {
    const layout = getR2D2Layout(table.name);
    if (!layout) {
      toast({
        variant: "destructive",
        title: "Layout não encontrado",
        description: `Não foi encontrado um layout R2D2 para a tabela "${table.name}".`,
      });
      return;
    }

    const header = layout.fields.map(f => `"${f.identificacao}"`).join(';');
    const blob = new Blob(['\uFEFF' + header], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `modelo_r2d2_${layout.id.toLowerCase()}_${table.name.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Modelo Padrão Gerado",
      description: `O modelo para o layout ${layout.id} foi baixado.`,
    });
  };

  const handleGenerateCustomModel = () => {
    const selectedColumns = table.fields.filter(field => selectedFields[field.name]);
    if (selectedColumns.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhuma coluna selecionada",
        description: "Selecione ao menos uma coluna para gerar o modelo personalizado.",
      });
      return;
    }
    const header = selectedColumns.map(f => `"${f.name}"`).join(';');
    const blob = new Blob(['\uFEFF' + header], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `modelo_personalizado_${table.name.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Modelo Personalizado Gerado",
      description: `O modelo com ${selectedColumns.length} colunas foi baixado.`,
    });
  };

  const r2d2Layout = useMemo(() => getR2D2Layout(table.name), [table.name]);

  const filteredFields = useMemo(() => {
    if (!columnFilter) return table.fields;
    const filter = columnFilter.toLowerCase();
    return table.fields.filter(field => 
      field.name.toLowerCase().includes(filter) ||
      field.type.toLowerCase().includes(filter) ||
      field.description.toLowerCase().includes(filter)
    );
  }, [table.fields, columnFilter]);

  const handleSelectAll = (checked: boolean) => {
    const newSelectedFields: Record<string, boolean> = {};
    if (checked) {
      filteredFields.forEach(field => {
        newSelectedFields[field.name] = true;
      });
    }
    setSelectedFields(newSelectedFields);
  };
  
  const allFilteredSelected = filteredFields.length > 0 && filteredFields.every(field => selectedFields[field.name]);
  const isIndeterminate = filteredFields.some(field => selectedFields[field.name]) && !allFilteredSelected;


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className='flex-1'>
            <h2 className="text-2xl font-bold font-headline"><Highlight text={table.name} term={searchTerm} /></h2>
            <p className="text-muted-foreground mt-1"><Highlight text={table.description} term={searchTerm} /></p>
          </div>
          {r2d2Layout && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Gerar Modelo R2D2
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleGenerateModel}>
                    Gerar modelo padrão ({r2d2Layout.id})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateCustomModel} disabled={Object.values(selectedFields).every(v => !v)}>
                    Gerar com colunas selecionadas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Colunas ({filteredFields.length} de {table.fields.length})</h3>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Filtrar colunas..."
                value={columnFilter}
                onChange={(e) => setColumnFilter(e.target.value)}
                className="pl-8 h-9"
            />
            {columnFilter && (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setColumnFilter('')}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr className="border-b">
                  <th className="p-2 w-12 text-center">
                    <Checkbox
                      checked={allFilteredSelected}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                      aria-label="Selecionar todas as colunas visíveis"
                      data-state={isIndeterminate ? 'indeterminate' : (allFilteredSelected ? 'checked' : 'unchecked')}
                    />
                  </th>
                  <th className="p-2 font-semibold">Nome</th>
                  <th className="p-2 font-semibold">Tipo</th>
                  <th className="p-2 font-semibold">Tamanho</th>
                  <th className="p-2 font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {filteredFields.map(field => (
                  <tr key={field.name} className="border-b hover:bg-muted/50 last:border-none">
                    <td className="p-2 text-center">
                      <Checkbox
                        checked={selectedFields[field.name] || false}
                        onCheckedChange={(checked) => {
                          setSelectedFields(prev => ({...prev, [field.name]: checked as boolean}))
                        }}
                        aria-label={`Selecionar coluna ${field.name}`}
                      />
                    </td>
                    <td className="p-2 font-mono text-xs"><Highlight text={field.name} term={searchTerm || columnFilter} /></td>
                    <td className="p-2"><Highlight text={field.type} term={searchTerm || columnFilter} /></td>
                    <td className="p-2"><Highlight text={field.size} term={searchTerm} /></td>
                    <td className="p-2 text-muted-foreground"><Highlight text={field.description} term={searchTerm || columnFilter} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {table.fks.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2 mt-8">Chaves Estrangeiras ({table.fks.length})</h3>
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left bg-muted/50">
                    <tr className="border-b">
                      <th className="p-2 font-semibold">Nome</th>
                      <th className="p-2 font-semibold">Coluna</th>
                      <th className="p-2 font-semibold">Tabela Relacionada</th>
                      <th className="p-2 font-semibold">Coluna Relacionada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.fks.map(fk => (
                      <tr key={fk.name} className="border-b hover:bg-muted/50 last:border-none">
                        <td className="p-2 font-mono text-xs"><Highlight text={fk.name} term={searchTerm} /></td>
                        <td className="p-2 font-mono text-xs"><Highlight text={fk.column} term={searchTerm} /></td>
                        <td className="p-2">
                          <a 
                            href={`?tabela=${fk.relatedTable}`} 
                            onClick={(e) => {e.preventDefault(); onSelectTable(fk.relatedTable);}}
                            className="text-primary font-semibold hover:underline"
                          >
                            <Highlight text={fk.relatedTable} term={searchTerm} />
                          </a>
                        </td>
                        <td className="p-2 font-mono text-xs"><Highlight text={fk.relatedColumn} term={searchTerm} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

function DbAnalyzerFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Skeleton className="h-10 w-40 mb-6 ml-auto" />
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-40 w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1"><Skeleton className="h-[60vh] w-full" /></div>
        <div className="md:col-span-3"><Skeleton className="h-[60vh] w-full" /></div>
      </div>
    </div>
  )
}
