import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import authAPI from '../../request/API/authAPI'
import MobileFooter from '../../Components/MobileFooter/MobileFooter'
import {
  isSignUpValid,
  isRoleValue,
  signUpValueValid,
  isLoginValid,
  loginValueValid,
} from '../../utils/valid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetUser } from '../../Contexts/UserContext'

const formData = {
  role: '',
  email: '',
  account: '',
  password: '',
  confirmPassword: '',
}

const localEmail = localStorage.getItem('email') || ''
const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

const loginForm = {
  email: localEmail,
  password: '',
}


export default function Layout() {
  const token = localStorage.getItem('token') || ''
  const [authModal, setAuthModal] = useState('initialAuthModal')
  const [signUpData, setSignUpData] = useState(formData)
  const [loginData, setLoginData] = useState(loginForm)
  const [errorMessage, setErrorMessage] = useState(formData)
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const getUser = useGetUser()

  useEffect(() => {
    getUser?.getUser(token)
  }, [])

  //送出登入表單
  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault()

    setErrorMessage(isLoginValid(errorMessage, loginData, emailRule))

    if (
      loginData.email &&
      loginData.password &&
      emailRule.test(loginData.email)
    ) {
      setSubmit(true)
      authAPI
        .login({
          ...loginData,
        })
        .then((res) => {
          const token = res.data.token || ''
          localStorage.setItem('token', token)
          setSubmit(false)
          toast.success('登入成功', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          getUser?.logout(true)
          setAuthModal('initialAuthModal')
          setLoginData({
            ...loginData,
            password: '',
          })

          navigate('/careerforum/home')
        })
        .then(() => {
          const token = localStorage.getItem('token') || ''
          getUser?.getUser(token)
        })
        .catch((err) => {
          if (err.response.data.title === 'Incorrect email or password') {
            toast.error('Email或密碼錯誤', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
          if (err.response.data.title === 'Unapproved user') {
            toast.error('尚未通過審核', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
          if (
            err.response.status !== 200 &&
            err.response.data.title !== 'Incorrect email or password' &&
            err.response.data.title !== 'Unapproved user'
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
            })
          }
          setSubmit(false)
        })
    }
  }

  //送出註冊表單
  function handleSingUpSubmit(e: React.MouseEvent) {
    e.preventDefault()

    setErrorMessage(isSignUpValid(errorMessage, signUpData, emailRule))

    if (
      signUpData.email &&
      signUpData.account &&
      signUpData.password &&
      signUpData.confirmPassword &&
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
          setLoginData({
            ...loginData,
            email: signUpData.email,
          })
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
            })
          }
          setSubmit(false)
        })
    }
  }

  // 輸入登入表單
  function handleLoginInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage(
      loginValueValid(errorMessage, e.target.name, e.target.value)
    )
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
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

  return (
    <div>
      <Header
        onLoginClick={() => setAuthModal('login')}
        onSignUpClick={() => setAuthModal('singUp')}
        onLogoutClick={() => {
          localStorage.removeItem('token')
          getUser?.logout(false)
          navigate('/')
        }}
        avatar={getUser?.user?.avatar || ''}
        authPass={getUser?.authPass || false}
      />
      {authModal === 'login' && (
        <Login
          onConfirm={() => {
            setAuthModal('initialAuthModal')
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
          email={loginData.email}
          password={loginData.password}
          errorMessage={errorMessage}
          disabled={submit}
        />
      )}
      {authModal === 'singUp' && (
        <SignUp
          onConfirm={() => {
            setAuthModal('initialAuthModal')
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
      <Outlet />
      {getUser?.authPass &&
        <MobileFooter
          onLogoutClick={() => {
            localStorage.removeItem('token')
            getUser?.logout(false)
            navigate('/')
          }}
        />}
    </div>
  )
}