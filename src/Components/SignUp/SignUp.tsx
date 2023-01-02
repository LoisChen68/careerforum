import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Modal from '../../UIComponents/Modal/Modal'
import Selector from '../../UIComponents/Selector/Selector'
import style from './SignUp.module.scss'

interface p {
  onConfirm: (e: React.MouseEvent) => void
  onSingUpSubmit: (e: React.MouseEvent) => void
  onLoginClick: (e: React.MouseEvent) => void
  onRoleChange: React.ChangeEventHandler<HTMLSelectElement>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: o
  email: string
  account: string
  password: string
  confirmPassword: string
  role: string
  disabled: boolean
}

interface o {
  role: string
  email: string
  account: string
  password: string
  confirmPassword: string
}

export default function SignUp(props: p) {
  return (
    <Modal title="註冊" onConfirm={props.onConfirm}>
      <>
        <Selector
          htmlFor="role"
          label="Role"
          id="role"
          value={options}
          selectedValue={props.role}
          errorMessage={props.errorMessage.role}
          required={true}
          onChange={props.onRoleChange}
        />
        <Input
          htmlFor="email"
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder=" "
          value={props.email}
          required={true}
          errorMessage={props.errorMessage.email}
          onChange={props.onInputChange}
        />
        <Input
          htmlFor="account"
          label="Account"
          id="account"
          name="account"
          type="text"
          placeholder=" "
          value={props.account}
          required={true}
          errorMessage={props.errorMessage.account}
          onChange={props.onInputChange}
        />
        <Input
          htmlFor="password"
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder=" "
          value={props.password}
          required={true}
          errorMessage={props.errorMessage.password}
          onChange={props.onInputChange}
        />
        <Input
          htmlFor="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder=" "
          required={true}
          value={props.confirmPassword}
          errorMessage={props.errorMessage.confirmPassword}
          onChange={props.onInputChange}
        />
        <Button
          type="submit"
          style="button-submit"
          onClick={props.onSingUpSubmit}
          innerText="註冊"
          disabled={props.disabled}
        />
        <p className={style['footer']}>
          已有帳號？
          <a href="#" onClick={props.onLoginClick}>
            登入
          </a>
        </p>
      </>
    </Modal>
  )
}

const options = [
  { value: '', name: 'Role', disable: true },
  { value: 'TA', name: '助教', disable: false },
  { value: 'student', name: '學期三就讀中', disable: false },
  { value: 'graduate', name: '畢業', disable: false },
]
