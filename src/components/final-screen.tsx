import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, X, Calculator, Grid3X3 } from 'lucide-react'

interface FinalScreenProps {
  guesses: string[]
  solution: string
  onClose: () => void
  onShare: () => void
  onKeepPlaying: () => void
  won: boolean
}

const FinalScreen: React.FC<FinalScreenProps> = ({
  guesses,
  solution,
  onClose = () => { },
  onShare = () => { },
  onKeepPlaying = () => { },
  won
}) => (
  <Card className="w-full max-w-sm mx-auto p-6 space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Back to puzzle</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>

    <div className="text-center space-y-2">
      <div className={`${won ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} p-2 rounded-md inline-block`}>
        <Calculator className="h-6 w-6" />
      </div>
      <h1 className="text-3xl font-bold">{won ? 'Congratulations!' : 'Better luck next time!'}</h1>
      <p className="text-xl">{won ? `You solved it in ${guesses.length} guesses.` : `You didn't solve it this time.`}</p>
    </div>

    <div className="flex items-center justify-center space-x-2 text-sm">
      <Calculator className="h-4 w-4" />
      <p>The solution was: {solution}</p>
    </div>

    <Button className="w-full" onClick={() => {
      onShare()
    }}>
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>

    <Button variant="secondary" className="w-full" onClick={onKeepPlaying}>
      <Grid3X3 className="mr-2 h-4 w-4" /> Keep playing Mathler
    </Button>
  </Card>
)


export default FinalScreen