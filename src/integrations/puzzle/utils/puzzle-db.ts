import { PrismaClient, Puzzle } from '@prisma/client'
import { validatePuzzleInput } from '@/types/puzzle'

const prisma = new PrismaClient()

export const getPuzzles = async (): Promise<Puzzle[]> => {
  return prisma.puzzle.findMany({
    orderBy: { date: 'desc' },
  })
}

export const savePuzzle = async (puzzleData: unknown): Promise<Puzzle> => {
  const validatedPuzzle = validatePuzzleInput(puzzleData);
  return prisma.puzzle.create({
    data: validatedPuzzle,
  })
}

export const getLatestPuzzle = async (): Promise<Puzzle | null> => {
  return prisma.puzzle.findFirst({
    orderBy: { date: 'desc' },
  })
}

export const getPuzzleForDate = async (date: Date): Promise<Puzzle | null> => {
  return prisma.puzzle.findFirst({
    where: {
      date: {
        gte: date,
        lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  })
}

export const getAllPuzzles = async (): Promise<Puzzle[]> => {
  return prisma.puzzle.findMany()
}

export const deletePuzzle = async (id: number): Promise<Puzzle | null> => {
  return prisma.puzzle.delete({
    where: { id },
  })
}

export const deleteAllPuzzles = async (): Promise<{ count: number }> => {
  return prisma.puzzle.deleteMany({})
}