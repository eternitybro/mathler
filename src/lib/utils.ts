import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Position } from "@/types/position";
import { format } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateShareStringzz = (guesses: string[], guessResults: Position[][]): string => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const maxGuesses = 6;
  const attempts = guesses.length;

  const guessBlocks = guessResults.map(result =>
    result.map(pos => {
      if (pos === 'correct') return '🟩';
      if (pos === 'present') return '🟨';
      return '⬜';
    }).join('')
  ).join('\n');

  const shareString = `Archive ${currentDate}\nMathler ${attempts}/${maxGuesses}\n\n${guessBlocks}`;
  return shareString;
}


// Function to generate the share string for the game result
export const generateShareString = (
  guesses: string[],
  getGuessState: (guess: string, index: number) => string, 
  maxGuesses: number, slots: number
): string => {
  const guessResults = Array.from({ length: maxGuesses }).map((_, i) => {
    // For each guess row
    if (i >= guesses.length) return ''; // Empty row if no guess

    return Array.from({ length: slots }).map((_, j) => {
      // For each character/slot in the guess
      const state = getGuessState(guesses[i], j);
      if (state === 'correct') return '🟩';
      if (state === 'present') return '🟨';
      return '⬜';
    }).join(''); // Join the blocks for this guess
  }).join('\n'); // Join all guesses by newlines

  // Format the final string (this could be improved by adding a date or game ID if needed)
  return `Mathler Game\n${guesses.length}/${maxGuesses}\n\n${guessResults}`;
}
