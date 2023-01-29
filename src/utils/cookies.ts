import { useCookies } from 'react-cookie'
import { useRender } from '../Contexts/RenderContext'

interface historyData {
  questionId: number
  title: string
  userId: number
  avatarUrl: string
  content: string
}

export function useHistory() {
  const render = useRender()
  const [cookies, setCookie] = useCookies(['history'])

  function addToHistory({
    questionId,
    title,
    userId,
    avatarUrl,
    content,
  }: historyData) {
    let history = cookies.history ? cookies.history : []

    history = history.filter(
      (historyItem: historyData) => historyItem.questionId !== questionId
    )
    history.unshift({ questionId, title, userId, avatarUrl, content })
    history = history.slice(0, 10)
    setCookie('history', history, { path: '/', sameSite: 'lax' })
    render?.handleRerender(true)
  }

  function getHistory() {
    return cookies.history ? cookies.history : []
  }

  function removeHistory(questionId: number) {
    let history = cookies.history ? cookies.history : []
    history = history.filter((historyItem: historyData) => historyItem.questionId !== questionId)
    setCookie('history', history, { path: '/', sameSite: 'lax' })
    render?.handleRerender(true)
  }

  function modifyHistoryAvatar(userId: number, avatarUrl: string) {
    let history = cookies.history ? cookies.history : []
    history = history
      .map((historyItem: historyData) => {
        if (historyItem.userId === userId) {
          historyItem.avatarUrl = avatarUrl
        }
        return historyItem
      })
    setCookie('history', history, { path: '/', sameSite: 'lax' })
    render?.handleRerender(true)
  }


  function modifyHistoryQuestion(questionId: number, questionTitle: string, questionContent: string) {
    let history = cookies.history ? cookies.history : []
    history = history
      .map((historyItem: historyData) => {
        if (historyItem.questionId === questionId) {
          historyItem.title = questionTitle,
            historyItem.content = questionContent
        }
        return historyItem
      })
    setCookie('history', history, { path: '/', sameSite: 'lax' })
    render?.handleRerender(true)
  }


  return {
    addToHistory,
    getHistory,
    removeHistory,
    modifyHistoryAvatar,
    modifyHistoryQuestion
  }
}
