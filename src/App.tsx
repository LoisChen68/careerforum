import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './Pages/Layout/Layout'
import ForumHome from './Pages/ForumHome/ForumHome'

export default function App() {
  return (
    <Routes>
      <Route path="/careerforum" element={<Layout />}>
        <Route path="home" element={<ForumHome />} />
      </Route>
      <Route path="/*" element={<Layout />}></Route>
    </Routes>
  )
}
