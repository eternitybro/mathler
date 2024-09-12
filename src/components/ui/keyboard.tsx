import React from 'react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Position } from '@/hooks/useSolver';

interface KeyboardProps {
  onInputClick: (input: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  usedInputs: Record<string, Position | null>;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onInputClick, onDelete, onEnter, usedInputs }) => {
  const keyboardLayout = [
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '0'],
    ['+', '-', '*', '/'],
  ];

  const getKeyColor = (key: string) => {
    switch (usedInputs[key]) {
      case 'correct': return 'bg-[#6aaa64] text-white hover:bg-[#6aaa64]/90';
      case 'present': return 'bg-[#c9b458] text-white hover:bg-[#c9b458]/90';
      case 'absent': return 'bg-[#787c7e] text-white hover:bg-[#787c7e]/90';
      default: return 'bg-[#d3d6da] text-black hover:bg-[#d3d6da]/90';
    }
  };

  return (
    <div className="mb-4">
      {keyboardLayout.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map(key => (
            <Button
              key={key}
              onClick={() => onInputClick(key)}
              className={cn(
                "mx-0.5 w-12 h-14 text-sm font-bold",
                getKeyColor(key)
              )}
              variant="ghost"
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center">
        <Button onClick={onDelete} className="mx-0.5 px-4 py-2 bg-[#d3d6da] hover:bg-[#d3d6da]/90 text-sm font-bold" variant="ghost">Delete</Button>
        <Button onClick={onEnter} className="mx-0.5 px-4 py-2 bg-[#d3d6da] hover:bg-[#d3d6da]/90 text-sm font-bold" variant="ghost">Enter</Button>
      </div>
    </div>
  );
};