import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Layout from '../Pages/Layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import ModalContextProvider from '../Contexts/ModalContext'

test('Should display Email and Password when the Login modal is mounted.', () => {
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

  // 定義 Header 登入按鈕元素及模擬使用者點擊打開登入表單
  const headerLoginButtonElement = screen.getByText(/登入/i)
  fireEvent.click(headerLoginButtonElement)

  // 定義表單上的元素: Email, Password, 登入按鈕
  const emailInputElement = screen.getByLabelText(/Email/i)
  const passwordInputElement = screen.getByLabelText(/Password/i)
  const loginSubmitElement = screen.getAllByRole('button', { name: /登入/i })

  // 預期登入表單上應顯示元素有:  Email, Password, 登入按鈕
  expect(emailInputElement).toBeInTheDocument()
  expect(passwordInputElement).toBeInTheDocument()
  expect(loginSubmitElement[1]).toBeInTheDocument()
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

  // 定義 Header 登入按鈕元素及模擬使用者點擊打開登入表單
  const headerLogin = screen.getByText(/登入/i)
  fireEvent.click(headerLogin)

  // 定義表單上的元素: Email, Password, 登入按鈕
  const emailInputElement = screen.getByLabelText(/Email/i)
  const passwordInputElement = screen.getByLabelText(/Password/i)
  // 定義 errorMessage 的字段
  const mountErrorMessages = screen.queryAllByText(/欄位不得為空/i)
  // 預期元件初始化不會有 "欄位不得為空" 的錯誤訊息
  expect(mountErrorMessages).toHaveLength(0)

  // 模擬使用者尚未輸入表單
  fireEvent.change(emailInputElement, { target: { value: '' } })
  fireEvent.change(passwordInputElement, { target: { value: '' } })

  // 定義註冊表單上註冊按鈕及模擬使用者點擊送出
  const loginSubmitElement = screen.getAllByRole('button', { name: /登入/i })
  fireEvent.click(loginSubmitElement[1])

  const errorMessages = screen.queryAllByText(/欄位不得為空/i)
  // 預期兩欄位為空時應顯示兩個 "欄位不得為空" 錯誤訊息
  expect(errorMessages).toHaveLength(2)
})

test('Should display the signUp modal when clicking the Singup link.', () => {
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

  // 定義 Header 登入按鈕元素及模擬使用者點擊打開登入表單
  const headerSignUpButtonElement = screen.getByText(/登入/i)
  fireEvent.click(headerSignUpButtonElement)

  //定義 login 表單中登入的超連結文字
  const loginModalSignUpElement = screen.getByRole('link', { name: /註冊/i })
  fireEvent.click(loginModalSignUpElement)

  //定義 signUp 表單中登入的標題並且預期應顯示在頁面上
  const loginModalTitleElement = screen.getByRole('heading', { name: /註冊/i })
  expect(loginModalTitleElement).toBeInTheDocument()
})

test('Should display "Loading..." and button is disabled when login submit.', () => {
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

  // 定義 Header 登入按鈕元素及模擬使用者點擊打開登入表單
  const headerSignUpButtonElement = screen.getByText(/登入/i)
  fireEvent.click(headerSignUpButtonElement)

  // 定義表單上的元素: Email, Password, 登入按鈕
  const emailInputElement = screen.getByLabelText(/Email/i)
  const passwordInputElement = screen.getByLabelText(/Password/i)

  // 模擬使用者輸入表單
  fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
  fireEvent.change(passwordInputElement, { target: { value: '123' } })

  // 定義登入表單上登入按鈕及模擬使用者點擊送出
  const loginSubmitElement = screen.getAllByRole('button', { name: /登入/i })
  fireEvent.click(loginSubmitElement[1])

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

  // 定義 Header 登入按鈕元素及模擬使用者點擊打開登入表單
  const headerSignUpButtonElement = screen.getByText(/登入/i)
  fireEvent.click(headerSignUpButtonElement)
  const loginModalTilteElement = screen.getByRole('heading', { name: /登入/i })

  // 定義 close 按鈕元素及模擬使用者點擊關閉註冊表單
  const closeButtonElement = screen.getByRole('close')
  fireEvent.click(closeButtonElement)

  expect(loginModalTilteElement).not.toBeInTheDocument()
})
