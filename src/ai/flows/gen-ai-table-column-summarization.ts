'use server';
/**
 * @fileOverview A Genkit flow to summarize table and column information using GenAI.
 *
 * This file defines a flow that takes table and column data as input and uses
 * GenAI to generate succinct, natural language summaries, enhancing understanding
 * and discoverability.
 *
 * @param {DatabaseSchema} input - The database schema to summarize.
 * @returns {Promise<TableSummaries>} - A promise that resolves to an object containing summaries for each table.
 */

import {ai} from "@/ai/genkit";
import {z} from 'zod';

const TableSchema = z.object({
  name: z.string(),
  description: z.string(),
  fields: z.array(z.object({
    name: z.string(),
    type: z.string(),
    size: z.string(),
    description: z.string(),
  })),
});

const DatabaseSchema = z.array(TableSchema);

export type DatabaseSchema = z.infer<typeof DatabaseSchema>;

const TableSummariesSchema = z.object({
    summaries: z.record(z.string()).describe("An object where keys are table names and values are their summaries."),
});

export type TableSummaries = z.infer<typeof TableSummariesSchema>;

const summarizePrompt = ai.definePrompt({
  name: 'tableColumnSummarizationPrompt',
  input: {schema: DatabaseSchema},
  output: {schema: TableSummariesSchema},
  prompt: `You are a database expert. Given the following database schema, provide a succinct summary for each table. The output should be a JSON object where keys are the table names and values are the summaries.

{{#each this}}
Table Name: {{name}}
Description: {{description}}
Columns:
{{#each fields}}
- {{name}} ({{type}}, Size: {{size}}): {{description}}
{{/each}}
{{/each}}`,
});

const genAiTableColumnSummarizationFlow = ai.defineFlow(
  {
    name: 'genAiTableColumnSummarizationFlow',
    inputSchema: DatabaseSchema,
    outputSchema: TableSummariesSchema,
  },
  async input => {
    const {output} = await summarizePrompt(input);
    return output!;
  }
);

/**
 * Summarizes table and column information using GenAI.
 * @param input The database schema to summarize.
 */
export async function summarizeTableColumns(input: DatabaseSchema): Promise<TableSummaries> {
  return genAiTableColumnSummarizationFlow(input);
}
