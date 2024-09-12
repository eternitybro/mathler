# Mathler

Mathler is a mathematical puzzle game inspired by Wordle. Players attempt to guess a hidden mathematical equation that equals a given target number within a limited number of tries.

## Features

- Daily unique mathematical puzzles (can forceRefresh if needed)
- Server-side puzzle generation and validation
- Client-side game logic with React
- Prisma ORM with SQLite database for puzzle storage
- Zod for runtime type checking and validation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm / pnpm / yarn / bun (pick your poison)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mathler.git
   cd mathler
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. To run tests:
   ```
   npm run test
   ```
   
5. Open [http://localhost:3001](http://localhost:3001) in your browser to play the game.

## Project Structure

- `/app`: Next.js app router files
- `/components`: React components
- `/integrations`: Integration logic (e.g., puzzle generation, API routes)
- `/prisma`: Prisma schema and migrations
- `/types`: TypeScript type definitions
- `/utils`: Utility functions (e.g., validation)

## API

The game uses a simple API to fetch daily puzzles:

- `GET /api/daily`: Retrieves the daily puzzle

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema declaration and validation library
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript

## Acknowledgments

- Inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html)
- Built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), and [Prisma](https://www.prisma.io/)
- Uses [Zod](https://github.com/colinhacks/zod) for runtime type checking
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## License

This project is licensed under the MIT License.
