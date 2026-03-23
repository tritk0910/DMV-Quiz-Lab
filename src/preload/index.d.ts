import { ElectronAPI } from '@electron-toolkit/preload'

interface WrongAnswerDetail {
  questionId: string
  question: string
  selectedOption: string
  correctOption: string
}

interface QuizResult {
  id: string
  createdAt: string
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  scorePercent: number
  wrongAnswers: WrongAnswerDetail[]
}

type ExportFormat = 'csv' | 'json'

interface AppAPI {
  getTestResults: () => Promise<QuizResult[]>
  saveTestResult: (result: QuizResult) => Promise<QuizResult[]>
  deleteTestResult: (resultId: string) => Promise<QuizResult[]>
  clearTestResults: () => Promise<QuizResult[]>
  pickExportDirectory: () => Promise<string | null>
  exportTestResults: (
    format: ExportFormat,
    directoryPath: string
  ) => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: AppAPI
  }
}
