import { api } from '../index'

export default {
  getQuestion(id: number | undefined) {
    return api.get(`/questions/${id}`)
  },
  getAnswers(id: number | undefined, page: number, limit: number) {
    return api.get(`/questions/${id}/answers?page=${page}&limit=${limit}`)
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
  putQuestion(id: number, title: string, content: string) {
    return api.put(`/questions/${id}`, { title, content })
  },
  deleteQuestion(id: number | undefined) {
    return api.delete(`/questions/${id}`)
  },
}
