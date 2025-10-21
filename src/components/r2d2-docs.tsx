'use client';

import Link from "next/link";

const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold font-headline mt-12 mb-4 pb-2 border-b-2 border-primary">{children}</h2>;
const SubTitle = ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-semibold font-headline mt-8 mb-3">{children}</h3>;
const SubSubTitle = ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-semibold font-headline mt-6 mb-2">{children}</h4>;
const Paragraph = ({ children }: { children: React.ReactNode }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
const Code = ({ children }: { children: React.ReactNode }) => <code className="bg-muted px-1.5 py-1 rounded-md text-sm font-mono text-foreground">{children}</code>;
const Important = ({ children }: { children: React.ReactNode }) => <div className="bg-primary/10 border-l-4 border-primary text-primary-foreground p-4 rounded-r-lg my-4"><strong className="font-semibold text-primary-foreground/90">Importante:</strong> {children}</div>;
const TableWrapper = ({ children }: { children: React.ReactNode }) => <div className="overflow-x-auto my-6"><table className="w-full text-sm">{children}</table></div>;
const TableHeader = ({ headers }: { headers: string[] }) => (
  <thead className="text-left bg-muted">
    <tr className="border-b">
      {headers.map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
    </tr>
  </thead>
);

type TableRowData = {
  identificacao: string;
  tipo: string;
  tamanhoMaximo: string;
  decimais: string;
  posicao: string;
  observacoes: string;
}

const TableBodyComponent = ({ data }: { data: TableRowData[] }) => (
  <tbody>
    {data.map((row, index) => (
      <tr key={index} className="border-b hover:bg-muted/50">
        <td className="p-3" dangerouslySetInnerHTML={{ __html: row.identificacao.replace(/\*/g, '<strong class="text-destructive">*</strong>') }}></td>
        <td className="p-3"><Code>{row.tipo}</Code></td>
        <td className="p-3">{row.tamanhoMaximo}</td>
        <td className="p-3">{row.decimais}</td>
        <td className="p-3">{row.posicao}</td>
        <td className="p-3" dangerouslySetInnerHTML={{ __html: row.observacoes }}></td>
      </tr>
    ))}
  </tbody>
);

const tableHeaders = ["Identificação do campo", "Tipo", "Tamanho máximo", "Decimais", "Posição", "Observações"];

const opData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo OP" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "2", observacoes: "Código da filial" },
    { identificacao: "Data", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "3", observacoes: "Data do movimento" },
    { identificacao: "Operador", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "4", observacoes: "Código do operador" },
    { identificacao: "Ecf", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "5", observacoes: "Número da ecf" },
    { identificacao: "COO", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "6", observacoes: "COO do cupom fiscal" },
    { identificacao: "CCFGNF", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "7", observacoes: "CCF do cupom fiscal ou GNF do cupom não fiscal" },
    { identificacao: "Hora inicial", tipo: "T", tamanhoMaximo: "14", decimais: "", posicao: "8", observacoes: "Hora inicial da operação" },
    { identificacao: "Hora final", tipo: "T", tamanhoMaximo: "14", decimais: "", posicao: "9", observacoes: "Hora final da operação" },
    { identificacao: "Tipo", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "10", observacoes: "Tipo da operação (1=Venda 2=Recebimento 3=Sangria 4=Suprimento 11=Corr bancário 12=Recarga celular 31=Venda manual)" },
    { identificacao: "Histórico", tipo: "C", tamanhoMaximo: "60", decimais: "", posicao: "11", observacoes: "Histórico da operação (sangria,suprimento,cancelamento)" },
    { identificacao: "Cancelado", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "12", observacoes: "1=operação cancelada" },
    { identificacao: "Supervisor cancelamento", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "13", observacoes: "Código do usuário supervisor que cancelou a operação" },
    { identificacao: "Hora cancelamento", tipo: "T", tamanhoMaximo: "14", decimais: "", posicao: "14", observacoes: "Hora do cancelamento" },
    { identificacao: "Valor bruto da operação", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "15", observacoes: "Valor bruto da operação" },
    { identificacao: "Valor arredondamento da operação", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "16", observacoes: "Valor do arredondamento da operação quando do pagamento da operação" },
    { identificacao: "Valor desconto subtotal", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "17", observacoes: "Valor do desconto do subtotal" },
    { identificacao: "Valor líquido", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "18", observacoes: "Valor líquido da operação" },
    { identificacao: "Motivo do desconto subtotal", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "19", observacoes: "Código do motivo de desconto no subtotal" },
    { identificacao: "Supervisor desconto subtotal", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "20", observacoes: "Código do usuário supervisor que concedeu desconto no subtotal" },
    { identificacao: "Ordem da venda manual", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "21", observacoes: "Ordem da venda manual (Tipo=31)" },
    { identificacao: "Série da venda manual", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "22", observacoes: "Série da venda manual (Tipo=31)" },
    { identificacao: "Subsérie da venda manual", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "23", observacoes: "Subsérie da venda manual (Tipo=31)" },
    { identificacao: "ECF Série", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "24", observacoes: "Número de série da ecf" },
    { identificacao: "ECF Letra adicional", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "25", observacoes: "Letra adicional da ecf" },
    { identificacao: "ECF Modelo", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "26", observacoes: "Modelo da ecf" },
    { identificacao: "ECF Proprietário", tipo: "N", tamanhoMaximo: "1", decimais: "27", posicao: "27", observacoes: "Número do proprietário da ecf" },
    { identificacao: "ECF Marca", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "28", observacoes: "Marca da ecf" },
    { identificacao: "IP", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "29", observacoes: "IP da estação" },
    { identificacao: "Cartão fidelidade", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "30", observacoes: "Número do cartão fidelidade" },
    { identificacao: "Cartão fidelidade lido", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "31", observacoes: "1=lido 0=digitado" },
    { identificacao: "Cliente", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "32", observacoes: "Código do cliente" },
    { identificacao: "CPFCNPJ consumidor", tipo: "C", tamanhoMaximo: "18", decimais: "", posicao: "33", observacoes: "CPF ou CNPJ do consumidor" },
    { identificacao: "Nome consumidor", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "34", observacoes: "Nome do consumidor" }
];

const itData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo IT" },
    { identificacao: "Sequência", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "2", observacoes: "Sequência do item" },
    { identificacao: "Produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "3", observacoes: "Código do produto" },
    { identificacao: "Código de barras lido", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "4", observacoes: "Código de barras lido" },
    { identificacao: "Quantidade", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "5", observacoes: "Quantidade vendida" },
    { identificacao: "UN", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "6", observacoes: "Unidade de medida" },
    { identificacao: "Preço unitário", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "7", observacoes: "Preço unitário" },
    { identificacao: "Valor do desconto", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "8", observacoes: "Valor do desconto" },
    { identificacao: "Valor do arredondamento", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "9", observacoes: "Valor do arredondamento do item" },
    { identificacao: "Valor líquido", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "10", observacoes: "Valor líquido" },
    { identificacao: "Vendedor", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "11", observacoes: "Código do vendedor" },
    { identificacao: "Cancelado", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "12", observacoes: "1=Item cancelado" },
    { identificacao: "Número de série", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "13", observacoes: "Número de série do item" },
    { identificacao: "Tributação", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "14", observacoes: "Tributação (Ex: T1700,T0700,N0000,I0000,F0000)" },
    { identificacao: "Motivo do desconto item", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "15", observacoes: "Código do motivo de desconto do item" },
    { identificacao: "Supervisor desconto item", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "16", observacoes: "Código do usuário supervisor que concedeu desconto no item" },
    { identificacao: "Item digitado", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "17", observacoes: "1=item digitado 0=item lido" },
    { identificacao: "DAV", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "18", observacoes: "Código do DAV" },
    { identificacao: "Grade", tipo: "C", tamanhoMaximo: "256", decimais: "", posicao: "19", observacoes: "Grade vendida" },
    { identificacao: "Descrição do produto", tipo: "C", tamanhoMaximo: "256", decimais: "", posicao: "20", observacoes: "Descrição do produto" },
    { identificacao: "CFOP", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "21", observacoes: "Código Fiscal de Operações e Prestações" },
    { identificacao: "Valor do Frete", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "22", observacoes: "Valor do frete rateado no item" }
];

const pgData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo PG" },
    { identificacao: "Sequência", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "2", observacoes: "Sequência de pagamento" },
    { identificacao: "Meio de pagamento", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "3", observacoes: "Código do meio de pagamento (1=Dinheiro 2=Cheque 3=TEF 4=Crediário 5=Devolução 6=POS crédito 7=POS débito)" },
    { identificacao: "Valor total", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "4", observacoes: "Valor total do meio de pagamento" },
    { identificacao: "Parcela", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "5", observacoes: "Número da parcela" },
    { identificacao: "Parcelas", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "6", observacoes: "Número total de parcelas" },
    { identificacao: "Valor da parcela", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "7", observacoes: "Valor da parcela" },
    { identificacao: "Vencimento", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "8", observacoes: "Data de vencimento da parcela" },
    { identificacao: "Documento", tipo: "C", tamanhoMaximo: "30", decimais: "", posicao: "9", observacoes: "Código do documento gerado" },
    { identificacao: "Código rede tef", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "10", observacoes: "Código da rede tef" },
    { identificacao: "Nome rede tef", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "11", observacoes: "Nome da rede tef" },
    { identificacao: "GNF Vinculado", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "12", observacoes: "GNF do cupom vinculado" },
    { identificacao: "Forma de pagamento TEF", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "13", observacoes: "Forma de pagamento do TEF: 2 – Debito 3 – Credito" },
    { identificacao: "Bandeira", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "14", observacoes: "Nome da Bandeira venda em TEF" }
];

