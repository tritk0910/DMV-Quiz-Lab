import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

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
type IpcHandler = Parameters<typeof ipcMain.handle>[1]

function registerIpcHandler(channel: string, handler: IpcHandler): void {
  ipcMain.removeHandler(channel)
  ipcMain.handle(channel, handler)
}

function getExportFilename(format: ExportFormat): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `quiz-history-${timestamp}.${format}`
}

function escapeCsvField(value: string): string {
  const escaped = value.replace(/"/g, '""')
  return `"${escaped}"`
}

function toCsv(results: QuizResult[]): string {
  const header = [
    'id',
    'createdAt',
    'totalQuestions',
    'correctCount',
    'incorrectCount',
    'scorePercent',
    'wrongQuestionId',
    'wrongQuestion',
    'selectedOption',
    'correctOption'
  ]

  const rows = results.flatMap((result) => {
    if (result.wrongAnswers.length === 0) {
      return [
        [
          result.id,
          result.createdAt,
          String(result.totalQuestions),
          String(result.correctCount),
          String(result.incorrectCount),
          String(result.scorePercent),
          '',
          '',
          '',
          ''
        ]
      ]
    }

    return result.wrongAnswers.map((wrong) => [
      result.id,
      result.createdAt,
      String(result.totalQuestions),
      String(result.correctCount),
      String(result.incorrectCount),
      String(result.scorePercent),
      wrong.questionId,
      wrong.question,
      wrong.selectedOption,
      wrong.correctOption
    ])
  })

  return [header, ...rows]
    .map((row) => row.map((cell) => escapeCsvField(cell)).join(','))
    .join('\n')
}

async function ensureResultsFile(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true })
  try {
    await readFile(filePath, 'utf-8')
  } catch {
    await writeFile(filePath, '[]', 'utf-8')
  }
}

async function readResults(filePath: string): Promise<QuizResult[]> {
  await ensureResultsFile(filePath)
  const raw = await readFile(filePath, 'utf-8')
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as QuizResult[]) : []
  } catch {
    return []
  }
}

async function writeResults(
  filePath: string,
  results: QuizResult[]
): Promise<void> {
  await writeFile(filePath, JSON.stringify(results, null, 2), 'utf-8')
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const resultsPath = join(app.getPath('userData'), 'quiz-results.json')

  registerIpcHandler('results:list', async () => {
    return readResults(resultsPath)
  })

  registerIpcHandler('results:save', async (_event, payload: QuizResult) => {
    const current = await readResults(resultsPath)
    const next = [payload, ...current]
    await writeResults(resultsPath, next)
    return next
  })

  registerIpcHandler('results:delete-one', async (_event, resultId: string) => {
    const current = await readResults(resultsPath)
    const next = current.filter((item) => item.id !== resultId)
    await writeResults(resultsPath, next)
    return next
  })

  registerIpcHandler('results:clear-all', async () => {
    await writeResults(resultsPath, [])
    return []
  })

  registerIpcHandler('results:pick-export-directory', async () => {
    const selection = await dialog.showOpenDialog({
      title: 'Select Export Directory',
      properties: ['openDirectory', 'createDirectory']
    })

    if (selection.canceled || selection.filePaths.length === 0) {
      return null
    }

    return selection.filePaths[0]
  })

  registerIpcHandler(
    'results:export',
    async (
      _event,
      payload: { format: ExportFormat; directoryPath: string }
    ) => {
      const { format, directoryPath } = payload
      if (!directoryPath) {
        throw new Error('Export directory is required')
      }

      await mkdir(directoryPath, { recursive: true })
      const filePath = join(directoryPath, getExportFilename(format))
      const results = await readResults(resultsPath)
      const content =
        format === 'json' ? JSON.stringify(results, null, 2) : toCsv(results)

      await writeFile(filePath, content, 'utf-8')
      return filePath
    }
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
