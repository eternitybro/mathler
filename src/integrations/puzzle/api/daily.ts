import { NextResponse } from 'next/server';

import { savePuzzle, getPuzzleForDate, getAllPuzzles } from '../utils/puzzle-db';
import { generateValidEquation } from '../utils/equation-generator';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let puzzle = await getPuzzleForDate(today);

    if (puzzle) {
      return NextResponse.json({ result: puzzle.result, equation: puzzle.equation });
    } else {
      const allPuzzles = await getAllPuzzles();
      let newPuzzle: { equation: string; result: number };
      let attempts = 0;
      const maxAttempts = 100;

      do {
        newPuzzle = generateValidEquation(1, 999);
        attempts++;
      } while (
        allPuzzles.some((p: { equation: string; result: number }) => p.equation === newPuzzle.equation || p.result === newPuzzle.result) &&
        attempts < maxAttempts
      );

      if (attempts === maxAttempts) {
        throw new Error("Failed to generate a unique puzzle after maximum attempts");
      }

      puzzle = await savePuzzle({
        date: today,
        equation: newPuzzle.equation,
        result: newPuzzle.result
      });

      return NextResponse.json({ result: puzzle.result, equation: puzzle.equation });
    }
  } catch (error) {
    console.error('Error generating daily puzzle:', error);
    return NextResponse.json({ error: 'Failed to generate daily puzzle' }, { status: 500 });
  }
}