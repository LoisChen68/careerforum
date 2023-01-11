import { useCookies } from "react-cookie"

export function useHistory() {
  const [cookies, setCookie] = useCookies(['history'])

  const addToHistory = (QuestionId: number, title: string, avatarUrl: string, content: string) => {
    let history = cookies.history ? cookies.history : [];
    // Remove the shop if already in the history
    history = history.filter((historyItem: { id: number }) => historyItem.id !== QuestionId);
    // Add the shop to the beginning of the history
    history.unshift({ id: QuestionId, title, avatarUrl, content });
    // Keep only the 10 most recent shops
    history = history.slice(0, 10);
    setCookie('history', history, { path: '/', sameSite: 'lax' });
  }

  const getHistory = () => {
    return cookies.history ? cookies.history : [];
  }

  return { addToHistory, getHistory }
}