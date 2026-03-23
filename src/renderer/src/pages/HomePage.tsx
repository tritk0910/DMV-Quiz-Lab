import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { baseQuestions } from '@renderer/data/questionBank'
import { MIN_QUESTION_COUNT, clampQuestionCount } from '@renderer/lib/quiz'
import type { QuizResult } from '@renderer/types/quiz'
import { ArrowRight, History, Shuffle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage(): React.JSX.Element {
  const maxQuestions = baseQuestions.length
  const [questionCount, setQuestionCount] = useState<number>(MIN_QUESTION_COUNT)
  const [history, setHistory] = useState<QuizResult[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    void window.api.getTestResults().then(setHistory)
  }, [])

  const latestResult = history[0]

  const startQuiz = (): void => {
    const safeCount = clampQuestionCount(questionCount, maxQuestions)
    navigate(`/quiz?count=${safeCount}`)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
      <Card className="animate-fade-up">
        <CardHeader>
          <Badge className="w-fit">US Driver License Practice</Badge>
          <CardTitle className="text-3xl sm:text-4xl">
            Quick tests, instant scoring, and local history
          </CardTitle>
          <CardDescription className="max-w-xl text-zinc-400">
            The system uses {maxQuestions} questions to generate random quizzes.
            You can choose the number of questions, complete multiple-choice
            tests, and review previous attempts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-sm space-y-3">
            <label
              htmlFor="questionCount"
              className="block text-sm font-medium text-zinc-300"
            >
              Number of questions (minimum {MIN_QUESTION_COUNT})
            </label>
            <Input
              id="questionCount"
              type="number"
              min={MIN_QUESTION_COUNT}
              max={maxQuestions}
              value={questionCount}
              onChange={(event) => setQuestionCount(Number(event.target.value))}
            />
            <p className="text-xs text-zinc-500">
              Each test is randomized from the {maxQuestions}-question bank.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={startQuiz} size="lg">
              Start test <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/history')}
            >
              View history <History className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-up-delayed">
        <CardHeader>
          <CardTitle className="text-xl">Quick stats</CardTitle>
          <CardDescription>
            Summary of results saved in local JSON storage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-300">
          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <span>Total attempts</span>
            <strong className="text-zinc-50">{history.length}</strong>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <span>Best score</span>
            <strong className="text-zinc-50">
              {history.length > 0
                ? `${Math.max(...history.map((item) => item.scorePercent))}%`
                : 'No data yet'}
            </strong>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="mb-2 flex items-center gap-2 text-zinc-200">
              <Shuffle className="h-4 w-4" /> Most recent result
            </p>
            <p className="text-zinc-400">
              {latestResult
                ? `${latestResult.correctCount}/${latestResult.totalQuestions} correct - ${latestResult.scorePercent}%`
                : 'You have no attempts yet. Click Start test to create your first quiz.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
