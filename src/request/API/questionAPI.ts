import { api } from '../index'

export default {
  getQuestion(token: string, id: number | undefined) {
    return api.get(`/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  getAnswers(token: string, id: number | undefined) {
    return api.get(`/questions/${id}/answers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  postAnswers(token: string, id: number | undefined, content: string) {
    return api.post(`/questions/${id}/answers`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  },
  getQuestions(token: string, page: number, limit: number) {
    return api.get(`/questions?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}