import type {
  QuizQuestion,
  QuizResult,
  WrongAnswerDetail
} from '@renderer/types/quiz'

export const MIN_QUESTION_COUNT = 10

export function clampQuestionCount(rawCount: number, maxCount = 100): number {
  if (Number.isNaN(rawCount)) return MIN_QUESTION_COUNT
  return Math.max(MIN_QUESTION_COUNT, Math.min(maxCount, Math.floor(rawCount)))
}

export function pickRandomQuestions(
  questionBank: QuizQuestion[],
  count: number,
  seed?: number
): QuizQuestion[] {
  const random = createRandomGenerator(seed)
  const list = [...questionBank]
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list.slice(0, count)
}

function createRandomGenerator(seed?: number): () => number {
  if (seed === undefined) {
    return Math.random
  }

  let state = (seed >>> 0) + 0x6d2b79f5
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state)
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state)
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296
  }
}

export function evaluateQuiz(
  questions: QuizQuestion[],
  selectedAnswers: Record<string, number>
): Omit<QuizResult, 'id' | 'createdAt'> {
  const wrongAnswers: WrongAnswerDetail[] = []
  let correctCount = 0

  for (const question of questions) {
    const selectedIndex = selectedAnswers[question.id]
    if (selectedIndex === question.correctIndex) {
      correctCount += 1
    } else {
      wrongAnswers.push({
        questionId: question.id,
        question: question.questionText,
        selectedOption:
          selectedIndex === undefined
            ? 'Unanswered'
            : question.options[selectedIndex],
        correctOption: question.options[question.correctIndex]
      })
    }
  }

  const totalQuestions = questions.length
  const incorrectCount = totalQuestions - correctCount
  const scorePercent = Math.round((correctCount / totalQuestions) * 100)

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    scorePercent,
    wrongAnswers
  }
}
