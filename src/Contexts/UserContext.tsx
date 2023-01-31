import { createContext, useContext, useState } from 'react'
import userAPI from '../request/API/userAPI'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRender } from './RenderContext'

interface userDataProps {
  id: number
  role: string
  name: string
  email: string
  avatar: string
  cover: string
  permissionRole: string
  deletedAt: string
  approvalStatus: string
  isAdmin: boolean
  isSuspended: boolean
}

const userData = {
  id: 0,
  role: '',
  name: '',
  email: '',
  avatar: '',
  cover: '',
  permissionRole: '',
  deletedAt: '',
  approvalStatus: '',
  isAdmin: false,
  isSuspended: false,
}

interface UserContextData {
  user: userDataProps
  getUser: () => void
  authPass: boolean
  auth: (value: boolean) => void
}

const getUserContext = createContext<UserContextData | undefined>(undefined)

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const [user, setUser] = useState(userData)
  const [authPass, setAuthPass] = useState(false)
  const pathName = window.location.pathname
  const render = useRender()
  function getUser() {
    userAPI
      .getCurrentUser()
      .then((res) => {
        setUser(res.data.user), setAuthPass(true), render?.handleRerender(false)
      })
      .catch(() => {
        setAuthPass(false), navigate('/careerforum')
        // 使用正則表達式來判斷 careerforum 或 空字浮 則返回錯誤提示
        // `^` 代表字符串開頭 `$` 代表字符串結尾 `\/` 匹配字符
        // `(careerforum|)` 代表匹配字符 careerforum 或空字符
        if (!pathName.match(/^\/(careerforum|)$/)) {
          toast.error('請先登入再使用！', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        }
      })
  }

  function auth(value: boolean) {
    setAuthPass(value)
  }

  const UserContextData: UserContextData = {
    getUser,
    user: user,
    authPass: authPass,
    auth,
  }

  return (
    <getUserContext.Provider value={UserContextData}>
      {children}
    </getUserContext.Provider>
  )
}

export function useGetUser() {
  return useContext(getUserContext)
}
