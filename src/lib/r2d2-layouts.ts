
interface R2D2Field {
  identificacao: string;
  tipo: 'C' | 'N' | 'D' | 'T';
  tamanhoMaximo: string;
  decimais?: string;
  posicao: string;
  observacoes?: string;
}

interface R2D2Layout {
  id: string;
  name: string;
  fields: R2D2Field[];
}

const layouts: R2D2Layout[] = [
  {
    id: 'CL',
    name: 'Cliente',
    fields: [
      { identificacao: 'Identificação', tipo: 'C', tamanhoMaximo: '2', posicao: '1' },
      { identificacao: 'Código', tipo: 'C', tamanhoMaximo: '10', posicao: '2' },
      { identificacao: '*Nome', tipo: 'C', tamanhoMaximo: '50', posicao: '3' },
      { identificacao: '*Razão Social', tipo: 'C', tamanhoMaximo: '50', posicao: '4' },
      { identificacao: 'CNPJ CPF', tipo: 'C', tamanhoMaximo: '18', posicao: '5' },
      { identificacao: 'Insc. Estadual', tipo: 'C', tamanhoMaximo: '20', posicao: '6' },
      { identificacao: 'RG', tipo: 'C', tamanhoMaximo: '20', posicao: '7' },
      { identificacao: 'Endereço', tipo: 'C', tamanhoMaximo: '50', posicao: '8' },
      { identificacao: 'Número', tipo: 'N', tamanhoMaximo: '6', decimais: '0', posicao: '9' },
      { identificacao: 'Complemento', tipo: 'C', tamanhoMaximo: '50', posicao: '10' },
      { identificacao: 'Bairro', tipo: 'C', tamanhoMaximo: '50', posicao: '11' },
      { identificacao: 'CEP', tipo: 'C', tamanhoMaximo: '9', posicao: '12' },
      { identificacao: 'Telefone', tipo: 'C', tamanhoMaximo: '40', posicao: '13' },
      { identificacao: 'Celular', tipo: 'C', tamanhoMaximo: '40', posicao: '14' },
      { identificacao: 'Fax', tipo: 'C', tamanhoMaximo: '40', posicao: '15' },
      { identificacao: 'Email', tipo: 'C', tamanhoMaximo: '50', posicao: '16' },
      { identificacao: 'Data nascimento', tipo: 'D', tamanhoMaximo: '10', posicao: '17' },
      { identificacao: 'Limite crédito', tipo: 'N', tamanhoMaximo: '12', decimais: '2', posicao: '18' },
      { identificacao: 'Nome Contato', tipo: 'C', tamanhoMaximo: '50', posicao: '19' },
      { identificacao: 'Estado Civil', tipo: 'N', tamanhoMaximo: '2', decimais: '0', posicao: '20' },
      { identificacao: 'Conjuge', tipo: 'C', tamanhoMaximo: '50', posicao: '21' },
      { identificacao: 'Pai', tipo: 'C', tamanhoMaximo: '50', posicao: '22' },
      { identificacao: 'Mãe', tipo: 'C', tamanhoMaximo: '50', posicao: '23' },
      { identificacao: 'Profissão', tipo: 'C', tamanhoMaximo: '50', posicao: '24' },
      { identificacao: 'Renda', tipo: 'N', tamanhoMaximo: '12', decimais: '2', posicao: '25' },
      { identificacao: 'Tipo', tipo: 'C', tamanhoMaximo: '20', decimais: '0', posicao: '26' },
      { identificacao: 'Observação', tipo: 'C', tamanhoMaximo: 'Sem limites', posicao: '27' },
      { identificacao: 'Cidade', tipo: 'C', tamanhoMaximo: '100', posicao: '28' },
      { identificacao: '*Estado', tipo: 'C', tamanhoMaximo: '2', posicao: '29' },
      { identificacao: 'Contato de entrega', tipo: 'C', tamanhoMaximo: '50', posicao: '30' },
      { identificacao: 'CEP de entrega', tipo: 'C', tamanhoMaximo: '9', posicao: '31' },
      { identificacao: 'Estado de entrega', tipo: 'C', tamanhoMaximo: '2', posicao: '32' },
      { identificacao: 'Cidade de entrega', tipo: 'C', tamanhoMaximo: '100', posicao: '33' },
      { identificacao: 'Endereço de entrega', tipo: 'C', tamanhoMaximo: '50', posicao: '34' },
      { identificacao: 'Número de entrega', tipo: 'C', tamanhoMaximo: '6', posicao: '35' },
      { identificacao: 'Complemento do endereço de entrega', tipo: 'C', tamanhoMaximo: '50', posicao: '36' },
      { identificacao: 'Bairro de entrega', tipo: 'C', tamanhoMaximo: '50', posicao: '37' },
      { identificacao: 'Telefone entrega', tipo: 'C', tamanhoMaximo: '40', posicao: '38' },
      { identificacao: 'Celular entrega', tipo: 'C', tamanhoMaximo: '40', posicao: '39' },
      { identificacao: 'Fax de entrega', tipo: 'C', tamanhoMaximo: '40', posicao: '40' },
      { identificacao: 'Email de entrega', tipo: 'C', tamanhoMaximo: '50', posicao: '41' },
      { identificacao: 'Inativo', tipo: 'N', tamanhoMaximo: '1', posicao: '42' },
      { identificacao: 'Nome do contato de cobrança', tipo: 'C', tamanhoMaximo: '50', posicao: '43' },
      { identificacao: 'Cep de cobrança', tipo: 'C', tamanhoMaximo: '9', posicao: '44' },
      { identificacao: 'Estado de cobrança', tipo: 'C', tamanhoMaximo: '2', posicao: '45' },
      { identificacao: 'Cidade de cobrança', tipo: 'C', tamanhoMaximo: '100', posicao: '46' },
      { identificacao: 'Endereço de cobrança', tipo: 'C', tamanhoMaximo: '50', posicao: '47' },
      { identificacao: 'Número do endereço de cobrança', tipo: 'C', tamanhoMaximo: '6', posicao: '48' },
      { identificacao: 'Complemento de cobrança', tipo: 'C', tamanhoMaximo: '50', posicao: '49' },
      { identificacao: 'Bairro de cobrança', tipo: 'C', tamanhoMaximo: '50', posicao: '50' },
      { identificacao: 'Campo extra 1', tipo: 'C', tamanhoMaximo: '512', posicao: '51' },
      { identificacao: 'Campo extra 2', tipo: 'C', tamanhoMaximo: '512', posicao: '52' },
      { identificacao: 'Campo extra 3', tipo: 'C', tamanhoMaximo: '512', posicao: '53' },
      { identificacao: 'Campo extra 4', tipo: 'C', tamanhoMaximo: '512', posicao: '54' },
      { identificacao: 'Campo extra 5', tipo: 'C', tamanhoMaximo: '512', posicao: '55' },
      { identificacao: 'Campo extra 6', tipo: 'C', tamanhoMaximo: '512', posicao: '56' },
      { identificacao: 'Usuário', tipo: 'C', tamanhoMaximo: '10', posicao: '57' },
      { identificacao: 'Cliente', tipo: 'N', tamanhoMaximo: '1', posicao: '58' },
      { identificacao: 'Fornecedor', tipo: 'N', tamanhoMaximo: '1', posicao: '59' },
      { identificacao: 'Informação se a entidade está Bloqueada', tipo: 'N', tamanhoMaximo: '1', posicao: '60' },
      { identificacao: 'Id pauta de preço preferencial', tipo: 'N', tamanhoMaximo: '14', posicao: '61' },
      { identificacao: 'Código condição de pagamento preferencial', tipo: 'C', tamanhoMaximo: '14', posicao: '62' },
      { identificacao: 'Campo em branco', tipo: 'C', tamanhoMaximo: '', posicao: '63' },
      { identificacao: 'Tipo pessoa', tipo: 'N', tamanhoMaximo: '1', posicao: '64' },
    ],
  },
  {
    id: 'PR',
    name: 'Produto',
    fields: [
        { identificacao: "Identificação", tipo: "C", tamanhoMaximo: "2", posicao: "1" },
        { identificacao: "Código", tipo: "C", tamanhoMaximo: "20", posicao: "2" },
        { identificacao: "Referencia", tipo: "C", tamanhoMaximo: "60", posicao: "3" },
        { identificacao: "Código EAN", tipo: "C", tamanhoMaximo: "20", posicao: "4" },
        { identificacao: "Inativo", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "5" },
        { identificacao: "Nome", tipo: "C", tamanhoMaximo: "50", posicao: "6" },
        { identificacao: "Tipo", tipo: "C", tamanhoMaximo: "1", posicao: "7" },
        { identificacao: "Código do fornecedor", tipo: "C", tamanhoMaximo: "14", posicao: "8" },
        { identificacao: "*Unidade de medida", tipo: "C", tamanhoMaximo: "3", posicao: "9" },
        { identificacao: "% Lucro", tipo: "N", tamanhoMaximo: "6", decimais: "2", posicao: "10" },
        { identificacao: "*Preço", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "11" },
        { identificacao: "Peso", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "12" },
        { identificacao: "Numero de série", tipo: "N", tamanhoMaximo: "2", decimais: "0", posicao: "13" },
        { identificacao: "Tributação ICMS", tipo: "C", tamanhoMaximo: "2", posicao: "14" },
        { identificacao: "IPI", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "15" },
        { identificacao: "Situação tributaria", tipo: "C", tamanhoMaximo: "2", posicao: "16" },
        { identificacao: "Custo", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "17" },
        { identificacao: "IAT", tipo: "C", tamanhoMaximo: "2", posicao: "18" },
        { identificacao: "IPPT", tipo: "C", tamanhoMaximo: "2", posicao: "19" },
        { identificacao: "Origem", tipo: "C", tamanhoMaximo: "2", posicao: "20" },
        { identificacao: "Grupo", tipo: "C", tamanhoMaximo: "40", posicao: "21" },
        { identificacao: "Fornecedor", tipo: "C", tamanhoMaximo: "50", posicao: "22" },
        { identificacao: "Caminho da imagem", tipo: "C", tamanhoMaximo: "200", posicao: "23" },
        { identificacao: "ICMS", tipo: "N", tamanhoMaximo: "4", decimais: "2", posicao: "24" },
        { identificacao: "Tributação especial", tipo: "C", tamanhoMaximo: "10", posicao: "25" },
        { identificacao: "Casas decimais da unidade de medida", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "26" },
        { identificacao: "Código do grupo", tipo: "C", tamanhoMaximo: "30", posicao: "27" },
        { identificacao: "Pesavel", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "28" },
        { identificacao: "Tipo produto", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "29" },
        { identificacao: "OBS", tipo: 'C', tamanhoMaximo: "Sem limites", posicao: "30" },
        { identificacao: "Pauta preco1", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "31" },
        { identificacao: "Pauta preco2", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "32" },
        { identificacao: "Pauta preco3", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "33" },
        { identificacao: "Pauta preco4", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "34" },
        { identificacao: "NCM", tipo: "C", tamanhoMaximo: "10", decimais: "0", posicao: "35" },
        { identificacao: "Tributação do Simples Nacional NF-e", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "36" },
        { identificacao: "CST Pis/Cofins saída", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "37" },
        { identificacao: "Alíquota Pis saída", tipo: "C", tamanhoMaximo: "5", decimais: "2", posicao: "38" },
        { identificacao: "Alíquota Cofins saída", tipo: "N", tamanhoMaximo: "5", decimais: "2", posicao: "39" },
        { identificacao: "CST Pis/Cofins entrada", tipo: "C", tamanhoMaximo: "2", decimais: "0", posicao: "40" },
        { identificacao: "Alíquota Pis entrada", tipo: "N", tamanhoMaximo: "5", decimais: "4", posicao: "41" },
        { identificacao: "Alíquota Cofins entrada", tipo: "N", tamanhoMaximo: "5", decimais: "4", posicao: "42" },
        { identificacao: "Permite informar dimensões", tipo: "N", tamanhoMaximo: "1", posicao: "43" },
        { identificacao: "CFOP interna de entrada", tipo: "C", tamanhoMaximo: "6", posicao: "44" },
        { identificacao: "CFOP interna de saida", tipo: "C", tamanhoMaximo: "6", posicao: "45" },
        { identificacao: "CFOP externa de entrada", tipo: "C", tamanhoMaximo: "6", posicao: "46" },
        { identificacao: "CFOP externa de saida", tipo: "C", tamanhoMaximo: "6", posicao: "47" },
        { identificacao: "CFOP interna de entrada devolucao", tipo: "C", tamanhoMaximo: "6", posicao: "48" },
        { identificacao: "CFOP interna de saida devolucao", tipo: "C", tamanhoMaximo: "6", posicao: "49" },
        { identificacao: "CFOP externa de entrada devolução", tipo: "C", tamanhoMaximo: "6", posicao: "50" },
        { identificacao: "CFOP externa de saida devolução", tipo: "C", tamanhoMaximo: "6", posicao: "51" },
        { identificacao: "CFOP interna de entrada transferência", tipo: "C", tamanhoMaximo: "6", posicao: "52" },
        { identificacao: "CFOP interna de saida transferência", tipo: "C", tamanhoMaximo: "6", posicao: "53" },
        { identificacao: "CFOP externa de entrada transferência", tipo: "C", tamanhoMaximo: "6", posicao: "54" },
        { identificacao: "CFOP externa de saida transferência", tipo: "C", tamanhoMaximo: "6", posicao: "55" },
        { identificacao: "CFOP Externa de saída para não contribuinte", tipo: "C", tamanhoMaximo: "6", posicao: "56" },
        { identificacao: "Informação extra 1", tipo: "C", tamanhoMaximo: "50", posicao: "57" },
        { identificacao: "Informação extra 2", tipo: "C", tamanhoMaximo: "50", posicao: "58" },
        { identificacao: "Informação extra 3", tipo: "C", tamanhoMaximo: "50", posicao: "59" },
        { identificacao: "Informação extra 4", tipo: "C", tamanhoMaximo: "50", posicao: "60" },
        { identificacao: "Informação extra 5", tipo: "C", tamanhoMaximo: "50", posicao: "61" },
        { identificacao: "Informação extra 6", tipo: "C", tamanhoMaximo: "50", posicao: "62" },
        { identificacao: "CEST", tipo: "C", tamanhoMaximo: "10", posicao: "63" },
        { identificacao: "Informação adicional", tipo: "C", tamanhoMaximo: "500", posicao: "64" },
        { identificacao: "Tributação do Simples Nacional – NFC-e ou SAT", tipo: "N", tamanhoMaximo: "3", decimais: "0", posicao: "65" },
        { identificacao: "Custo médio inicial", tipo: "N", tamanhoMaximo: "15", decimais: "6", posicao: "66" },
        { identificacao: "Código da Lei complementar", tipo: "C", tamanhoMaximo: "10", posicao: "67" },
        { identificacao: "Indicador da exigibilidade do ISS", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "68" },
        { identificacao: "Código da Receita sem contribuição", tipo: "C", tamanhoMaximo: "10", posicao: "69" },
        { identificacao: "Situação tributária especial para NFC-e/SAT", tipo: "C", tamanhoMaximo: "3", posicao: "70" },
        { identificacao: "Enviar produto ao E-Commerce", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "71" },
        { identificacao: "Nome PDV", tipo: "C", tamanhoMaximo: "120", posicao: "72" },
        { identificacao: "Descrição Uniplus Shop", tipo: "C", tamanhoMaximo: "4096", posicao: "73" },
        { identificacao: "Informações no Uniplus Shop", tipo: "C", tamanhoMaximo: "4096", posicao: "74" },
        { identificacao: "Código do fabricante", tipo: "C", tamanhoMaximo: "10", posicao: "75" },
        { identificacao: "Peso shop", tipo: "N", tamanhoMaximo: "12", decimais: "3", posicao: "76" },
        { identificacao: "Altura shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "77" },
        { identificacao: "Largura shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "78" },
        { identificacao: "Comprimento shop", tipo: "N", tamanhoMaximo: "12", decimais: "1", posicao: "79" },
        { identificacao: "Tipo embalagem shop", tipo: "N", tamanhoMaximo: "1", decimais: "0", posicao: "80" },
        { identificacao: "Informação Extra Balança 1", tipo: "C", tamanhoMaximo: "100", posicao: "81" },
        { identificacao: "Informação Extra Balança 2", tipo: "C", tamanhoMaximo: "100", posicao: "82" },
        { identificacao: "Informação Extra Balança 3", tipo: "C", tamanhoMaximo: "100", posicao: "83" },
        { identificacao: "Informação Extra Balança 4", tipo: "C", tamanhoMaximo: "100", posicao: "84" },
        { identificacao: "Informação Extra Balança 5", tipo: "C", tamanhoMaximo: "100", posicao: "85" },
        { identificacao: "Informação Extra Balança 6", tipo: "C", tamanhoMaximo: "100", posicao: "86" },
        { identificacao: "Informação Extra Balança 7", tipo: "C", tamanhoMaximo: "100", posicao: "87" },
        { identificacao: "Informação Extra Balança 8", tipo: "C", tamanhoMaximo: "100", posicao: "88" },
        { identificacao: "Informação Extra Balança 9", tipo: "C", tamanhoMaximo: "100", posicao: "89" },
        { identificacao: "Informação Extra Balança 10", tipo: "C", tamanhoMaximo: "100", posicao: "90" },
        { identificacao: "Informação Extra Balança 11", tipo: "C", tamanhoMaximo: "100", posicao: "91" },
        { identificacao: "Informação Extra Balança 12", tipo: "C", tamanhoMaximo: "100", posicao: "92" },
        { identificacao: "Códigos Empresas", tipo: "C", tamanhoMaximo: "10", posicao: "93" },
    ],
  },
  // Add other layouts here...
];

const layoutMappings: Record<string, string> = {
    'CLIENTES': 'CL',
    'PRODUTOS': 'PR',
    'ENTIDADE': 'CL',
    // Adicione outros mapeamentos aqui, ex: 'FORNECEDORES': 'CL'
};


export const getR2D2Layout = (tableName: string): R2D2Layout | undefined => {
    const upperTableName = tableName.toUpperCase();

    // Try direct mapping first
    const mappedId = layoutMappings[upperTableName];
    if (mappedId) {
        return layouts.find(l => l.id === mappedId);
    }

    // Fallback to searching by name
    const found = layouts.find(l => upperTableName.includes(l.name.toUpperCase()));
    return found;
};