const rcData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Observações" },
    { identificacao: "Sequência", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "2", observacoes: "Sequência de recebimento" },
    { identificacao: "Tipo do documento", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "3", observacoes: "Tipo do documento sendo recebido (5=cheque 8=crediário)" },
    { identificacao: "Documento", tipo: "C", tamanhoMaximo: "30", decimais: "", posicao: "4", observacoes: "Documento sendo recebido" },
    { identificacao: "Vencimento", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "5", observacoes: "Data de vencimento" },
    { identificacao: "Valor original", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "6", observacoes: "Valor original do documento" },
    { identificacao: "Multa", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "7", observacoes: "Valor multa" },
    { identificacao: "Juros", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "8", observacoes: "Valor juros" },
    { identificacao: "Desconto", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "9", observacoes: "Valor desconto" },
    { identificacao: "Valor pago", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "10", observacoes: "Valor do pagamento" }
];

const coData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo CO" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "2", observacoes: "Código da filial" },
    { identificacao: "Ecf", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "3", observacoes: "Número da ecf" },
    { identificacao: "COO", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "4", observacoes: "COO do cupom fiscal cancelado" },
    { identificacao: "Data e hora do cancelamento", tipo: "T", tamanhoMaximo: "14", decimais: "", posicao: "5", observacoes: "Data e hora que foi cancelado a operação" },
    { identificacao: "Usuário cancelamento", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "6", observacoes: "Usuário que cancelou" },
    { identificacao: "Modelo Nota", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "7", observacoes: "Modelo da nota fiscal: 65-NFC-e 59-CF-e-SAT" },
    { identificacao: "Série Nota", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "8", observacoes: "Série da nota fiscal, para CF-e o campo vem em branco" },
    { identificacao: "Número Nota", tipo: "C", tamanhoMaximo: "11", decimais: "", posicao: "9", observacoes: "Número da Nota fiscal" },
    { identificacao: "Série Equipamento SAT", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "10", observacoes: "Número de série do equipamento SAT" },
    { identificacao: "Série Equipamento ECF", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "10", observacoes: "Número de série do equipamento ECF" }
];

const xlData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo XL" },
    { identificacao: "XML", tipo: "C", tamanhoMaximo: "ILIMITADO", decimais: "", posicao: "2", observacoes: "Quando no arquivo conter o registro OP, o xml se trata da autorição da venda, para o registro CO, o xml autorizado do cancelamento e o registro INT é a inutilização da numeração." }
];

const intData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "1", observacoes: "Valor fixo INT" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "2", observacoes: "Código da filial" },
    { identificacao: "Modelo Nota", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "3", observacoes: "Valor fixo 65" },
    { identificacao: "Série Nota", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "4", observacoes: "Série da nota fiscal, para CF-e o campo vem em branco" },
    { identificacao: "Número Nota", tipo: "C", tamanhoMaximo: "11", decimais: "", posicao: "5", observacoes: "Número da Nota fiscal" }
];

const rzData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo RZ" },
    { identificacao: "Reservado", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "2", observacoes: "C405" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "3", observacoes: "Código da filial" },
    { identificacao: "Ecf", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "4", observacoes: "Número da ecf" },
    { identificacao: "Modelo", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "5", observacoes: "Modelo da ecf" },
    { identificacao: "Número de série", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "6", observacoes: "Número de série da ecf" },
    { identificacao: "Data", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "7", observacoes: "Data do movimento da redução Z" },
    { identificacao: "CRO", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "8", observacoes: "Contador CRO" },
    { identificacao: "CRZ", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "9", observacoes: "Contador CRZ" },
    { identificacao: "GT Final", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "10", observacoes: "Valor do grande total final" },
    { identificacao: "Venda bruta", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "11", observacoes: "Valor da venda bruta" },
    { identificacao: "Coo inicial", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "12", observacoes: "Coo inicial" },
    { identificacao: "Coo final", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "13", observacoes: "Coo final" }
];

