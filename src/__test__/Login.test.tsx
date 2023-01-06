import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Login from '../Components/Login/Login'
import Layout from '../Pages/Layout/Layout'
import { BrowserRouter } from 'react-router-dom'

test('should be show "input" and "button" when login modal be mounted', () => {
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  const handleClick = jest.fn()
  const handleChange = jest.fn()

  render(
    <Login
      onConfirm={handleClick}
      onLoginSubmit={handleClick}
      onSingUpClick={handleClick}
      onInputChange={handleChange}
      errorMessage={{ email: '', password: '' }}
      email={''}
      password={''}
      disabled={false}
    />,
    { container }
  )

  const emailInputElement = screen.getByLabelText(/Email/i)
  const passwordInputElement = screen.getByLabelText(/Password/i)
  const loginElement = screen.getByText(/送出/i, { selector: 'p' }
  )
  const signUpElement = screen.getByText(/註冊/i)

  expect(emailInputElement).toBeInTheDocument()
  expect(passwordInputElement).toBeInTheDocument()
  expect(loginElement).toBeInTheDocument()
  expect(signUpElement).toBeInTheDocument()
})

test('after click "登入" should show error message "欄位不得為空" when input value is empty', () => {
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  const { getByText, getByRole, queryAllByText } = render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
    { container }
  )

  const headerLogin = getByText(/登入/i)
  fireEvent.click(headerLogin)
  const modalLogin = getByRole('button', {
    name: /送出/i
  })
  fireEvent.click(modalLogin)
  expect(modalLogin).toBeInTheDocument
  const errorMessages = queryAllByText(/欄位不得為空/i)
  expect(errorMessages).toHaveLength(2)
})

test('after click "登入" should not show error message "欄位不得為空" when input value is not empty', () => {
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  const { getByText, getByRole, queryAllByText, getByLabelText } = render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
    { container }
  )

  const headerLogin = getByText(/登入/i)
  fireEvent.click(headerLogin)
  screen.debug()
  // 預期元件初始化部會有 "欄位不得為空" 的錯誤訊息
  const mountErrorMessages = queryAllByText(/欄位不得為空/i)
  expect(mountErrorMessages).toHaveLength(0)

  // 模擬使用者輸入 Email & Password
  const emailInput = getByLabelText(/Email/i)
  const passwordInput = getByLabelText(/Password/i)
  fireEvent.change(emailInput, { target: { value: 'test' } })
  fireEvent.change(passwordInput, { target: { value: 'test' } })

  // 點擊送出表單後，不該有 "欄位不得為空" 錯誤訊息
  const modalLogin = getByRole('button', {
    name: /送出/i
  })
  fireEvent.click(modalLogin)
  expect(modalLogin).toBeInTheDocument
  const errorMessages = queryAllByText(/欄位不得為空/i)
  expect(errorMessages).toHaveLength(0)
})