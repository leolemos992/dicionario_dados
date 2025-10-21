export interface Field {
  name: string;
  type: string;
  size: string;
  description: string;
}

export interface ForeignKey {
  name: string;
  column: string;
  relatedTable: string;
  relatedColumn: string;
}

export interface Table {
  name: string;
  description: string;
  fields: Field[];
  fks: ForeignKey[];
  rawHtml: string;
  searchableText: string;
}
