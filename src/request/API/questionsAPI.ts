import { api } from '../index'

export default {
  getQuestions(page: number, limit: number) {
    return api.get(`/questions?page=${page}&limit=${limit}`)
  },
}
