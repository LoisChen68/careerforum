import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './Pages/Layout/Layout'
import AdminLayout from './Pages/Layout/AdminLayout'
import ForumHome from './Pages/ForumHome/ForumHome'
import AdminUser from './Pages/Admin/AdminUser'
import UserContextProvider from './Contexts/UserContext'
import ModalContextProvider from './Contexts/ModalContext'
import RenderContextProvider from './Contexts/RenderContext'
import ToggleMenuContextProvider from './Contexts/ToggleMenuCotext'
import UserProfile from './Pages/UserProfile/UserProfile'
import UserSetting from './Pages/UserSetting/UserSetting'
import Home from './Pages/Home/Home'

export default function App() {
  return (
    <RenderContextProvider>
      <ModalContextProvider>
        <UserContextProvider>
          <ToggleMenuContextProvider>
            <Routes>
              <Route path="/careerforum" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="home" element={<ForumHome />} />
                <Route path=":id" element={<ForumHome />} />
                <Route path="users/:id" element={<UserProfile />} />
                <Route path="users/setting" element={<UserSetting />} />
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="users" element={<AdminUser />} />
                </Route>
              </Route>
              <Route path="/*" element={<Layout />}></Route>
            </Routes>
          </ToggleMenuContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </RenderContextProvider>
  )
}
