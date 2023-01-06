import React from 'react'
import { act, render, screen } from '@testing-library/react'
import Header from '../Components/Header/Header'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Modal from '../UIComponents/Modal/Modal'
import Input from '../UIComponents/Input/Input'

test('Should be show "登入" and "註冊" button when authPass is false', () => {
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

test('Should be show "登出" button when authPass is true', () => {
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

  const logoutElement = screen.getByText(/登出/i)
  expect(logoutElement).toBeInTheDocument
})

test('Should not show "註冊" button when authPass is true', () => {
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

test('Should be show singUp Modal on press of Header signUp button', () => {
  const container = document.createElement('div')
  container.id = 'modal-root'
  document.body.appendChild(container)

  const handleClick = jest.fn()
  const handleChange = jest.fn()

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

  const { baseElement, getByText } = render(
    <Modal title={'註冊'} onConfirm={handleClick}>
      <Input
        htmlFor="email"
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder=" "
        value={'email'}
        required={true}
        errorMessage={''}
        onChange={handleChange}
      />
    </Modal>,
    { container }
  )

  act(() => {
    userEvent.click(getByText(/註冊/i))
  })

  expect(baseElement).toMatchSnapshot()
  expect(getByText(/註冊/i)).toBeInTheDocument()
})
