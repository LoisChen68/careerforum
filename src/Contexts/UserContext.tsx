import { createContext, useContext, useState } from 'react'
import userAPI from "../request/API/userAPI"
import { useNavigate } from 'react-router-dom'

interface userDataProps {
  id: number
  role: string
  name: string
  email: string
  account: string
  avatar: string
  cover: string
  deletedAt: string
  approvalStatus: string
  isAdmin: boolean
  isSuspended: boolean
}

const userData = {
  id: 0,
  role: "",
  name: "",
  email: "",
  account: "",
  avatar: "",
  cover: "",
  deletedAt: "",
  approvalStatus: "",
  isAdmin: false,
  isSuspended: false
}

interface UserContextData {
  user: userDataProps
  getUser: (token: string) => void
  authPass: boolean
  logout: (value: boolean) => void
}

const getUserContext = createContext<UserContextData | undefined>(undefined)

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(userData)
  const [authPass, setAuthPass] = useState(false)

  function getUser(token: string) {
    userAPI
      .getCurrentUser(token)
      .then(res => { setUser(res.data), setAuthPass(true) })
      .catch(err => { console.log(err), setAuthPass(false), navigate('/') })
  }

  function logout(value: boolean) {
    setAuthPass(value)
  }

  const UserContextData: UserContextData = {
    getUser,
    user: user,
    authPass: authPass,
    logout
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