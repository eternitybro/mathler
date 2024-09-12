import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPuzzles() {
  return prisma.puzzle.findMany({
    orderBy: { date: 'desc' },
  })
}

export async function savePuzzle(puzzle: { date: Date; equation: string; result: number }) {
  return prisma.puzzle.create({
    data: puzzle,
  })
}

export async function getLatestPuzzle() {
  return prisma.puzzle.findFirst({
    orderBy: { date: 'desc' },
  })
}

export async function getPuzzleForDate(date: Date) {
  return prisma.puzzle.findUnique({
    where: { date },
  })
}

export async function getAllPuzzles() {
  return prisma.puzzle.findMany()
}