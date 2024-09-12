import { DEFAULT_COLS } from '@/config';
import { getDailyPuzzle } from '../get-daily';
import { validatePuzzleData } from '@/types/puzzle';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slots = parseInt(searchParams.get('slots') || DEFAULT_COLS.toString(), 10);
    const forceRefresh = searchParams.get('forceRefresh') === 'true';
    const puzzleData = await getDailyPuzzle({ slots, forceRefresh });
    const validatedPuzzle = validatePuzzleData(puzzleData);
    if (validatedPuzzle) {
      return new Response(
        JSON.stringify(validatedPuzzle),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    } else {
      return new Response(
        JSON.stringify({
          error: 'Failed to validate puzzle data.',
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }
  } catch (error) {
    console.error('Error in GET request:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        stack: error instanceof Error ? error.stack : undefined,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )    
  }
}