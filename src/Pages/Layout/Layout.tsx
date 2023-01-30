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
import { useModalStatus } from '../../Contexts/ModalContext'
import { useRender } from '../../Contexts/RenderContext'
import { passwordStrength } from 'check-password-strength'

const formData = {
  role: '',
  email: '',
  name: '',
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
  const render = useRender()
  const getUser = useGetUser()
  const navigate = useNavigate()
  const setModalStatus = useModalStatus()
  const [signUpData, setSignUpData] = useState(formData)
  const [loginData, setLoginData] = useState(loginForm)
  const [errorMessage, setErrorMessage] = useState(formData)
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    getUser?.getUser()
  }, [render?.isRender])

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
          getUser?.auth(true)
          setModalStatus?.handleSetModal('initial')
          setLoginData({
            ...loginData,
            password: '',
          })

          navigate('/careerforum/home')
        })
        .then(() => {
          localStorage.setItem('email', loginData.email)
          getUser?.getUser()
        })
        .catch((err) => {
          setSubmit(false)
          const errStatus = err.response.status
          if (errStatus === 401) {
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
          if (errStatus === 403) {
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
          if (errStatus === 500) {
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
        })
    }
  }

  //送出註冊表單
  function handleSignUpSubmit(e: React.MouseEvent) {
    e.preventDefault()
    const pwdStrength = passwordStrength(signUpData.password).value
    const confirmPwdStrength = passwordStrength(
      signUpData.confirmPassword
    ).value
    setErrorMessage(isSignUpValid(errorMessage, signUpData, emailRule))

    if (
      signUpData.email &&
      signUpData.name &&
      signUpData.name.length <= 20 &&
      signUpData.password &&
      signUpData.confirmPassword &&
      pwdStrength !== 'Too weak' &&
      pwdStrength !== 'Weak' &&
      confirmPwdStrength !== 'Too weak' &&
      confirmPwdStrength !== 'Weak' &&
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
          setModalStatus?.handleSetModal('login')
          localStorage.setItem('email', signUpData.email)
          setLoginData({
            ...loginData,
            email: signUpData.email,
          })
          setSignUpData(formData)
        })
        .catch((err) => {
          setSubmit(false)
          const errStatus = err.response.data.status
          if (errStatus === '400FD') {
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
          if (err.response.status === 500) {
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
  function handleSignUpInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  // 按下 Header 或 SignUp 表單中的 登入
  function onLoginClick() {
    setModalStatus?.handleSetModal('login')
    setErrorMessage(formData)
    setSignUpData({
      ...signUpData,
      password: '',
      confirmPassword: '',
    })
    window.scrollTo(0, 0)
  }

  // 按下 Header 或 Login 表單中的 註冊
  function onSignUpClick() {
    setModalStatus?.handleSetModal('signUp')
    setErrorMessage(formData)
    setSignUpData({
      ...signUpData,
      password: '',
      confirmPassword: '',
    })
    window.scrollTo(0, 0)
  }

  // 按下登出
  function onLogoutClick() {
    localStorage.removeItem('token')
    getUser?.auth(false)
    navigate('/careerforum')
  }

  // 按下 Login 表單中關閉表單的地方
  function onLoginConfirm() {
    setModalStatus?.handleSetModal('initial')
    setErrorMessage(formData)
    setLoginData({
      ...loginData,
      password: '',
    })
  }

  // 按下 signUp 表單中關閉表單的地方
  function onSignUpConfirm() {
    setModalStatus?.handleSetModal('initial')
    setErrorMessage(formData)
    setSignUpData({
      ...signUpData,
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <div>
      <Header
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        onLogoutClick={onLogoutClick}
        avatar={getUser?.user?.avatar || ''}
        authPass={getUser?.authPass || false}
      />
      {setModalStatus?.modalStatus === 'login' && (
        <Login
          onConfirm={onLoginConfirm}
          onInputChange={handleLoginInputChange}
          onLoginSubmit={handleLoginSubmit}
          onSignUpClick={onSignUpClick}
          email={loginData.email}
          password={loginData.password}
          errorMessage={errorMessage}
          disabled={submit}
        />
      )}
      {setModalStatus?.modalStatus === 'signUp' && (
        <SignUp
          onConfirm={onSignUpConfirm}
          onRoleChange={handleRoleChange}
          onSignUpSubmit={handleSignUpSubmit}
          onInputChange={handleSignUpInputChange}
          onLoginClick={onLoginClick}
          role={signUpData.role}
          email={signUpData.email}
          name={signUpData.name}
          password={signUpData.password}
          confirmPassword={signUpData.confirmPassword}
          errorMessage={errorMessage}
          disabled={submit}
        />
      )}
      <ToastContainer />
      <Outlet />
      {getUser?.authPass && (
        <MobileFooter
          onLogoutClick={onLogoutClick}
          onAskClick={() => {
            navigate('/careerforum/home')
            setModalStatus?.handleSetModal('ask')
          }}
        />
      )}
    </div>
  )
}
