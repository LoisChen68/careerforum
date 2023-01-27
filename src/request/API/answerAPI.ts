import { api } from '../index'

export default {
  getAnswer(id: number | undefined) {
    return api.get(`/answers/${id}`)
  },
  putAnswers(id: number | undefined, content: string) {
    return api.put(`/answers/${id}`, { content })
  },
}