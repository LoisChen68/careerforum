import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../Contexts/UserContext'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Selector from '../../UIComponents/Selector/Selector'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './UserSetting.module.scss'
import userAPI from '../../request/API/userAPI'
import { useNavigate } from 'react-router-dom'
import { useRender } from '../../Contexts/RenderContext'
import { toast } from 'react-toastify'

const formData = {
  avatar: '',
  role: '',
  name: '',
  password: '',
  confirmPassword: '',
}

const options = [
  { value: 'STUDENT', name: '學期三就讀中', disable: false },
  { value: 'GRADUATE', name: '畢業', disable: false },
]

export default function UserSetting() {
  const render = useRender()
  const getUser = useGetUser()
  const navigate = useNavigate()
  const [form, setForm] = useState(formData)
  const [errorMessage, setErrorMessage] = useState(formData)
  const [disable, setDisable] = useState(false)

  // 取得使用者資料以代入表單中
  useEffect(() => {
    userAPI
      .getCurrentUser()
      .then(res =>
        setForm({
          ...form,
          avatar: res.data.avatar,
          role: res.data.role,
          name: res.data.name
        }))
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
      if (!value) {
        setErrorMessage({ ...errorMessage, name: "欄位不得為空" })
      } else {
        setErrorMessage({ ...errorMessage, name: "" })
      }
    }
    if (name === 'password') {
      setForm({ ...form, password: value })
      if (!value) {
        setErrorMessage({ ...errorMessage, password: "欄位不得為空" })
      } else {
        setErrorMessage({ ...errorMessage, password: "" })
      }
      if (!value && !form.confirmPassword) {
        setErrorMessage({ ...errorMessage, password: "欄位不得為空", confirmPassword: "欄位不得為空" })
      }
      if (value && value !== form.confirmPassword) {
        setErrorMessage({ ...errorMessage, password: "密碼與確認密碼不符", confirmPassword: "密碼與確認密碼不符" })
      }
      if (value && value === form.confirmPassword) {
        setErrorMessage({ ...errorMessage, password: "", confirmPassword: "" })
      }
    }
    if (name === 'confirmPassword') {
      setForm({ ...form, confirmPassword: value })
      if (!value) {
        setErrorMessage({ ...errorMessage, confirmPassword: "欄位不得為空" })
      } else {
        setErrorMessage({ ...errorMessage, confirmPassword: "" })
      }
      if (!value && !form.password) {
        setErrorMessage({ ...errorMessage, password: "欄位不得為空", confirmPassword: "欄位不得為空" })
      }
      if (value && value !== form.password) {
        setErrorMessage({ ...errorMessage, password: "密碼與確認密碼不符", confirmPassword: "密碼與確認密碼不符" })
      }
      if (value && value === form.password) {
        setErrorMessage({ ...errorMessage, password: "", confirmPassword: "" })
      }
    }
  }

  // 送出表單
  function handleSubmit(e: React.FormEvent) {
    const userId = getUser?.user?.id
    e.preventDefault()
    setDisable(true)
    if (form.name &&
      form.password && form.confirmPassword &&
      form.password === form.confirmPassword) {
      const bodyFormData = new FormData(e.target as HTMLFormElement)
      userAPI
        .putUser(userId, bodyFormData)
        .then(() => {
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
          <UserAvatar
            userAvatar={form.avatar}
            avatarStyle={'body-user-avatar'}
          />
          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarFileChange} />
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
          <div className={style['user-email']}>
            <label>Email</label>
            <p>{getUser?.user?.email}</p>
          </div>
          <Input
            htmlFor="name"
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder=" "
            value={form.name}
            required={true}
            errorMessage={errorMessage.name}
            onChange={handleInputChange}
          />
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
