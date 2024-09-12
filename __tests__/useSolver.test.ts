import { useSolver } from '../src/hooks/useSolver';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('mathjs', () => ({
  evaluate: (expression: string) => {
    // Simple evaluation for basic arithmetic
    return new Function('return ' + expression)();
  }
}));

describe('useSolver', () => {
  const testCases = [
    { equation: '119-41', target: 78 },
    { equation: '21/7+9', target: 12 },
    { equation: '90/9+7', target: 17 },
    { equation: '18+6-3', target: 21 },
    { equation: '24*2-9', target: 39 },
    { equation: '112-47', target: 65 },
    { equation: '27*3-9', target: 72 },
    { equation: '28-3+7', target: 32 },
    { equation: '95/5+8', target: 27 },
    { equation: '132-59', target: 73 },
  ];

  testCases.forEach(({ equation, target }) => {
    it(`correctly solves ${equation} = ${target}`, () => {
      const { result } = renderHook(() => useSolver({
        targetNumber: target,
        solution: equation,
        slots: equation.length,
      }));

      act(() => {
        result.current.initialize();
      });

      expect(result.current.validateGuess(equation)).toBe(true);

      const correctPositions = result.current.checkGuess(equation);
      expect(correctPositions).toEqual(Array(equation.length).fill('correct'));
    });
  });

  it('handles incorrect guesses', () => {
    const { result } = renderHook(() => useSolver({
      targetNumber: 78,
      solution: '119-41',
      slots: 6,
    }));

    act(() => {
      result.current.initialize();
    });

    expect(result.current.validateGuess('120-41')).toBe(false);

    const positions = result.current.checkGuess('120-41');
    expect(positions).toEqual(['correct', 'absent', 'absent', 'correct', 'correct', 'correct']);
  });
});