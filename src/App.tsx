import {Route, Routes} from 'react-router-dom'
import './App.scss'
import Layout from './Pages/Layout/Layout'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      </Route>
    </Routes>
  )
}
