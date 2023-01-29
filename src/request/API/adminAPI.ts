import { api } from '../index'

export default {
  getUsers(page: number, limit: number) {
    return api.get(`/admins/users?page=${page}&limit=${limit}`)
  },
  patchUsers(userId: number, status: string) {
    return api.patch(`/admins/users/${userId}`, {
      approvalStatus: status,
    })
  },
}