const tpData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo TP" },
    { identificacao: "Reservado", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "2", observacoes: "C420" },
    { identificacao: "Código", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "3", observacoes: "Código do totalizador – Veja tabela abaixo" },
    { identificacao: "Valor", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "4", observacoes: "Valor totalizado" },
    { identificacao: "Reservado", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "5", observacoes: "Constante 0" }
];

const tpCodes = [
    { code: "Tnnnn", description: "Totalizador de ICMS por alíquota. Ex: T1700,T2500,etc" },
    { code: "Snnnn", description: "Totalizador de ISS por alíquota. Ex: S0700,S1000,etc" },
    { code: "F1", description: "Totalizador de substituição tributária ICMS" },
    { code: "I1", description: "Totalizador de isentas ICMS" },
    { code: "N1", description: "Totalizador de não tributadas ICMS" },
    { code: "FS1", description: "Totalizador de substituição tributária ISS" },
    { code: "IS1", description: "Totalizador de isentas ISS" },
    { code: "NS1", description: "Totalizador de não tributadas ISS" },
    { code: "OPNF", description: "Totalizador de operações não fiscais. Ex: recebimentos" },
    { code: "DT", description: "Totalizador de descontos ICMS" },
    { code: "DS", description: "Totalizador de descontos ISS" },
    { code: "AS", description: "Totalizador de acréscimos ISS" },
    { code: "Can-T", description: "Totalizador de cancelamentos ICMS" },
    { code: "Can-S", description: "Totalizador de cancelamentos ISS" }
];

