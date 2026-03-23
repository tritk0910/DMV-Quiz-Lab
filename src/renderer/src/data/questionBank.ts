import type { QuizQuestion } from '@renderer/types/quiz'
import { chapter10 } from './chapter10'
import { chapter11 } from './chapter11'
import { chapter4 } from './chapter4'
import { chapter5 } from './chapter5'
import { chapter6 } from './chapter6'
import { chapter7 } from './chapter7'
import { chapter8 } from './chapter8'
import { chapter9 } from './chapter9'
import { roadSigns } from './roadSigns'
import type { ReactNode } from 'react'

export interface BaseQuestion {
  prompt: string | ReactNode
  correct: string
  wrong: [string, string, string]
  explanation: string
}

export const baseQuestions: BaseQuestion[] = [
  ...chapter4,
  ...chapter5,
  ...chapter6,
  ...chapter7,
  ...chapter8,
  ...chapter9,
  ...chapter10,
  ...chapter11,
  ...roadSigns
]

function shuffleOptions(options: string[], seed: number): string[] {
  const shuffled = [...options]
  let state = (seed >>> 0) + 0x6d2b79f5

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    state = Math.imul(state ^ (state >>> 15), 1 | state)
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state)
    const j = ((state ^ (state >>> 14)) >>> 0) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

export const questionBank: QuizQuestion[] = baseQuestions.map(
  (base, baseIndex) => {
    const options = shuffleOptions([base.correct, ...base.wrong], baseIndex + 1)
    const correctIndex = options.findIndex((option) => option === base.correct)
    const id = `q${String(baseIndex + 1).padStart(3, '0')}`

    return {
      id,
      question: base.prompt,
      questionText: typeof base.prompt === 'string' ? base.prompt : '',
      options,
      correctIndex,
      explanation: base.explanation
    }
  }
)
