import { useCookies } from 'react-cookie'

export function useHistory() {
  const [cookies, setCookie] = useCookies(['history'])

  const addToHistory = (
    QuestionId: number,
    title: string,
    avatarUrl: string,
    content: string
  ) => {
    let history = cookies.history ? cookies.history : []
    history = history.filter(
      (historyItem: { id: number }) => historyItem.id !== QuestionId
    )
    history.unshift({ id: QuestionId, title, avatarUrl, content })
    history = history.slice(0, 10)
    setCookie('history', history, { path: '/', sameSite: 'lax' })
  }

  const getHistory = () => {
    return cookies.history ? cookies.history : []
  }

  return { addToHistory, getHistory }
}