const clData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo CL em cada linha do arquivo que possuir informação" },
    { identificacao: "Código", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "2", observacoes: "Se deixar em branco o sistema gera um sequencial" },
    { identificacao: "*Nome", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "3", observacoes: "" },
    { identificacao: "*Razão Social", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "4", observacoes: "Campo obrigatório quando informado CNPJ" },
    { identificacao: "CNPJ CPF", tipo: "C", tamanhoMaximo: "18", decimais: "", posicao: "5", observacoes: "" },
    { identificacao: "Insc. Estadual", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "6", observacoes: "" },
    { identificacao: "RG", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "7", observacoes: "" },
    { identificacao: "Endereço", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "8", observacoes: "Endereço sem o número" },
    { identificacao: "Número", tipo: "N", tamanhoMaximo: "6", decimais: "0", posicao: "9", observacoes: "Número" },
    { identificacao: "Complemento", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "10", observacoes: "" },
    { identificacao: "Bairro", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "11", observacoes: "" },
    { identificacao: "CEP", tipo: "C", tamanhoMaximo: "9", decimais: "", posicao: "12", observacoes: "" },
    { identificacao: "Telefone", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "13", observacoes: "(DD)NNNN-NNNN" },
    { identificacao: "Celular", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "14", observacoes: "(DD)NNNN-NNNN" },
    { identificacao: "Fax", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "15", observacoes: "(DD)NNNN-NNNN" },
    { identificacao: "Email", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "16", observacoes: "“clienteemail@dominio.com.br”" },
    { identificacao: "Data nascimento", tipo: "D", tamanhoMaximo: "10", decimais: "", posicao: "17", observacoes: "" },
    { identificacao: "Limite crédito", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "18", observacoes: "" },
    { identificacao: "Nome Contato", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "19", observacoes: "" },
    { identificacao: "Estado Civil", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "20", observacoes: "0 = CASADO; <br>1 = SOLTEIRO; <br>2 = DIVORCIADO; <br>3 = DESQUITADO; <br>4 = VIUVO; <br>5 = AMASIADO; <br>6 = NAO_IDENTIFICADO;" },
    { identificacao: "Conjuge", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "21", observacoes: "" },
    { identificacao: "Pai", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "22", observacoes: "" },
    { identificacao: "Mãe", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "23", observacoes: "" },
    { identificacao: "Profissão", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "24", observacoes: "" },
    { identificacao: "Renda", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "25", observacoes: "" },
    { identificacao: "Tipo", tipo: "C", tamanhoMaximo: "20", decimais: "0", posicao: "26", observacoes: "Nesse campo podem ser informados os valores: <br>1 – Cliente; <br>2 – Fornecedor; <br>3 – Transportadora; <br>4 – Vendedor; <br>5 – Técnico; <br>6 – Fabricante separados por vírgula Ex: (1,2,3)" },
    { identificacao: "Observação", tipo: "C", tamanhoMaximo: "Sem limites", decimais: "", posicao: "27", observacoes: "" },
    { identificacao: "Cidade", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "28", observacoes: "Nome da cidade <br>EX: FLORIANÓPOLIS, SÃO PAULO" },
    { identificacao: "*Estado", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "29", observacoes: "Código do estado; EX: SC, SP, RJ" },
    { identificacao: "Contato de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "30", observacoes: "" },
    { identificacao: "CEP de entrega", tipo: "C", tamanhoMaximo: "9", decimais: "", posicao: "31", observacoes: "" },
    { identificacao: "Estado de entrega", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "32", observacoes: "" },
    { identificacao: "Cidade de entrega", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "33", observacoes: "" },
    { identificacao: "Endereço de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "34", observacoes: "" },
    { identificacao: "Número de entrega", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "35", observacoes: "" },
    { identificacao: "Complemento do endereço de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "36", observacoes: "" },
    { identificacao: "Bairro de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "37", observacoes: "" },
    { identificacao: "Telefone entrega", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "38", observacoes: "" },
    { identificacao: "Celular entrega", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "39", observacoes: "" },
    { identificacao: "Fax de entrega", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "40", observacoes: "" },
    { identificacao: "Email de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "41", observacoes: "" },
    { identificacao: "Inativo", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "42", observacoes: "0 – Ativo; <br>1 – Inativo;" },
    { identificacao: "Nome do contato de cobrança", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "43", observacoes: "" },
    { identificacao: "Cep de cobrança", tipo: "C", tamanhoMaximo: "9", decimais: "", posicao: "44", observacoes: "" },
    { identificacao: "Estado de cobrança", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "45", observacoes: "" },
    { identificacao: "Cidade de cobrança", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "46", observacoes: "" },
    { identificacao: "Endereço de cobrança", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "47", observacoes: "" },
    { identificacao: "Número do endereço de cobrança", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "48", observacoes: "" },
    { identificacao: "Complemento de cobrança", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "49", observacoes: "" },
    { identificacao: "Bairro de cobrança", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "50", observacoes: "" },
    { identificacao: "Campo extra 1", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "51", observacoes: "" },
    { identificacao: "Campo extra 2", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "52", observacoes: "" },
    { identificacao: "Campo extra 3", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "53", observacoes: "" },
    { identificacao: "Campo extra 4", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "54", observacoes: "" },
    { identificacao: "Campo extra 5", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "55", observacoes: "" },
    { identificacao: "Campo extra 6", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "56", observacoes: "" },
    { identificacao: "Usuário", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "57", observacoes: "" },
    { identificacao: "Cliente", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "58", observacoes: "Informação se a entidade é cliente" },
    { identificacao: "Fornecedor", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "59", observacoes: "Informação se a entidade é fornecedor" },
    { identificacao: "Informação se a entidade está Bloqueada", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "60", observacoes: "1 = Sim; <br>2 = Não;" },
    { identificacao: "Id pauta de preço preferencial", tipo: "N", tamanhoMaximo: "14", decimais: "", posicao: "61", observacoes: "Pauta de preço preferencial do cliente" },
    { identificacao: "Código condição de pagamento preferencial", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "62", observacoes: "Condição de pagamento preferencial do cliente" },
    { identificacao: "Campo em branco", tipo: "C", tamanhoMaximo: "", decimais: "", posicao: "63", observacoes: "Campo utilizado somente na API" },
    { identificacao: "Tipo pessoa", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "64", observacoes: "0 = Fisíca; <br>1 = Jurídica;" }
];

const prData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo PR" },
    { identificacao: "Código", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto – Se deixar em branco o sistema gera um código sequencial" },
    { identificacao: "Referencia", tipo: "C", tamanhoMaximo: "60", decimais: "", posicao: "3", observacoes: "Referência do produto" },
    { identificacao: "Código EAN", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "4", observacoes: "Código de barras do produto" },
    { identificacao: "Inativo", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "5", observacoes: "1=inativo 0=ativo" },
    { identificacao: "Nome", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "6", observacoes: "Descrição do produto" },
    { identificacao: "Tipo", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "7", observacoes: "P-Produto; S-Serviço – Padrão “P”" },
    { identificacao: "Código do fornecedor", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "8", observacoes: "Código do fornecedor – O Código informado deve estar cadastrado no sistema ou no arquivo de importação." },
    { identificacao: "*Unidade de medida", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "9", observacoes: "Sigla da unidade de medida" },
    { identificacao: "% Lucro", tipo: "N", tamanhoMaximo: "6", decimais: "2", posicao: "10", observacoes: "% lucro" },
    { identificacao: "*Preço", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "11", observacoes: "Preço de venda" },
    { identificacao: "Peso", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "12", observacoes: "Peso do produto" },
    { identificacao: "Numero de série", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "13", observacoes: "1=Sim 0=Não" },
    { identificacao: "Tributação ICMS", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "14", observacoes: "Para produto: T = Tributado; N = Não tributado; I = Isento; F = Substituição tributária; <br>Para serviço: S = Tributado; NS = Não tributado; IS = Isento; FS = Substituição tributária." },
    { identificacao: "IPI", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "15", observacoes: "Alíquota de IPI" },
    { identificacao: "Situação tributaria", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "16", observacoes: "Código da situação tributária" },
    { identificacao: "Custo", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "17", observacoes: "Custo" },
    { identificacao: "IAT", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "18", observacoes: "A = Arredondamento; T = Truncamento" },
    { identificacao: "IPPT", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "19", observacoes: "P = fabricação própria; T = Terceiros" },
    { identificacao: "Origem", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "20", observacoes: "0 = Nacional; 1 = Importado" },
    { identificacao: "Grupo", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "21", observacoes: "Descrição do grupo de produto – O padrão GERAL" },
    { identificacao: "Fornecedor", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "22", observacoes: "Nome do fornecedor" },
    { identificacao: "Caminho da imagem", tipo: "C", tamanhoMaximo: "200", decimais: "", posicao: "23", observacoes: "“C:exportaarquivo.jpg”" },
    { identificacao: "ICMS", tipo: "N", tamanhoMaximo: "4", decimais: "2", posicao: "24", observacoes: "Para produto é alíquota do ICMS. Para serviço é alíquota do ISS." },
    { identificacao: "Tributação especial", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "25", observacoes: "Tributação especial (usado em redução da base ICMS ou ISS)" },
    { identificacao: "Casas decimais da unidade de medida", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "26", observacoes: "Número de casas decimais da unidade de medida" },
    { identificacao: "Código do grupo", tipo: "C", tamanhoMaximo: "30", decimais: "", posicao: "27", observacoes: "Código do grupo de produtos" },
    { identificacao: "Pesavel", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "28", observacoes: "1 = Produto pesável; 0 = Não" },
    { identificacao: "Tipo produto", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "29", observacoes: "00 = Mercadoria p/ venda; <br>01 = Mat. Prim.; <br>02 = Embalagem; <br>03 = Prod. em Processo; <br>04 = Prod. Acabado; <br>05 = Sub Produto; <br>06 = Prod. Intermediário; <br>07 = Mat. uso Consumo; <br>08 = Ativo Imobilizado; <br>09 = Serviços; <br>10 = Outros insumos; <br>99 = Outros" },
    { identificacao: "OBS", tipo: "", tamanhoMaximo: "Sem limites", decimais: "", posicao: "30", observacoes: "Observação sobre o produto" },
    { identificacao: "Pauta preco1", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "31", observacoes: "" },
    { identificacao: "Pauta preco2", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "32", observacoes: "" },
    { identificacao: "Pauta preco3", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "33", observacoes: "" },
    { identificacao: "Pauta preco4", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "34", observacoes: "" },
    { identificacao: "NCM", tipo: "C", tamanhoMaximo: "10", decimais: "0", posicao: "35", observacoes: "Nomenclatura Comum do Mercosul" },
    { identificacao: "Tributação do Simples Nacional NF-e", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "36", observacoes: "Tributação do Simples Nacional para NF-e" },
    { identificacao: "CST Pis/Cofins saída", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "37", observacoes: "Situação tributária Pis/Cofins de saída" },
    { identificacao: "Alíquota Pis saída", tipo: "C", tamanhoMaximo: "5", decimais: "2", posicao: "38", observacoes: "Alíquota Pis de saída" },
    { identificacao: "Alíquota Cofins saída", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "39", observacoes: "Alíquota Cofins de saída" },
    { identificacao: "CST Pis/Cofins entrada", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "40", observacoes: "Situação tributária PIS/Cofins de entrada" },
    { identificacao: "Alíquota Pis entrada", tipo: "N", tamanhoMaximo: "5", decimais: "4", posicao: "41", observacoes: "Alíquota Pis de entrada" },
    { identificacao: "Alíquota Cofins entrada", tipo: "N", tamanhoMaximo: "5", decimais: "4", posicao: "42", observacoes: "Alíquota Cofins de entrada" },
    { identificacao: "Permite informar dimensões", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "43", observacoes: "0 = não; <br>1 = sim" },
    { identificacao: "CFOP interna de entrada", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "44", observacoes: "Código do CFOP interno de entrada" },
    { identificacao: "CFOP interna de saida", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "45", observacoes: "Código do CFOP interno de saída" },
    { identificacao: "CFOP externa de entrada", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "46", observacoes: "Código do CFOP externo de entrada" },
    { identificacao: "CFOP externa de saida", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "47", observacoes: "Código do CFOP externo de saída" },
    { identificacao: "CFOP interna de entrada devolucao", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "48", observacoes: "Código do CFOP interno de entrada devolucao" },
    { identificacao: "CFOP interna de saida devolucao", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "49", observacoes: "Código do CFOP interno de saída devolução" },
    { identificacao: "CFOP externa de entrada devolução", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "50", observacoes: "Código do CFOP externo de entrada devolução" },
    { identificacao: "CFOP externa de saida devolução", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "51", observacoes: "Código do CFOP externo de saída devolução" },
    { identificacao: "CFOP interna de entrada transferência", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "52", observacoes: "Código do CFOP interno de entrada transferência" },
    { identificacao: "CFOP interna de saida transferência", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "53", observacoes: "Código do CFOP interno de saída transferência" },
    { identificacao: "CFOP externa de entrada transferência", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "54", observacoes: "Código do CFOP externa de entrada transferência" },
    { identificacao: "CFOP externa de saida transferência", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "55", observacoes: "Código do CFOP esterno de saída transferência" },
    { identificacao: "CFOP Externa de saída para não contribuinte", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "56", observacoes: "CFOP Externa de saída para não contribuinte" },
    { identificacao: "Informação extra 1", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "57", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "Informação extra 2", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "58", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "Informação extra 3", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "59", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "Informação extra 4", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "60", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "Informação extra 5", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "61", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "Informação extra 6", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "62", observacoes: "Informação do campo extra da aba Avançado" },
    { identificacao: "CEST", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "63", observacoes: "Código Especificador da Substituição Tributária" },
    { identificacao: "Informação adicional", tipo: "C", tamanhoMaximo: "500", decimais: "", posicao: "64", observacoes: "Informação adicional do produto" },
    { identificacao: "Tributação do Simples Nacional – NFC-e ou SAT", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "65", observacoes: "Tributação do Simples Nacional para NFC-e ou SAT" },
    { identificacao: "Custo médio inicial", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "66", observacoes: "Valor do custo médio inicial" },
    { identificacao: "Código da Lei complementar", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "67", observacoes: "Código da Lei complementar" },
    { identificacao: "Indicador da exigibilidade do ISS", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "68", observacoes: "Indicador da exigibilidade do ISS" },
    { identificacao: "Código da Receita sem contribuição", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "69", observacoes: "Código da Receita sem contribuição" },
    { identificacao: "Situação tributária especial para NFC-e/SAT", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "70", observacoes: "Código da Situação tributária especial para NFC-e/SAT" },
    { identificacao: "Enviar produto ao E-Commerce", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "71", observacoes: "1 = Sim; <br>0 = Não" },
    { identificacao: "Nome PDV", tipo: "C", tamanhoMaximo: "120", decimais: "", posicao: "72", observacoes: "Nome que será utilizado no PDV" },
    { identificacao: "Descrição Uniplus Shop", tipo: "C", tamanhoMaximo: "4096", decimais: "", posicao: "73", observacoes: "Descrição que aparecerá no Uniplus Shop" },
    { identificacao: "Informações no Uniplus Shop", tipo: "C", tamanhoMaximo: "4096", decimais: "", posicao: "74", observacoes: "Informações que aparecerão no Uniplus Shop" },
    { identificacao: "Código do fabricante", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "75", observacoes: "Código do fabricante" },
    { identificacao: "Peso shop", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "76", observacoes: "Peso shop" },
    { identificacao: "Altura shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "77", observacoes: "Altura shop" },
    { identificacao: "Largura shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "78", observacoes: "Largura shop" },
    { identificacao: "Comprimento shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "79", observacoes: "Comprimento shop" },
    { identificacao: "Tipo embalagem shop", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "80", observacoes: "0 = Pode despachar na própria embalagem; <br>1 = Sempre despachar na própria embalagem; <br>2 = Sempre reembalar para despachar" },
    { identificacao: "Informação Extra Balança 1", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "81", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 2", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "82", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 3", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "83", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 4", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "84", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 5", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "85", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 6", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "86", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 7", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "87", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 8", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "88", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 9", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "89", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 10", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "90", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 11", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "91", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Informação Extra Balança 12", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "92", observacoes: "Informação do campo Extra da aba Balança" },
    { identificacao: "Códigos Empresas", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "93", observacoes: "Informação de código das empresas, para quando o sistema estiver trabalhando com “Produto por empresa”" }
];

const vrData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo VR" },
    { identificacao: "*Código do produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "*Descrição", tipo: "C", tamanhoMaximo: "30", decimais: "", posicao: "3", observacoes: "Descrição da linha e/ou coluna" },
    { identificacao: "*Tipo registro", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "4", observacoes: "Tipo do registro – (0-Linha; 1-Coluna; 2-Variação; 3-Inativo)" },
    { identificacao: "*Ordem", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "5", observacoes: "Ordem do registro" },
    { identificacao: "*Código do cadastro de grade", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "6", observacoes: "Campo obrigatório somente para quem usa grade padrão" }
];

const pbData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo PB" },
    { identificacao: "*Código do produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "*EAN", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "3", observacoes: "Código de barras" },
    { identificacao: "Variação", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "4", observacoes: "Variação do produto" }
];

const psData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo PS" },
    { identificacao: "*Código do produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "*Codigo do produto similar", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "3", observacoes: "Código do produto similar" }
];

const ncmData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "1", observacoes: "Valor fixo NCM" },
    { identificacao: "*Código do NCM", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "2", observacoes: "Código do NCM" },
    { identificacao: "*Código de exceção", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "3", observacoes: "Código de exceção" },
    { identificacao: "Descrição", tipo: "C", tamanhoMaximo: "200", decimais: "", posicao: "4", observacoes: "Descrição do NCM" },
    { identificacao: "Tipo", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "5", observacoes: "Tipo do NCM (P – Produto S – Serviço)" },
    { identificacao: "Percentual do MVA", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "6", observacoes: "Percentual do MVA" },
    { identificacao: "Percentual de Redução do MVA", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "7", observacoes: "Percentual de Redução do MVA" },
    { identificacao: "Percentual imposto aproximado", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "8", observacoes: "Percentual imposto aproximado" },
    { identificacao: "Percentual imposto aprox. importação", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "9", observacoes: "Percentual imposto aproximado importação" }
];

const emData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo EM" },
    { identificacao: "*Código do produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "*Unidade de medida", tipo: "C", tamanhoMaximo: "3", decimais: "", posicao: "3", observacoes: "Unidade de medida" },
    { identificacao: "*Fator de conversão", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "4", observacoes: "A quantidade do produto da embalagem, na unidade de medida que o produto foi cadastrado" },
    { identificacao: "*Tipo da embalagem", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "5", observacoes: "0 – Compra e venda 1 – Compra 2 – Venda" },
    { identificacao: "*Preço", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "6", observacoes: "O preço do produto para esta embalagem" },
    { identificacao: "EAN", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "7", observacoes: "Código de barras para embalagem" }
];

const esData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo ES" },
    { identificacao: "*Produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "3", observacoes: "Código da filial" },
    { identificacao: "Quantidade", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "4", observacoes: "Quantidade em estoque" },
    { identificacao: "Variação", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "5", observacoes: "Variação do produto" },
    { identificacao: "Preço de custo", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "6", observacoes: "Preço de custo" },
    { identificacao: "Custo médio", tipo: "N", tamanhoMaximo: "15", decimais: "", posicao: "7", observacoes: "Custo médio" },
    { identificacao: "Local de estoque", tipo: "C", tamanhoMaximo: "5", decimais: "", posicao: "8", observacoes: "Local de estoque" }
];

const dvOpData: TableRowData[] = [
    { identificacao: "Identificação do registro", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo DV" },
    { identificacao: "*Código", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "2", observacoes: "Código do DAV" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "3", observacoes: "Código da filial" },
    { identificacao: "Tipo DAV", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "4", observacoes: "1=Pré-vendas 2=Orçamento 4=Pedido de venda 6=Pedido de faturamento" },
    { identificacao: "Valor", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "5", observacoes: "Valor total do DAV – O valor total deve fechar com o valor total dos itens – desconto de sub-totalcaso o valor não for informado, será calculado pelo valor total de todos os itens" },
    { identificacao: "*Data", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "6", observacoes: "Data do DAV" },
    { identificacao: "Cliente", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "7", observacoes: "Código do cliente" },
    { identificacao: "Vendedor", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "8", observacoes: "Código do vendedor" },
    { identificacao: "Código da Condição de pagamento preferencial", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "9", observacoes: "Código da condição de pagamento" },
    { identificacao: "Desconto sub-total", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "10", observacoes: "" },
    { identificacao: "Código de identificação", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "11", observacoes: "Associa um outro codigo de identifição da pre-venda no caixa" },
    { identificacao: "Observação", tipo: "C", tamanhoMaximo: "ILIMITADO", decimais: "", posicao: "12", observacoes: "Descrição da DAV que será impresso no rodapé do cupom fiscal" },
    { identificacao: "Código da pauta", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "13", observacoes: "Código da pauta de preço" },
    { identificacao: "Código do tipo de frete", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "14", observacoes: "0=Destinatário  1=Emitente  2=Sem frete  9=Terceiros" },
    { identificacao: "Código da transportadora", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "15", observacoes: "Código da transportadora" },
    { identificacao: "Cep de entrega", tipo: "C", tamanhoMaximo: "8", decimais: "", posicao: "16", observacoes: "Cep de entrega" },
    { identificacao: "Estado de entrega", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "17", observacoes: "Estado de entrega" },
    { identificacao: "Cidade de entrega", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "18", observacoes: "Cidade de entrega" },
    { identificacao: "Endereço de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "19", observacoes: "Endereço de entrega" },
    { identificacao: "Número da entrega", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "20", observacoes: "Número do endereço de entrega" },
    { identificacao: "Complemento do endereço de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "21", observacoes: "Complemento do endereço de entrega" },
    { identificacao: "Bairro de entrega", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "22", observacoes: "Bairro de entrega" },
    { identificacao: "Status da DAV", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "23", observacoes: "1=Fechado  2=PDV  3=Cancelado 4=Nota fiscal gerada  5=Pré-venda gerada  6=Duplicado7=Faturado parcial  8=Pedido gerado  9=Incluído por cliente  10=Mesclado" },
    { identificacao: "Valor do frete", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "24", observacoes: "Valor do frete" },
    { identificacao: "Valor desconto dos itens", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "25", observacoes: "Valor do desconto dos itens" },
    { identificacao: "Percentual desconto subtotal", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "26", observacoes: "Percentual do desconto do subtotal" },
    { identificacao: "Id do tipo de documento financeiro", tipo: "N", tamanhoMaximo: "12", decimais: "0", posicao: "27", observacoes: "" },
    { identificacao: "Campo extra 1", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "28", observacoes: "Campo extra 1" },
    { identificacao: "Campo extra 2", tipo: "C", tamanhoMaximo: "512", decimais: "", posicao: "29", observacoes: "Campo extra 2" }
];

const idData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo ID" },
    { identificacao: "*Produto", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "2", observacoes: "Código do produto" },
    { identificacao: "*Quantidade", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "3", observacoes: "Quantidade" },
    { identificacao: "*Preço da unidade", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "4", observacoes: "Preço da unidade" },
    { identificacao: "Desconto", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "5", observacoes: "Desconto total" },
    { identificacao: "Valor total", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "6", observacoes: "O valor total deve ser o (preço unitário * quatidade) – desconto. <br>Se o valor for igual a zero, a importação irá calcular automaticamente." },
    { identificacao: "Número de série", tipo: "C", tamanhoMaximo: "20", decimais: "", posicao: "7", observacoes: "Número de série" },
    { identificacao: "*Código do DAV", tipo: "C", tamanhoMaximo: "14", decimais: "", posicao: "8", observacoes: "Código do DAV" },
    { identificacao: "Número do item", tipo: "N", tamanhoMaximo: "3", decimais: "", posicao: "9", observacoes: "Número do item" },
    { identificacao: "Brinde", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "10", observacoes: "0 = Percentual<br>1 = Sim" },
    { identificacao: "Tipo de desconto", tipo: "N", tamanhoMaximo: "1", decimais: "", posicao: "11", observacoes: "0 = Percentual<br>1 = Valor" },
    { identificacao: "Unidade de medida", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "12", observacoes: "Código da unidade de medida" },
    { identificacao: "Variações", tipo: "C", tamanhoMaximo: "500", decimais: "", posicao: "13", observacoes: "Variações" },
    { identificacao: "Informações adicionais", tipo: "C", tamanhoMaximo: "500", decimais: "", posicao: "14", observacoes: "Informações adicionais" }
];

const usData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo US" },
    { identificacao: "*Código", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "2", observacoes: "Código do usuário" },
    { identificacao: "*Nome", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "3", observacoes: "Nome do usuário" },
    { identificacao: "*Senha", tipo: "C", tamanhoMaximo: "40", decimais: "", posicao: "4", observacoes: "Senha do usuário" },
    { identificacao: "Supervisor", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "5", observacoes: "1=supervisor 0=não" },
    { identificacao: "%Desconto máximo", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "6", observacoes: "Percentual máximo de desconto" },
    { identificacao: "*ID do perfil", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "7", observacoes: "Id do perfil de usuário (usar 5 se foi pelo instalador)" }
];

const rcFinanceiroData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo RC" },
    { identificacao: "*Tipo", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "2", observacoes: "R=Receber  P=Pagar" },
    { identificacao: "*Tipo documento financeiro", tipo: "N", tamanhoMaximo: "5", decimais: "0", posicao: "3", observacoes: "Campo obrigatório – O ID informado deve existir no cadastro de Tipos de documentos financeiro,se o Tipo for igual R a ação do tipo de documento deve ser receber, ou se o Tipo for igual P, a acao deve ser pagar." },
    { identificacao: "*Numero documento", tipo: "C", tamanhoMaximo: "30", decimais: "", posicao: "4", observacoes: "" },
    { identificacao: "Filial", tipo: "C", tamanhoMaximo: "4", decimais: "", posicao: "5", observacoes: "Se deixado em branco vai ser atribuído a filial que o usuário estiver logado" },
    { identificacao: "Número de Parcelas", tipo: "N", tamanhoMaximo: "5", decimais: "0", posicao: "6", observacoes: "" },
    { identificacao: "*Data emissão", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "7", observacoes: "" },
    { identificacao: "*Data vencimento", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "8", observacoes: "" },
    { identificacao: "*Valor", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "9", observacoes: "" },
    { identificacao: "Desconto", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "10", observacoes: "" },
    { identificacao: "*Código Cliente", tipo: "C", tamanhoMaximo: "10", decimais: "", posicao: "11", observacoes: "" },
    { identificacao: "Historio", tipo: "C", tamanhoMaximo: "100", decimais: "", posicao: "12", observacoes: "" },
    { identificacao: "Saldo", tipo: "N", tamanhoMaximo: "12", decimais: "2", posicao: "13", observacoes: "Saldo em aberto do documento financeiro" },
    { identificacao: "Data Pagamento", tipo: "D", tamanhoMaximo: "8", decimais: "", posicao: "14", observacoes: "Data que foi feito o pagamento do documento" },
    { identificacao: "Status do Documento", tipo: "C", tamanhoMaximo: "1", decimais: "", posicao: "15", observacoes: "Status do Documento: A=Aberto Q=Quitado" }
];

const cpData: TableRowData[] = [
    { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", decimais: "", posicao: "1", observacoes: "Valor fixo CP" },
    { identificacao: "*Codigo", tipo: "C", tamanhoMaximo: "6", decimais: "", posicao: "2", observacoes: "" },
    { identificacao: "*Descricao", tipo: "C", tamanhoMaximo: "50", decimais: "", posicao: "3", observacoes: "" },
    { identificacao: "*Prazos", tipo: "C", tamanhoMaximo: "128", decimais: "", posicao: "4", observacoes: "EX: 30.60.90 – Os prazos devem ser separados por ponto" },
    { identificacao: "Multiplicar por", tipo: "N", tamanhoMaximo: "5", decimais: "4", posicao: "5", observacoes: "" }
];


export function R2D2Docs() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1 className="text-5xl font-extrabold font-headline mb-4">Documentação R2D2</h1>

      <SectionTitle>O que é?</SectionTitle>
      <Paragraph>
        O R2D2 é um utilitário do Uniplus projetado para a importação e exportação automatizada de dados, utilizando um layout padronizado.
      </Paragraph>
      <Paragraph>
        Esse recurso permite a integração eficiente entre o Uniplus e outros sistemas, garantindo a troca estruturada de informações sem a necessidade de inserção manual.
      </Paragraph>
      <Paragraph>
        Um dos seus principais diferenciais é o monitoramento contínuo das pastas de importação e exportação, processando arquivos conforme os padrões estabelecidos.
      </Paragraph>
      <Paragraph>
        Os dados enviados para o Uniplus passam por uma validação rigorosa, garantindo que apenas informações compatíveis sejam importadas, enquanto arquivos incorretos são realocados para análise posterior.
      </Paragraph>
      <Paragraph>
        A funcionalidade R2D2 fica em execução em segundo plano permitindo que as operações de importação e exportação ocorram de forma contínua e segura, sem impactar o desempenho do sistema.
      </Paragraph>

      <SectionTitle>Como Funciona no Uniplus?</SectionTitle>
      <SubTitle>1. Instalando o recurso</SubTitle>
      <Paragraph>
        Para fazer a instalação do R2D2, deve-se executar o arquivo <Code>r2d2.exe</Code>, que está localizado na pasta de instalação do Uniplus. Na sua primeira execução, o R2D2 irá criar as seguintes pastas:
      </Paragraph>
      <ul className="list-disc list-inside text-muted-foreground mb-4">
        <li><Code>.r2d2backup</Code></li>
        <li><Code>.r2d2exportacao</Code></li>
        <li><Code>.r2d2importacao</Code></li>
        <li><Code>.r2d2log</Code></li>
      </ul>
      <Important>
        O R2D2 deve estar em execução para que o processo de importação/exportação funcione de modo contínuo. É recomendado que o <Code>r2d2.exe</Code> seja ativado automaticamente assim que o sistema operacional for iniciado.
      </Important>
      
      <SubTitle>2. Entendendo o recurso</SubTitle>
      <Paragraph>
        A cada operação efetuada pelo Uniplus, o R2D2 irá gravar um arquivo com as informações da operação (conforme o layout) na pasta <Code>exportacao</Code>. A aplicação que irá importar este arquivo deve, portanto, ficar monitorando esta pasta e importar todo arquivo que for gravado nela.
      </Paragraph>
      <Paragraph>
        No caso da aplicação querer enviar informações para o Uniplus, a aplicação deverá gravar um arquivo (conforme o layout) na pasta <Code>importacao</Code>. O R2D2 monitora esta pasta e importa os arquivos que forem encontrados nela.
      </Paragraph>
      <Important>
        O R2D2 importa somente dados válidos. Sendo assim, arquivos que não estejam em conformidade com o layout serão rejeitados.
      </Important>
      <Paragraph>
        Nessas situações o arquivo problemático será movido para a pasta <Code>backup</Code>. Em seguida será gerado um log com a ocorrência.
      </Paragraph>
      <Paragraph>
        O log é exibido na tela e nos arquivos da pasta <Code>log</Code>.
      </Paragraph>
      <Paragraph>
        Por outro lado, arquivo importados com sucesso são automaticamente excluídos após a importação.
      </Paragraph>

      <SubTitle>3. Visão geral do layout</SubTitle>
      <Paragraph>Esse layout foi desenvolvido para facilitar o processo de importação/exportação, uma vez que pode ser gerado pelo próprio Excel (.CSV).</Paragraph>
      <Important>
        Informações importantes:
        <ul className="list-disc list-inside mt-2">
            <li>A partir da Build 6.8.0, esse arquivo deixa de existir no diretório de instalação do sistema;</li>
            <li>Os campos não possuem tamanho fixo, apenas um tamanho máximo;</li>
            <li>Para descartar o campo, basta deixa-lo em branco;</li>
            <li>O separador utilizado é o ponto e virgula(;).</li>
            <li>Os campos do tipo <Code>D</Code> devem ser informados no formato <Code>AAAAMMDD</Code>;</li>
            <li>Os campos do tipo <Code>T</Code> dever ser informados no formato <Code>AAAAMMDDHHMMSS</Code>;</li>
            <li>Os campos do tipo <Code>N</Code>, tem como separador decimal o ponto(.) (Não é necessário informar o separador de milhar);</li>
            <li>Os campos são obrigatórios e caso não possuam informação podem ficar em branco, exceto os campos com asterisco(*), esses precisam possuir informação conforme especificação;</li>
            <li>Confira no final do manual um exemplo de arquivo pronto para importação de produtos tanto em Excel (.csv) quando em .txt.</li>
            <li>Somente será permitido arquivos na formatação UTF-8.</li>
        </ul>
      </Important>

      <SectionTitle>4. Arquivos de exportação</SectionTitle>

      <SubSubTitle>4.1 OP Operação</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={opData} />
        </TableWrapper>

      <SubSubTitle>4.2 IT Itens vendidos</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={itData} />
        </TableWrapper>

      <SubSubTitle>4.3 Meios de pagamento</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={pgData} />
        </TableWrapper>

      <SubSubTitle>4.4 RC Recebimento</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={rcData} />
        </TableWrapper>

      <SubSubTitle>4.5 CO Cancelamento de operação</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={coData} />
        </TableWrapper>

      <SubSubTitle>4.5 XL XML da venda ou cancelamento operações NFC-e ouCFE-e-SAT</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={xlData} />
        </TableWrapper>
      
      <SubSubTitle>4.6 INT Inutilização número de nota da NFC-e</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={intData} />
        </TableWrapper>
      
      <SubSubTitle>4.7 RZ Redução Z</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={rzData} />
        </TableWrapper>

      <SubSubTitle>4.8 TP Totalizador da redução Z</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={tpData} />
        </TableWrapper>
        <TableWrapper>
          <TableHeader headers={["Código", "Descrição do totalizador"]} />
          <tbody>
            {tpCodes.map(item => (
              <tr key={item.code} className="border-b hover:bg-muted/50">
                <td className="p-3"><Code>{item.code}</Code></td>
                <td className="p-3">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>

      <SectionTitle>5. Arquivos de importação</SectionTitle>

      <SubSubTitle>5.1 CL Cliente</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={clData} />
        </TableWrapper>
      
      <SubSubTitle>5.2 PR Produto</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={prData} />
        </TableWrapper>

      <SubSubTitle>5.3 VR Variação</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={vrData} />
        </TableWrapper>

      <SubSubTitle>5.4 PB Código de barras do produto</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={pbData} />
        </TableWrapper>
      
      <SubSubTitle>5.5 PS Produtos similares</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={psData} />
        </TableWrapper>
        
      <SubSubTitle>5.6 NCM</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={ncmData} />
        </TableWrapper>
        
      <SubSubTitle>5.6 EM Embalagens</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={emData} />
        </TableWrapper>
        
      <SubSubTitle>5.7 ES Saldo em estoque</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={esData} />
        </TableWrapper>
        
      <SubSubTitle>5.8 DV DAV (Pre-vendas, Orçamento ou Pedido de venda)</SubSubTitle>
        <p className='font-bold'>Op Operação</p>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={dvOpData} />
        </TableWrapper>
        
      <SubSubTitle>5.9 ID Item DAV</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={idData} />
        </TableWrapper>
        
      <SubSubTitle>5.10 US Usuário PAFECF</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={usData} />
        </TableWrapper>
        
      <SubSubTitle>5.11 RC Financeiro</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={rcFinanceiroData} />
        </TableWrapper>
        
      <SubSubTitle>5.12 CP Condição de pagamento</SubSubTitle>
        <TableWrapper>
          <TableHeader headers={tableHeaders} />
          <TableBodyComponent data={cpData} />
        </TableWrapper>
        
      <SectionTitle>6. Exemplo de arquivo pronto</SectionTitle>
      <Paragraph>
        Confira abaixo um exemplo de arquivo pronto para importação de produtos tanto em Excel (.csv) quando em .txt.
      </Paragraph>
      <div className="my-6">
        <img src="https://storage.googleapis.com/static.aiforge.co/project-assets/22a89369-3a67-4043-98a2-23c27e8f553f/r2d2-example.png" alt="Exemplo de arquivo de produto para R2D2" className="w-full rounded-lg border" />
      </div>

      <SectionTitle>Conclusão e Próximos Passos</SectionTitle>
      <Paragraph>
        Agora que você entende como o utilitário R2D2 funciona para importação e exportação de dados, o próximo passo é entender a estrutura do banco de dados com o qual você irá interagir. É aqui que o <strong>Analisador de Dicionário de Dados</strong> se torna essencial.
      </Paragraph>
      <Paragraph>
        O Analisador permite que você carregue o arquivo de dicionário de dados (em formato HTML) e explore todas as tabelas, colunas, tipos de dados e relacionamentos. Com esse conhecimento, você poderá construir seus arquivos de importação (<Code>.csv</Code> ou <Code>.txt</Code>) para o R2D2 com precisão, garantindo que os dados correspondam exatamente ao layout esperado pelo sistema Uniplus.
      </Paragraph>
      <Important>
        Use o <Link href="/analisador" className="font-bold underline hover:text-primary/80">Analisador de Dicionário de Dados</Link> para consultar a estrutura das tabelas antes de gerar seus arquivos para o R2D2. Isso minimizará erros e garantirá uma integração de dados bem-sucedida.
      </Important>
    </article>
  )
}

    