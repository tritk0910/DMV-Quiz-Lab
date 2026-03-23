import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, CircleAlert, RotateCcw } from 'lucide-react'
import { questionBank } from '@renderer/data/questionBank'
import {
  MIN_QUESTION_COUNT,
  clampQuestionCount,
  evaluateQuiz,
  pickRandomQuestions
} from '@renderer/lib/quiz'
import type { QuizResult } from '@renderer/types/quiz'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Badge } from '@renderer/components/ui/badge'
import { Separator } from '@renderer/components/ui/separator'

export default function QuizPage(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const maxQuestions = questionBank.length

  const safeCount = useMemo(() => {
    const fromQuery = Number(
      searchParams.get('count') ?? String(MIN_QUESTION_COUNT)
    )
    return clampQuestionCount(fromQuery, maxQuestions)
  }, [maxQuestions, searchParams])

  const [quizSeed, setQuizSeed] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<QuizResult | null>(null)

  const questions = useMemo(
    () => pickRandomQuestions(questionBank, safeCount, quizSeed),
    [quizSeed, safeCount]
  )

  const answeredCount = questions.reduce(
    (count, question) =>
      answers[question.id] === undefined ? count : count + 1,
    0
  )

  const startNewRandomTest = (): void => {
    setQuizSeed((previous) => previous + 1)
    setAnswers({})
    setResult(null)
  }

  const handleAnswer = (questionId: string, optionIndex: number): void => {
    if (result) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const submitQuiz = async (): Promise<void> => {
    if (questions.length === 0) return

    const score = evaluateQuiz(questions, answers)

    setResult({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...score
    })
    await window.api.saveTestResult({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...score
    })
  }

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Random practice test</CardTitle>
            <CardDescription>
              {safeCount} questions from a {maxQuestions}-question bank.
              Answered {answeredCount}/{safeCount}.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-zinc-800">Min: {MIN_QUESTION_COUNT}</Badge>
            <Badge className="bg-zinc-800">Max: {maxQuestions}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={submitQuiz} disabled={Boolean(result)}>
            Submit test
          </Button>
          <Button variant="secondary" onClick={startNewRandomTest}>
            New random test <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-zinc-700">
          <CardHeader>
            <CardTitle className="text-2xl">Test result</CardTitle>
            <CardDescription>
              Correct {result.correctCount}/{result.totalQuestions} -{' '}
              {result.scorePercent}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                <p className="text-xs text-zinc-400">Correct answers</p>
                <p className="mt-1 text-2xl font-bold text-zinc-100">
                  {result.correctCount}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                <p className="text-xs text-zinc-400">Incorrect answers</p>
                <p className="mt-1 text-2xl font-bold text-zinc-100">
                  {result.incorrectCount}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                <p className="text-xs text-zinc-400">Score</p>
                <p className="mt-1 text-2xl font-bold text-zinc-100">
                  {result.scorePercent}%
                </p>
              </div>
            </div>

            {result.wrongAnswers.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-zinc-100">
                  Incorrectly answered questions
                </h3>
                {result.wrongAnswers.map((wrong) => (
                  <div
                    key={wrong.questionId}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                  >
                    <p className="font-medium text-zinc-100">
                      {wrong.question}
                    </p>
                    <p className="mt-2 text-sm text-red-300">
                      Your answer: {wrong.selectedOption}
                    </p>
                    <p className="text-sm text-emerald-300">
                      Correct answer: {wrong.correctOption}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-800 bg-emerald-950/40 p-4 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                You answered every question correctly.
              </div>
            )}

            <Separator />
            <Link
              to="/history"
              className="text-sm text-zinc-300 underline underline-offset-4 hover:text-zinc-100"
            >
              View saved result history
            </Link>
          </CardContent>
        </Card>
      )}

      {questions.map((question, index) => (
        <Card key={question.id} className="animate-fade-up">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {index + 1}: {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const selected = answers[question.id] === optionIndex
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(question.id, optionIndex)}
                  className={`w-full rounded-xl border p-3 text-left transition-all ${
                    selected
                      ? 'border-zinc-200 bg-zinc-100 text-zinc-900'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-zinc-600'
                  }`}
                >
                  <span className="mr-3 inline-block rounded-full border px-2 py-0.5 text-xs">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  {option}
                </button>
              )
            })}
            {result && answers[question.id] !== question.correctIndex && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-700/40 bg-amber-950/30 p-3 text-sm text-amber-200">
                <CircleAlert className="mt-0.5 h-4 w-4" />
                <div>
                  <p>
                    Correct answer: {question.options[question.correctIndex]}
                  </p>
                  <p className="text-amber-300/80">{question.explanation}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={submitQuiz}
        disabled={Boolean(result)}
        className="fixed bottom-6 right-6 z-40 h-12 rounded-2xl px-5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
      >
        Submit test ({answeredCount}/{safeCount})
      </Button>
    </section>
  )
}
