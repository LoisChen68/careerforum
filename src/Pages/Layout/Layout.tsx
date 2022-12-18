import { useState } from 'react'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'

export default function Layout() {
  const [showLoginModel, setShowLoginModel] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  return (
    <div>
      <Header handleLoginModel={() => setShowLoginModel(true)} />
      {showLoginModel && (
        <Login
          onConfirm={() => setShowLoginModel(false)}
          onLoginSubmit={handleLoginSubmit}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </div>
  )
}
