import { api } from '../index'

export default {
  getUsers(page: number, limit: number) {
    return api.get(`/admin/users?page=${page}&limit=${limit}`)
  },
}
