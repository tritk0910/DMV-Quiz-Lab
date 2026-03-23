import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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

// Custom APIs for renderer
const api = {
  getTestResults: (): Promise<QuizResult[]> =>
    electronAPI.ipcRenderer.invoke('results:list'),
  saveTestResult: (result: QuizResult): Promise<QuizResult[]> =>
    electronAPI.ipcRenderer.invoke('results:save', result),
  deleteTestResult: (resultId: string): Promise<QuizResult[]> =>
    electronAPI.ipcRenderer.invoke('results:delete-one', resultId),
  clearTestResults: (): Promise<QuizResult[]> =>
    electronAPI.ipcRenderer.invoke('results:clear-all'),
  pickExportDirectory: (): Promise<string | null> =>
    electronAPI.ipcRenderer.invoke('results:pick-export-directory'),
  exportTestResults: (
    format: ExportFormat,
    directoryPath: string
  ): Promise<string> =>
    electronAPI.ipcRenderer.invoke('results:export', { format, directoryPath })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
