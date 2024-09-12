import { useState, useCallback } from 'react';


// 119 - 41
// 21 / 7 + 9
// 90 / 9 + 7
// 18 + 6 – 3
// 24 * 2 – 9
// 112 – 47
// 27 * 3 – 9
// 28 – 3 + 7
// 95 / 5 + 8
// 132 – 59





type Operator = '+' | '-' | '*' | '/';
type ExpressionElement = number | Operator;

const operators: Operator[] = ['+', '-', '*', '/'];

export const useSolver = (target: number, length: number) => {
  const [solutions, setSolutions] = useState<string[]>([]);

  const generateExpressions = useCallback((current: ExpressionElement[], value: number): string[] => {
    if (current.length === length) {
      return value === target ? [current.join('')] : [];
    }

    let results: string[] = [];
    const isEvenPosition = current.length % 2 === 0;

    if (isEvenPosition) {
      for (let digit = 0; digit <= 9; digit++) {
        results = results.concat(generateExpressions([...current, digit], applyLastOperation(current, value, digit)));
      }
    } else {
      operators.forEach(op => {
        results = results.concat(generateExpressions([...current, op], value));
      });
    }

    return results;
  }, [target, length]);

  const applyLastOperation = (current: ExpressionElement[], value: number, digit: number): number => {
    if (current.length < 2) return digit;
    const lastOp = current[current.length - 1] as Operator;
    switch (lastOp) {
      case '+': return value + digit;
      case '-': return value - digit;
      case '*': return value * digit;
      case '/': return Math.trunc(value / digit);
    }
  };

  const initialize = useCallback(() => {
    const newSolutions = generateExpressions([], 0);
    setSolutions(newSolutions);
  }, [generateExpressions]);

  const checkGuess = useCallback((guess: string): Position[] => {
    if (solutions.length === 0) return [];
    
    const solution = solutions[0];
    const result: Position[] = new Array(length).fill('absent');
    const solutionCounts = new Map<string, number>();
    
    for (const char of solution) {
      solutionCounts.set(char, (solutionCounts.get(char) || 0) + 1);
    }
       
    for (let i = 0; i < length; i++) {
      if (guess[i] === solution[i]) {
        result[i] = 'correct';
        solutionCounts.set(guess[i], solutionCounts.get(guess[i])! - 1);
      }
    }
        
    for (let i = 0; i < length; i++) {
      if (result[i] === 'absent') {
        const count = solutionCounts.get(guess[i]) || 0;
        if (count > 0) {
          result[i] = 'present';
          solutionCounts.set(guess[i], count - 1);
        }
      }
    }
    
    return result;
  }, [solutions, length]);

  return { initialize, checkGuess, solutions };
};
