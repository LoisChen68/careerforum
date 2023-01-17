import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './Pages/Layout/Layout'
import AdminLayout from './Pages/Layout/AdminLayout'
import ForumHome from './Pages/ForumHome/ForumHome'
import QuestionPage from './Pages/QuestionPage/QuestionPage'
import AdminUser from './Pages/Admin/AdminUser'
import UserContextProvider from './Contexts/UserContext'
import RenderContextProvider from './Contexts/RenderContext'

export default function App() {
  return (
    <RenderContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/careerforum" element={<Layout />}>
            <Route path="home" element={<ForumHome />} />
            <Route path=":id" element={<QuestionPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUser />} />
            </Route>
          </Route>
          <Route path="/*" element={<Layout />}></Route>
        </Routes>
      </UserContextProvider>
    </RenderContextProvider>
  )
}
