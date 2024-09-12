import { evaluate } from "mathjs";

const operators = ['+', '-', '*', '/'];

const getRandomOperator = (): string => {
  return operators[Math.floor(Math.random() * operators.length)];
};

const getRandomNumberOfLength = (length: number): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const getRandomNumberWithMaxLength = (max: number) => { 
  const numLength = Math.floor(Math.random() * max) + 1;
  const num = getRandomNumberOfLength(numLength);
  return num
};

export const generateValidEquation = (slots: number): { equation: string; result: number } => {
  let equation = '';
  let result = NaN;
  let attempts = 0;
  const maxAttempts = 1000;

  do {    
    const equationParts: string[] = [];
    
    for (let i = 0; i < slots; i++) {      
      if(i === equationParts.join('').length) {
        let char;
        if (equationParts.length === 0 || isNaN(Number(equationParts[equationParts.length - 1]))) {
          const maxSlotLength = Math.min(slots - i, 3);
          char = getRandomNumberWithMaxLength(maxSlotLength);                    
        } else {         
          char = getRandomOperator();          
        }
        equationParts.push(char);      
      }
    }
        
    equation = equationParts.join('');

    try {
      result = evaluate(equation);
    } catch {
      result = NaN;
    }

    attempts++;
  } while ((isNaN(result) || !Number.isInteger(result)) && attempts < maxAttempts);

  if (attempts === maxAttempts) {    
    throw new Error("Failed to generate a valid equation within the specified constraints.");
  }

  return { equation, result: Math.round(result) };
};
