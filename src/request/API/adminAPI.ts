import { api } from '../index'

export default {
  getUsers(page: number, limit: number) {
    return api.get(`/admin/users?page=${page}&limit=${limit}`)
  },
  patchUsers(userId: number, status: string) {
    return api.patch(`/admin/users/${userId}`, {
      approvalStatus: status,
    })
  },
}
