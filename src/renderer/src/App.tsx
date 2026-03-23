import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@renderer/components/layout'
import HomePage from '@renderer/pages/HomePage'
import QuizPage from '@renderer/pages/QuizPage'
import HistoryPage from '@renderer/pages/HistoryPage'

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
