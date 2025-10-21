import { type Table, type Field, type ForeignKey } from './types';

export const parseDataDictionary = (htmlString: string): Table[] => {
  if (typeof window === 'undefined') return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const tableDivs = doc.querySelectorAll("div[style='margin-bottom: 80px;']");

  const tables: Table[] = [];

  tableDivs.forEach(div => {
    const tableEl = div.querySelector('table');
    if (!tableEl) return;

    const rows = Array.from(tableEl.querySelectorAll('tr'));
    if (rows.length < 2) return;

    const name = rows[0]?.querySelector('td')?.textContent?.trim();
    if (!name) return;

    const description = rows[1]?.querySelector('td')?.textContent?.trim() || '';
    const fields: Field[] = [];
    const fks: ForeignKey[] = [];

    let isFkSection = false;
    
    for (let i = 2; i < rows.length; i++) {
        const cells = Array.from(rows[i].querySelectorAll('th, td'));
        
        if (cells.length === 1 && (cells[0].textContent?.includes('Chaves Estrangeiras') || cells[0].textContent?.includes('Foreign Keys'))) {
            isFkSection = true;
            continue;
        }
        
        if (cells.length < 4 || cells[0].tagName !== 'TD') continue;
        
        const [c1, c2, c3, c4] = cells.map(cell => cell.innerHTML.replace(/&nbsp;/g, ' ').trim());
        
        if (!isFkSection) {
            fields.push({ name: c1, type: c2, size: c3, description: c4 });
        } else {
            fks.push({ name: c1, column: c2, relatedTable: c3, relatedColumn: c4 });
        }
    }

    const searchableText = `${name} ${description} ${fields.map(f => `${f.name} ${f.type} ${f.description}`).join(' ')}`.toLowerCase();

    tables.push({ name, description, fields, fks, searchableText, rawHtml: div.outerHTML });
  });

  return tables;
};
