'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered insights into a database schema.
 *
 * It identifies potential data anomalies and valuable relationships within the schema.
 *
 * - `analyzeDatabaseSchema` -  A function that calls the flow to analyze the database schema.
 * - `AnalyzeDatabaseSchemaInput` - The input type for the analyzeDatabaseSchema function.
 * - `AnalyzeDatabaseSchemaOutput` - The return type for the analyzeDatabaseSchema function. *
 */

import {ai} from "@/ai/genkit";
import {z} from 'zod';

const AnalyzeDatabaseSchemaInputSchema = z.string().describe('The database schema in HTML format.');
export type AnalyzeDatabaseSchemaInput = z.infer<typeof AnalyzeDatabaseSchemaInputSchema>;

const AnalyzeDatabaseSchemaOutputSchema = z.object({
  insights: z.string().describe('AI-powered insights about the database schema.'),
});
export type AnalyzeDatabaseSchemaOutput = z.infer<typeof AnalyzeDatabaseSchemaOutputSchema>;


export async function analyzeDatabaseSchema(input: AnalyzeDatabaseSchemaInput): Promise<AnalyzeDatabaseSchemaOutput> {
  return analyzeDatabaseSchemaFlow(input);
}

const analyzeDatabaseSchemaPrompt = ai.definePrompt({
  name: 'analyzeDatabaseSchemaPrompt',
  input: {schema: AnalyzeDatabaseSchemaInputSchema},
  output: {schema: AnalyzeDatabaseSchemaOutputSchema},
  prompt: `You are an AI assistant that analyzes database schemas to identify potential data anomalies and valuable relationships.

  Analyze the following database schema provided in HTML format:
  {{{input}}}

  Provide a summary of your insights, highlighting any potential issues, relationships, or valuable information that a database expert should investigate.`,  
});

const analyzeDatabaseSchemaFlow = ai.defineFlow(
  {
    name: 'analyzeDatabaseSchemaFlow',
    inputSchema: AnalyzeDatabaseSchemaInputSchema,
    outputSchema: AnalyzeDatabaseSchemaOutputSchema,
  },
  async input => {
    const {output} = await analyzeDatabaseSchemaPrompt(input);
    return output!;
  }
);
