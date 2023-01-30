import { api } from '../index'

export default {
  getAnswer(id: number | undefined) {
    return api.get(`/answers/${id}`)
  },
  putAnswer(id: number | undefined, content: string) {
    return api.put(`/answers/${id}`, { content })
  },
  deleteAnswer(id: number | undefined) {
    return api.delete(`/answers/${id}`)
  },
}
