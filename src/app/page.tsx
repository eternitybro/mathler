import React from 'react';

import { getDailyPuzzle } from '@/integrations/puzzle/get-daily';
import { MathlerGame } from '@/components/mathler-game';
import { DEFAULT_COLS } from '@/config';

export default async function MathlerPage() {

  // uncomment forceRefresh if you want a freshie every time
  const { result, equation } = await getDailyPuzzle({
    slots: DEFAULT_COLS,
    // forceRefresh: true
  });

  return (
    <MathlerGame targetNumber={result} solution={equation} slots={DEFAULT_COLS} />
  );
}