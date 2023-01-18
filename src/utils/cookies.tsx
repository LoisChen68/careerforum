import { useCookies } from 'react-cookie'

interface historyData {
  questionId: number,
  title: string,
  userId: number,
  avatarUrl: string,
  content: string
}

export function useHistory() {
  const [cookies, setCookie] = useCookies(['history'])

  function addToHistory({ questionId, title, userId, avatarUrl, content }: historyData) {
    let history = cookies.history ? cookies.history : []
    history = history.filter(
      (historyItem: historyData) => historyItem.questionId !== questionId
    )
    history.unshift({ questionId, title, userId, avatarUrl, content })
    history = history.slice(0, 10)
    setCookie('history', history, { path: '/', sameSite: 'lax' })
  }

  function getHistory() {
    return cookies.history ? cookies.history : []
  }

  return { addToHistory, getHistory }
}
