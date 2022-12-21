import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import authAPI from '../../request/API/auth'


const data = {
  role: '',
  email: '',
  account: '',
  password: '',
  confirmPassword: ''
}


export default function Layout() {
  const [authModal, setAuthModal] = useState('initialization')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(data)
  const [valid, setValid] = useState(false)


  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }
  function handleSingUpSubmit(e: React.MouseEvent) {
    e.preventDefault()

    const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

    if (password !== confirmPassword) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符'
      }))
    }

    if (!role) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        role: '請選擇身分'
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        role: ''
      }))
    }

    if (!email.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: '欄位不得為空'
      }))
    }
    else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: ''
      }))
    }

    if (email && !emailRule.test(email)) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: 'Email格式不合法'
      }))
    }
    if (email && emailRule.test(email)) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: ''
      }))
    }

    if (!account.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        account: '欄位不得為空'
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        account: ''
      }))
    }

    if (!password.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '欄位不得為空'
      }))
    }

    if (!confirmPassword.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        confirmPassword: '欄位不得為空'
      }))
    }

    if (email && emailRule.test(email) && account && password && confirmPassword && password === confirmPassword) {
      setValid(true)
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
    if (valid === false) return
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRole(e.target.value)
    if (e.target.value.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        role: ''
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        role: '欄位不得為空'
      }))
    }
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (e.target.value.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: ''
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        email: '欄位不得為空'
      }))
    }
  }
  function handleAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccount(e.target.value)
    if (e.target.value.trim()) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        account: ''
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        account: '欄位不得為空'
      }))
    }
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
    if (e.target.value !== confirmPassword) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符'
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '',
        confirmPassword: ''
      }))
    }
  }
  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符'
      }))
    } else {
      setErrorMessage(prevMessage => ({
        ...prevMessage,
        password: '',
        confirmPassword: ''
      }))
    }
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
              onConfirm={() => {
                setAuthModal('initialization')
                setErrorMessage(data)
              }}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onLoginSubmit={handleLoginSubmit}
              onSingUpClick={() => {
                setAuthModal('singUp')
                setErrorMessage(data)
                setPassword('')
                setConfirmPassword('')
              }}
              email={email}
              password={password}
              errorMessage={errorMessage}
            />
          )}
          {authModal === 'singUp' && (
            <SignUp
              onConfirm={() => {
                setAuthModal('initialization')
                setErrorMessage(data)
              }}
              onRoleChange={handleRoleChange}
              onEmailChange={handleEmailChange}
              onAccountChange={handleAccountChange}
              onPasswordChange={handlePasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
              onSingUpSubmit={handleSingUpSubmit}
              onLoginClick={() => {
                setAuthModal('login')
                setErrorMessage(data)
                setPassword('')
                setConfirmPassword('')
              }}
              email={email}
              account={account}
              password={password}
              confirmPassword={confirmPassword}
              errorMessage={errorMessage}
              value={role}
            />
          )}
        </>
        , document.getElementById('modal-root') as Element
      )}
    </div>
  )
}


