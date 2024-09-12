import { PuzzleDataSchema, PuzzleInputSchema, PuzzleData, PuzzleInput } from '@/types/puzzle';

export const validatePuzzleData = (data: unknown): PuzzleData => {
  return PuzzleDataSchema.parse(data);
};

export const validatePuzzleInput = (data: unknown): PuzzleInput => {
  return PuzzleInputSchema.parse(data);
};
