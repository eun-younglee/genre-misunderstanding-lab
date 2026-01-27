# Genre Misunderstanding Lab

A creative web application that transforms text into different genres using LLM models. Enter any text and watch it be reinterpreted through various stylistic lenses - from military operation reports to biblical prophecies.

## 🧪 Features

- **Text Transformation**: Convert any text into 5 distinct genres:

  - Military Operation Report
  - Bible or Prophecy
  - 1980s Rockstar Interview
  - Psychiatric Case File
  - Authoritarian Government Internal Document

- **Session History**: Track your previous transformations with persistent session storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd genre-misunderstand
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your API keys for the language model services.

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (for history storage)
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── rewrite/     # Text transformation endpoint
│   │   └── history/     # Session history endpoint
│   ├── _components/     # React components
│   │   ├── TextPanel/   # Input/output text areas
│   │   └── Loading/     # Loading states
│   ├── hooks.tsx        # Custom React hooks
│   └── layout.tsx       # Root layout
├── components/ui/       # shadcn/ui components
└── lib/
    └── utils.ts         # Utility functions
```

## 🎭 Genre Transformations

Each genre applies specific transformation rules:

- **Military Operation Report**: Formal military language with operation codes and threat assessments
- **Bible or Prophecy**: Archaic, solemn language interpreting events as cosmic signs
- **1980s Rockstar Interview**: Evasive, metaphor-heavy responses in interview format
- **Psychiatric Case File**: Clinical tone describing emotions as symptoms
- **Authoritarian Government Document**: Bureaucratic language with compliance framing

## 🎨 Customization

### Adding New Genres

1. Add the genre to the `GENRES` array in `src/app/page.tsx`
2. Define transformation rules in `src/app/api/rewrite/constants.ts`
3. Add loading text and error messages to the respective objects

### Adding New Models

1. Add the model to the `MODELS` array in `src/app/page.tsx`
2. Map the openrouter model in `MODELS` object in `src/app/api/rewrite/constants.ts`

## 📝 Development

### Code Style

This project uses ESLint with Next.js configuration for consistent code formatting.

## 🎯 Future Enhancements

- [ ] More genre options
- [ ] Custom genre creation
- [ ] Export functionality
- [ ] User accounts and cloud sync
- [ ] Batch text processing
- [ ] API rate limiting and caching
