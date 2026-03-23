import type { ReactNode } from 'react'

export interface QuizQuestion {
  id: string
  question: ReactNode
  questionText: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface WrongAnswerDetail {
  questionId: string
  question: string
  selectedOption: string
  correctOption: string
}

export interface QuizResult {
  id: string
  createdAt: string
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  scorePercent: number
  wrongAnswers: WrongAnswerDetail[]
}
