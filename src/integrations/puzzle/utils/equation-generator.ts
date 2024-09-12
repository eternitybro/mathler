interface Node {
  value: number | string;
  left?: Node;
  right?: Node;
}

const operators = ['+', '-', '*', '/'];

function generateTree(depth: number): Node {
  if (depth === 0 || Math.random() < 0.3) {
    return { value: Math.floor(Math.random() * 100) + 1 }; // Ensure no zero values
  }
  return {
    value: operators[Math.floor(Math.random() * operators.length)],
    left: generateTree(depth - 1),
    right: generateTree(depth - 1)
  };
}

function treeToEquation(node: Node): string {
  if (typeof node.value === 'number') return node.value.toString();
  return `(${treeToEquation(node.left!)} ${node.value} ${treeToEquation(node.right!)})`;
}

function simplifyEquation(equation: string): string {
  return equation.replace(/^\((.*)\)$/, '$1');
}

export function generateValidEquation(minResult: number, maxResult: number, maxDepth: number = 3): { equation: string; result: number } {
  let equation: string;
  let result: number;
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    const tree = generateTree(Math.floor(Math.random() * maxDepth) + 1);
    equation = simplifyEquation(treeToEquation(tree));
    try {
      result = eval(equation);
    } catch {
      result = NaN;
    }
    attempts++;
  } while ((isNaN(result) || result < minResult || result > maxResult || !Number.isInteger(result) || equation.length > 10) && attempts < maxAttempts);

  if (attempts === maxAttempts) {
    throw new Error("Failed to generate a valid equation within the specified constraints.");
  }

  return { equation, result: Math.round(result) };
}
