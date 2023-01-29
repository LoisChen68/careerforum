import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../Contexts/UserContext'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Selector from '../../UIComponents/Selector/Selector'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './UserSetting.module.scss'
import userAPI from '../../request/API/userAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useRender } from '../../Contexts/RenderContext'
import { toast } from 'react-toastify'
import { isConfirmPasswordValue, isNameValue, isPasswordValue } from '../../utils/valid'
import { passwordStrength } from 'check-password-strength'
import { useHistory } from '../../utils/cookies'

const formData = {
  avatar: '',
  role: '',
  name: '',
  password: '',
  confirmPassword: '',
}

const options = [
  { value: 'student', name: '學期三就讀中', disable: false },
  { value: 'graduate', name: '畢業', disable: false },
]

export default function UserSetting() {
  const render = useRender()
  const getUser = useGetUser()
  const navigate = useNavigate()
  const { modifyHistoryAvatar } = useHistory()
  const [form, setForm] = useState(formData)
  const [errorMessage, setErrorMessage] = useState(formData)
  const [disable, setDisable] = useState(false)

  // 取得使用者資料以代入表單中
  useEffect(() => {
    userAPI
      .getCurrentUser()
      .then(res => {
        const user = res.data.user
        setForm({
          ...form,
          avatar: user.avatar,
          role: user.role,
          name: user.name
        })
      })
      .catch(err => console.log(err))
  }, [])

  // 上傳大頭貼
  function handleAvatarFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (files && files.length > 0) {
      const imageURL = window.URL.createObjectURL(files[0])
      setForm({ ...form, avatar: imageURL })
    } else {
      setForm({ ...form, avatar: getUser?.user?.avatar || '' })
    }
  }

  // 選擇身分
  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, role: e.target.value })
  }

  // 輸入表單
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const value = e.target.value

    // TODO: 驗證表單資料
    if (name === 'name') {
      setForm({ ...form, name: value })
      setErrorMessage(isNameValue(errorMessage, value))
    }
    if (name === 'password') {
      setForm({ ...form, password: value })
      setErrorMessage(isPasswordValue(errorMessage, value, form.confirmPassword))
    }
    if (name === 'confirmPassword') {
      setForm({ ...form, confirmPassword: value })
      setErrorMessage(isConfirmPasswordValue(errorMessage, value, form.password))
    }
  }

  // 送出表單
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const userId = getUser?.user?.id
    const pwdStrength = passwordStrength(form.password).value
    const confirmPwdStrength = passwordStrength(form.confirmPassword).value
    setErrorMessage(isNameValue(errorMessage, form.name))
    setErrorMessage(isPasswordValue(errorMessage, form.password, form.confirmPassword))
    setErrorMessage(isConfirmPasswordValue(errorMessage, form.confirmPassword, form.password))


    if (
      form.name.length > 20 ||
      form.name.includes(' ') ||
      form.password.includes(' ') ||
      form.confirmPassword.includes(' ') ||
      pwdStrength === 'Too weak' ||
      pwdStrength === 'Weak' ||
      confirmPwdStrength === 'Too weak' ||
      confirmPwdStrength === 'Weak'
    ) return

    setDisable(true)
    if (form.name && form.name.length <= 20 &&
      form.password && form.confirmPassword &&
      form.password === form.confirmPassword) {
      const bodyFormData = new FormData(e.target as HTMLFormElement)
      userAPI
        .putUser(userId, bodyFormData)
        .then(res => {
          const user = res.data.user
          toast.success('成功修改個人資料', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setDisable(false)
          render?.handleRerender(true)
          modifyHistoryAvatar(user.id, user.avatar)
          navigate(`/careerforum/users/${userId}`)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className={`${style['wrapper']} ${style['scrollbar']}`}>
      <div className={style['container']}>
        <form
          className={style['form']}
          onSubmit={handleSubmit}>
          <Link to={`/careerForum/users/${getUser?.user?.id}`}>
            <p>返回個人資料</p>
          </Link>
          <UserAvatar
            userAvatar={form.avatar}
            avatarStyle={'body-user-avatar'}
          />
          <input
            id="avatar"
            type="file"
            name="avatar"
            accept=".jpg,.png"
            onChange={handleAvatarFileChange} />
          <div>
            <label htmlFor='role'>Role</label>
            {form.role === 'TA' && (
              <Selector
                htmlFor="role"
                label="Role"
                id="role"
                name="role"
                value={[{ value: 'TA', name: '助教', disable: false }]}
                selectedValue={'TA'}
                errorMessage={errorMessage.role}
                required={true}
                onChange={handleRoleChange}
              />
            )}
            {form.role !== 'TA' && (
              <Selector
                htmlFor="role"
                label="Role"
                id="role"
                name="role"
                value={options}
                selectedValue={form.role}
                errorMessage={errorMessage.role}
                required={true}
                onChange={handleRoleChange}
              />
            )}
          </div>
          <div className={style['user-email']}>
            <label>Email</label>
            <p>{getUser?.user?.email}</p>
          </div>
          <div>
            <Input
              htmlFor="name"
              label='Name'
              id="name"
              name="name"
              type="text"
              placeholder=" "
              value={form.name}
              maxLength={20}
              required={true}
              errorMessage={errorMessage.name}
              onChange={handleInputChange}
            />
            <span className={style['name-length-number']}>{form.name.length}/20</span>
          </div>
          <Input
            htmlFor="password"
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder=" "
            value={form.password}
            required={true}
            errorMessage={errorMessage.password}
            onChange={handleInputChange}
          />
          <Input
            htmlFor="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder=" "
            required={true}
            value={form.confirmPassword}
            errorMessage={errorMessage.confirmPassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            style="button-submit"
            onClick={(e) => { e }}
            disabled={disable}
          >
            <p>送出</p>
          </Button>
        </form>
      </div>
    </div>
  )
}
