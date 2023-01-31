import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Modal from '../../UIComponents/Modal/Modal'
import Selector from '../../UIComponents/Selector/Selector'
import style from './SignUp.module.scss'

interface signUpProps {
  onConfirm: (e: React.MouseEvent) => void
  onSignUpSubmit: (e: React.MouseEvent) => void
  onLoginClick: (e: React.MouseEvent) => void
  onRoleChange: React.ChangeEventHandler<HTMLSelectElement>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: o
  email: string
  name: string
  password: string
  confirmPassword: string
  role: string
  disabled: boolean
}

interface o {
  role: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

export default function SignUp(props: signUpProps) {
  return (
    <Modal
      title="註冊"
      onConfirm={props.onConfirm}
      modalStyle="modal-container"
      closeButtonStyle={'button-close-auth'}
    >
      <>
        <Selector
          htmlFor="role"
          label="Role"
          id="role"
          name="role"
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
        <div className={style['name-input']}>
          <Input
            htmlFor="name"
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder=" "
            value={props.name}
            maxLength={20}
            required={true}
            errorMessage={props.errorMessage.name}
            onChange={props.onInputChange}
          />
          <span className={style['name-length-number']}>
            ({props.name.length}/20)
          </span>
        </div>
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
        <div className={style['btn-container']}>
          <Button
            type="submit"
            style="button-submit"
            onClick={props.onSignUpSubmit}
            disabled={props.disabled}
          >
            <p>註冊</p>
          </Button>
        </div>
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
