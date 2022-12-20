import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import authAPI from '../../request/API/auth'

export default function Layout() {
  const [authModal, setAuthModal] = useState('initialization')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }
  function handleSingUpSubmit(e: React.MouseEvent) {
    e.preventDefault()

    authAPI
      .signUp({
        role,
        email,
        account,
        password,
        confirmPassword
      })
      .then(res => {
        const {data} = res
        console.log(data)
        console.log(res.data)
      })
      .catch(err => console.log(err))


  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRole(e.target.value)
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handleAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccount(e.target.value)
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
        onLoginClick={() => setAuthModal('login')}
        onSignUpClick={() => setAuthModal('singUp')}
      />
      {ReactDOM.createPortal(
        <>
          {authModal === 'login' && (
            <Login
              onConfirm={() => setAuthModal('initialization')}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onLoginSubmit={handleLoginSubmit}
              onSingUpClick={() => {setAuthModal('singUp')}}
            />
          )}
          {authModal === 'singUp' && (
            <SignUp
              onConfirm={() => setAuthModal('initialization')}
              onRoleChange={handleRoleChange}
              onEmailChange={handleEmailChange}
              onAccountChange={handleAccountChange}
              onPasswordChange={handlePasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
              onSingUpSubmit={handleSingUpSubmit}
              onLoginClick={() => {setAuthModal('login')}}
            />
          )}
        </>
        , document.getElementById('modal-root') as Element
      )}
    </div>
  )
}