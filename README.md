# DMV Quiz Lab

A desktop practice-test app for the New York State DMV learner's permit knowledge test. Built with Electron, React, and TypeScript.

## Features

- **129 practice questions** across the eight chapters of the NY Driver's Manual tested on the real permit exam (Chapters 4–11) plus a dedicated road-sign image set.
- **Random-draw quizzes** with shuffled answer options each session.
- **Instant explanations** revealed after each question so you learn the reasoning, not just the answer.
- **Score history** persisted between sessions, including a breakdown of which questions you missed.
- **Dark and light themes** that follow your OS preference and remember your choice.
- **Keyboard- and mouse-friendly UI** with a sticky navbar and a scroll-to-top button for long pages.
- **Portable Windows build** — a single `.exe`, no installer, no admin rights, no registry entries.

## Download

Grab the latest portable `.exe` from the [Releases page](https://github.com/tritk0910/DMV-Quiz-Lab/releases) and run it. No installation required.

## Tech stack

- [Electron](https://www.electronjs.org/) + [electron-vite](https://electron-vite.org/) (main / preload / renderer split)
- [React 19](https://react.dev/) + [React Router 7](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling, [lucide-react](https://lucide.dev/) for icons
- [electron-builder](https://www.electron.build/) for packaging

## Project layout

```
src/
  main/         Electron main process
  preload/      Context-bridge API exposed to the renderer
  renderer/src/
    pages/      HomePage, QuizPage, HistoryPage
    components/ Layout, ScrollToTop, ui/ primitives
    data/       Question bank (chapter4–chapter11 + roadSigns)
    lib/        quiz logic and utility helpers
    types/      Shared TypeScript types
```

## Development

```bash
yarn              # install dependencies
yarn dev          # launch the app with hot reload
yarn typecheck    # run TS type checks
yarn lint         # ESLint
yarn format       # Prettier + ESLint --fix
```

## Disclaimer

This is an unofficial study tool. Question content is paraphrased from publicly available material in the New York State Driver's Manual (MV-21). Always verify against the [official NY DMV resources](https://dmv.ny.gov/) before your exam.

## License

No license declared yet — all rights reserved by the author.
