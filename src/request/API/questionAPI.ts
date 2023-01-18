import { api } from '../index'

export default {
  getQuestion(id: number | undefined) {
    return api.get(`/questions/${id}`)
  },
  getAnswers(id: number | undefined) {
    return api.get(`/questions/${id}/answers`)
  },
  postAnswers(id: number | undefined, content: string) {
    return api.post(`/questions/${id}/answers`, { content })
  },
  getQuestions(page: number, limit: number) {
    return api.get(`/questions?page=${page}&limit=${limit}`)
  },
  postQuestion(title: string, content: string) {
    return api.post('/questions', { title, content })
  },
}
