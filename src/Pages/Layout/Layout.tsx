import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import authAPI from '../../request/API/auth'
import { isSignUpValid, isRoleValue, signUpValueValid } from '../../utils/valid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const formData = {
  role: '',
  email: '',
  account: '',
  password: '',
  confirmPassword: '',
}

const loginForm = {
  email: '',
  password: '',
}

export default function Layout() {
  const [authModal, setAuthModal] = useState('initialization')
  const [signUpData, setSignUpData] = useState(formData)
  const [loginData, setLoginData] = useState(loginForm)
  const [errorMessage, setErrorMessage] = useState(formData)
  const [submit, setSubmit] = useState(false)
  const localEmail = localStorage.getItem('email') || ''

  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()
  }
  function handleSingUpSubmit(e: React.MouseEvent) {
    e.preventDefault()

    const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

    setErrorMessage(isSignUpValid(errorMessage, signUpData, emailRule))

    if (
      signUpData &&
      emailRule.test(signUpData.email) &&
      signUpData.password === signUpData.confirmPassword
    ) {
      setSubmit(true)
      authAPI
        .signUp({
          ...signUpData,
        })
        .then(() => {
          setSubmit(false)
          toast.success('註冊成功', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setAuthModal('login')
          localStorage.setItem('email', signUpData.email)
          setSignUpData(formData)
        })
        .catch((err) => {
          if (err.response.data.field_errors.email === 'used') {
            toast.error('信箱已被註冊', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
            setSubmit(false)
          }
          if (
            err.response.status !== 200 &&
            err.response.data.field_errors.email !== 'used'
          ) {
            toast.error('請重新再試', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }),
              setSubmit(false)
          }
        })
    }
  }

  // 選擇身分
  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSignUpData({
      ...signUpData,
      role: e.target.value,
    })
    setErrorMessage(isRoleValue(errorMessage, e.target.value))
  }

  // 輸入註冊表單
  function handleSingUpInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'password') {
      setSignUpData({
        ...signUpData,
        password: e.target.value,
      })
    }
    if (e.target.name === 'confirmPassword') {
      setSignUpData({
        ...signUpData,
        confirmPassword: e.target.value,
      })
    }
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    })
    setErrorMessage(
      signUpValueValid(
        errorMessage,
        e.target.name,
        e.target.value,
        signUpData.password,
        signUpData.confirmPassword
      )
    )
  }

  // 輸入登入表單
  function handleLoginInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <Header
        onLoginClick={() => setAuthModal('login')}
        onSignUpClick={() => setAuthModal('singUp')}
      />
      {authModal === 'login' && (
        <Login
          onConfirm={() => {
            setAuthModal('initialization')
            setErrorMessage(formData)
            setSignUpData({
              ...signUpData,
              password: '',
            })
          }}
          onInputChange={handleLoginInputChange}
          onLoginSubmit={handleLoginSubmit}
          onSingUpClick={() => {
            setAuthModal('singUp')
            setErrorMessage(formData)
            setSignUpData({
              ...signUpData,
              password: '',
              confirmPassword: '',
            })
          }}
          email={localEmail}
          password={loginData.password}
          errorMessage={errorMessage}
          disabled={submit}
        />
      )}
      {authModal === 'singUp' && (
        <SignUp
          onConfirm={() => {
            setAuthModal('initialization')
            setErrorMessage(formData)
            setSignUpData({
              ...signUpData,
              password: '',
              confirmPassword: '',
            })
          }}
          onRoleChange={handleRoleChange}
          onSingUpSubmit={handleSingUpSubmit}
          onInputChange={handleSingUpInputChange}
          onLoginClick={() => {
            setAuthModal('login')
            setErrorMessage(formData)
            setSignUpData({
              ...signUpData,
              password: '',
              confirmPassword: '',
            })
          }}
          role={signUpData.role}
          email={signUpData.email}
          account={signUpData.account}
          password={signUpData.password}
          confirmPassword={signUpData.confirmPassword}
          errorMessage={errorMessage}
          disabled={submit}
        />
      )}
      <ToastContainer />
    </div>
  )
}
