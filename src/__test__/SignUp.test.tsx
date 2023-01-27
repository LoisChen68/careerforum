import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Pages/Layout/Layout'
import ModalContextProvider from '../Contexts/ModalContext'

test('Should display Role, Email, Account, Password, and Confirm Password when the signUp modal is mounted.', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)

  // 定義表單上的元素: Role, Email, Account, Password, Confirm Password, 註冊按鈕
  const roleSelectorElement = screen.getByText(/Role/i)
  const emailInputElement = screen.getByLabelText(/Email/i)
  const nameInputElement = screen.getByLabelText(/Name/i)
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/i)
  const signUpSubmitElement = screen.getAllByRole('button', { name: /註冊/i })

  // 預期註冊表單上應顯示元素有: Role, Email, Account, Password, Confirm Password, 註冊按鈕
  expect(roleSelectorElement).toBeInTheDocument()
  expect(emailInputElement).toBeInTheDocument()
  expect(nameInputElement).toBeInTheDocument()
  expect(passwordInputElement).toBeInTheDocument()
  expect(confirmPasswordElement).toBeInTheDocument()
  expect(signUpSubmitElement[1]).toBeInTheDocument()
})

test('Should display the "欄位不得為空" when the input field is empty and submit is pressed.', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)

  // 定義表單上的元素: Role, Email, Account, Password, Confirm Password
  const roleSelectorElement = screen.getByText(/Role/i)
  const emailInputElement = screen.getByLabelText(/Email/i)
  const nameInputElement = screen.getByLabelText(/Name/i)
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/i)
  // 定義 errorMessage 的字段
  const mountErrorMessage = screen.queryAllByText(/欄位不得為空/i)
  const passwordErrorMessage = screen.queryAllByText(/密碼與確認密碼不符/i)
  // 預期元件初始化不會有 "欄位不得為空" 的錯誤訊息
  expect(mountErrorMessage).toHaveLength(0)
  // 預期元件初始化不會有 "密碼與確認密碼不符" 的錯誤訊息
  expect(passwordErrorMessage).toHaveLength(0)

  // 模擬使用者尚未輸入表單
  fireEvent.change(roleSelectorElement, { target: { value: '' } })
  fireEvent.change(emailInputElement, { target: { value: '' } })
  fireEvent.change(nameInputElement, { target: { value: '' } })
  fireEvent.change(passwordInputElement, { target: { value: '' } })
  fireEvent.change(confirmPasswordElement, { target: { value: '' } })

  // 定義註冊表單上註冊按鈕及模擬使用者點擊送出
  const signUpSubmitElement = screen.getAllByRole('button', { name: /註冊/i })
  fireEvent.click(signUpSubmitElement[1])

  const errorMessage = screen.queryAllByText(/欄位不得為空/i)
  // 預期五欄位為空時應顯示五個 "欄位不得為空" 錯誤訊息
  expect(errorMessage).toHaveLength(5)
})

test('Should display the "密碼與確認密碼不相符" when the password does not match confirm password.', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)

  // 定義表單上的元素: Password, Confirm Password
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/i)

  // 模擬使用者輸入密碼與確認密碼不相符
  fireEvent.change(passwordInputElement, { target: { value: '123' } })
  fireEvent.change(confirmPasswordElement, { target: { value: '321' } })

  // 定義註冊表單上送出按鈕及模擬使用者點擊送出
  const signUpSubmitElement = screen.getAllByRole('button', { name: /註冊/i })
  fireEvent.click(signUpSubmitElement[1])

  // 定義 errorMessage 的字段
  const errorMessage = screen.queryAllByText(/密碼與確認密碼不符/i)
  // 預期密碼與確認密碼不相符時應顯示兩個 "密碼與確認密碼不符" 錯誤訊息
  expect(errorMessage).toHaveLength(2)
})

test('Should display the login modal when clicking the login link.', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)

  //定義 signUp 表單中登入的超連結文字
  const signUpModalLoginElement = screen.getByRole('link', { name: /登入/i })
  fireEvent.click(signUpModalLoginElement)

  //定義 Login 表單中登入的標題並且預期應顯示在頁面上
  const loginModalTitleElement = screen.getByRole('heading', { name: /登入/i })
  expect(loginModalTitleElement).toBeInTheDocument()
})

test('Should display "Loading..." and button is disabled when signUp submit.', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)

  // 定義表單上的元素: Role, Email, Account, Password, Confirm Password
  const roleSelectorElement = screen.getByText(/Role/i)
  const emailInputElement = screen.getByLabelText(/Email/i)
  const nameInputElement = screen.getByLabelText(/Name/i)
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/i)

  // 模擬使用者輸入表單
  fireEvent.change(roleSelectorElement, { target: { value: 'test' } })
  fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
  fireEvent.change(nameInputElement, { target: { value: 'test' } })
  fireEvent.change(passwordInputElement, { target: { value: '123' } })
  fireEvent.change(confirmPasswordElement, { target: { value: '123' } })

  // 定義註冊表單上註冊按鈕及模擬使用者點擊送出
  const signUpSubmitElement = screen.getAllByRole('button', { name: /註冊/i })
  fireEvent.click(signUpSubmitElement[1])

  // 定義 Loading 按鈕並且預期 Loading 按鈕應顯示在頁面上及按鈕為 disabled
  const loadingButton = screen.getByText(/Loading/i).closest('button')
  expect(loadingButton).toBeInTheDocument()
  expect(loadingButton).toBeDisabled()
})

test('Should not display the signUp modal when clicking the close button', () => {
  // 定義 Modal 容器元素
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  render(
    <BrowserRouter>
      <ModalContextProvider>
        <Layout />
      </ModalContextProvider>
    </BrowserRouter>,
    { container }
  )

  // 定義 Header 註冊按鈕元素及模擬使用者點擊打開註冊表單
  const headerSignUpButtonElement = screen.getByText(/註冊/i)
  fireEvent.click(headerSignUpButtonElement)
  const signUpModalTitleElement = screen.getByRole('heading', { name: /註冊/i })

  // 定義 close 按鈕元素及模擬使用者點擊關閉註冊表單
  const closeButtonElement = screen.getByRole('close')
  fireEvent.click(closeButtonElement)

  // 預期註冊表單中的註冊 title 不應該存在
  expect(signUpModalTitleElement).not.toBeInTheDocument()
})
