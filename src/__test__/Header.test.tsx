import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../Components/Header/Header'
import { BrowserRouter } from 'react-router-dom'

test('Should display the "登入" and "註冊" buttons when authPass is false.', () => {
  const handleClick = jest.fn()

  render(
    <BrowserRouter>
      <Header
        onLoginClick={handleClick}
        onSignUpClick={handleClick}
        onLogoutClick={handleClick}
        authPass={false}
      />
    </BrowserRouter>
  )

  const loginElement = screen.getByText(/登入/i)
  const signUpElement = screen.getByText(/註冊/i)

  expect(loginElement).toBeInTheDocument
  expect(signUpElement).toBeInTheDocument
})

test('Should display the "登出" button when authPass is true.', () => {
  const handleClick = jest.fn()

  render(
    <BrowserRouter>
      <Header
        onLoginClick={handleClick}
        onSignUpClick={handleClick}
        onLogoutClick={handleClick}
        authPass={true}
      />
    </BrowserRouter>
  )
  const headerUserAvatar = screen.getByRole('img', {
    name: /使用者頭像/i
  })

  expect(headerUserAvatar).toBeInTheDocument
})

test('Should not display the "註冊" button when authPass is true.', () => {
  const handleClick = jest.fn()
  render(
    <BrowserRouter>
      <Header
        onLoginClick={handleClick}
        onSignUpClick={handleClick}
        onLogoutClick={handleClick}
        authPass={false}
      />
    </BrowserRouter>
  )

  const loginElement = screen.getByText(/登入/i)
  const signUpElement = screen.queryByText(/註冊/i)

  expect(loginElement).toBeInTheDocument
  expect(signUpElement).not.toBeInTheDocument
})
