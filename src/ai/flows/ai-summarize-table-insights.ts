'use server';
/**
 * @fileOverview A Genkit flow to provide AI-powered insights into a table schema.
 *
 * This file defines a flow that takes table schema data as input and uses
 * GenAI to generate key insights, such as identifying potential data inconsistencies, complex relationships, or security vulnerabilities.
 *
 * @param {string} tableSchema - The table schema to analyze.
 * @returns {Promise<string>} - A promise that resolves to an object containing a summary for the table.
 */

import {ai} from "@/ai/genkit";
import {z} from 'zod';
import { TableSummaries } from "./gen-ai-table-column-summarization";

const TableSchemaInputSchema = z.string().describe('The table schema to analyze.');
export type TableSchemaInput = z.infer<typeof TableSchemaInputSchema>;

const TableInsightsOutputSchema = z.object({
  insights: z.string().describe('Key insights from the table schema, including potential data inconsistencies, relationships, and vulnerabilities.'),
});
export type TableInsightsOutput = z.infer<typeof TableInsightsOutputSchema>;

const summarizePrompt = ai.definePrompt({
  name: 'tableInsightsPrompt',
  input: {schema: TableSchemaInputSchema},
  output: {schema: TableInsightsOutputSchema},
  prompt: `You are a database expert. Given the following table schema, provide a succinct summary of key insights, such as identifying potential data inconsistencies, complex relationships, or security vulnerabilities.

Table Schema:
{{input}}`,
});

const aiSummarizeTableInsightsFlow = ai.defineFlow(
  {
    name: 'aiSummarizeTableInsightsFlow',
    inputSchema: TableSchemaInputSchema,
    outputSchema: TableInsightsOutputSchema,
  },
  async input => {
    const {output} = await summarizePrompt(input);
    return output!;
  }
);

/**
 * Summarizes table schema information using GenAI.
 * @param tableSchema The table schema to summarize.
 */
export async function summarizeTableInsights(tableSchema: TableSchemaInput): Promise<TableInsightsOutput> {
  return aiSummarizeTableInsightsFlow(tableSchema);
}
