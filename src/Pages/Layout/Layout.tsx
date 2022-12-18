import {useState} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'

export default function Layout() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSingUpModal, setShowSingUpModal] = useState(false)
  const [email, setEmail] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')



  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }
  function handleSingUpSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }

  function handleAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccount(e.target.value)
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }
  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }


  return (
    <div>
      <Header
        onLoginClick={() => setShowLoginModal(true)}
        onSignUpClick={() => setShowSingUpModal(true)}
      />
      {ReactDOM.createPortal(
        <>
          {showLoginModal && (
            <Login
              onConfirm={() => setShowLoginModal(false)}
              onLoginSubmit={handleLoginSubmit}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onSingUpClick={() => {
                setShowLoginModal(false)
                setShowSingUpModal(true)
              }}
            />
          )}
          {showSingUpModal && (
            <SignUp
              onConfirm={() => setShowSingUpModal(false)}
              onSingUpSubmit={handleSingUpSubmit}
              onEmailChange={handleEmailChange}
              onAccountChange={handleAccountChange}
              onPasswordChange={handlePasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
              onLoginClick={() => {
                setShowSingUpModal(false)
                setShowLoginModal(true)
              }}
            />
          )}
        </>
        , document.getElementById('modal-root') as Element
      )}
    </div>
  )
}