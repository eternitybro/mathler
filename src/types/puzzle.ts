import { z } from 'zod';

export const PuzzleDataSchema = z.object({
  equation: z.string(),
  result: z.number().int(),
});

export const PuzzleInputSchema = PuzzleDataSchema.extend({
  date: z.date(),
});

export type PuzzleData = z.infer<typeof PuzzleDataSchema>;
export type PuzzleInput = z.infer<typeof PuzzleInputSchema>; 

export function validatePuzzleData(data: unknown): PuzzleData {
  return PuzzleDataSchema.parse(data);
}

export function validatePuzzleInput(data: unknown): PuzzleInput {
  return PuzzleInputSchema.parse(data);
}