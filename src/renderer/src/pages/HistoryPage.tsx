import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Separator } from '@renderer/components/ui/separator'
import type { QuizResult } from '@renderer/types/quiz'
import { MIN_QUESTION_COUNT } from '@renderer/lib/quiz'

export default function HistoryPage(): React.JSX.Element {
  const [results, setResults] = useState<QuizResult[]>([])
  const [exportDirectory, setExportDirectory] = useState<string>('')
  const [exportStatus, setExportStatus] = useState<string>('')
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    void window.api.getTestResults().then(setResults)
  }, [])

  const chooseExportDirectory = async (): Promise<void> => {
    const selectedPath = await window.api.pickExportDirectory()
    if (!selectedPath) return
    setExportDirectory(selectedPath)
    setExportStatus(`Export folder selected: ${selectedPath}`)
  }

  const exportHistory = async (format: 'csv' | 'json'): Promise<void> => {
    if (!exportDirectory || isExporting) return

    setIsExporting(true)
    setExportStatus('Export in progress...')

    try {
      const filePath = await window.api.exportTestResults(
        format,
        exportDirectory
      )
      setExportStatus(`Exported ${format.toUpperCase()} to: ${filePath}`)
    } catch {
      setExportStatus(`Failed to export ${format.toUpperCase()} file.`)
    } finally {
      setIsExporting(false)
    }
  }

  const clearAllHistory = async (): Promise<void> => {
    if (isDeleting) return
    if (
      !window.confirm('Delete all saved test history? This cannot be undone.')
    )
      return

    setIsDeleting(true)
    try {
      const next = await window.api.clearTestResults()
      setResults(next)
      setExportStatus('All history deleted.')
    } catch {
      setExportStatus('Failed to delete all history.')
    } finally {
      setIsDeleting(false)
    }
  }

  const deleteAttempt = async (resultId: string): Promise<void> => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      const next = await window.api.deleteTestResult(resultId)
      setResults(next)
      setExportStatus('Attempt deleted.')
    } catch {
      setExportStatus('Failed to delete attempt.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Test history</CardTitle>
            <CardDescription>
              {results.length} attempts saved in local JSON storage
            </CardDescription>
          </div>
          <Button onClick={() => navigate(`/quiz?count=${MIN_QUESTION_COUNT}`)}>
            Start new test
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={chooseExportDirectory}>
              Choose export folder
            </Button>
            <Button
              onClick={() => void exportHistory('json')}
              disabled={!exportDirectory || isExporting}
            >
              Export JSON
            </Button>
            <Button
              variant="secondary"
              onClick={() => void exportHistory('csv')}
              disabled={!exportDirectory || isExporting}
            >
              Export CSV
            </Button>
            <Button
              variant="secondary"
              className="bg-red-950 text-red-100 hover:bg-red-900"
              onClick={() => void clearAllHistory()}
              disabled={results.length === 0 || isDeleting}
            >
              Delete all history
            </Button>
          </div>
          <p className="text-xs text-zinc-400">
            {exportDirectory || 'No export folder selected.'}
          </p>
          {exportStatus && (
            <p className="text-xs text-zinc-300">{exportStatus}</p>
          )}
        </CardContent>
      </Card>

      {results.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-zinc-400">
            No data yet. Complete at least one test to see your history.
          </CardContent>
        </Card>
      ) : (
        results.map((result) => (
          <Card key={result.id}>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">
                {new Date(result.createdAt).toLocaleString('en-US')} -{' '}
                {result.scorePercent}%
              </CardTitle>
              <Button
                variant="secondary"
                className="bg-red-950 text-red-100 hover:bg-red-900"
                size="sm"
                onClick={() => void deleteAttempt(result.id)}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </CardHeader>
            <CardHeader>
              <CardDescription>
                Correct {result.correctCount}/{result.totalQuestions} |
                Incorrect {result.incorrectCount}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {result.wrongAnswers.length === 0 ? (
                <p className="text-emerald-300">
                  No incorrect answers in this attempt.
                </p>
              ) : (
                result.wrongAnswers.map((wrong) => (
                  <div
                    key={`${result.id}-${wrong.questionId}`}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                  >
                    <p className="font-medium text-zinc-100">
                      {wrong.question}
                    </p>
                    <p className="mt-1 text-zinc-400">
                      Your answer: {wrong.selectedOption}
                    </p>
                    <p className="text-zinc-300">
                      Correct answer: {wrong.correctOption}
                    </p>
                  </div>
                ))
              )}
              <Separator />
            </CardContent>
          </Card>
        ))
      )}
    </section>
  )
}
