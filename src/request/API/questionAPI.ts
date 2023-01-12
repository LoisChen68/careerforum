import { api } from '../index'

export default {
  getQuestion(id: number | undefined) {
    return api.get(`/questions/${id}`)
  },
  getAnswers(id: number | undefined) {
    return api.get(`/questions/${id}/answers`)
  }
}