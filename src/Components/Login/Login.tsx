import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Modal from '../../UIComponents/Modal/Modal'
import style from './Login.module.scss'

interface loginProps {
  onConfirm: (e: React.MouseEvent) => void
  onLoginSubmit: (e: React.MouseEvent) => void
  onSingUpClick: (e: React.MouseEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: o
  email: string
  password: string
  disabled: boolean
}

interface o {
  email: string
  password: string
}

export default function Login(props: loginProps) {
  return (
    <>
      <Modal
        title="登入"
        onConfirm={props.onConfirm}
        modalStyle="modal-container"
        closeButtonStyle={'button-close-auth'}
      >
        <>
          <Input
            htmlFor="email"
            label="Email"
            id="email"
            name="email"
            type="email"
            required={true}
            placeholder=" "
            value={props.email}
            errorMessage={props.errorMessage.email}
            onChange={props.onInputChange}
          />
          <Input
            htmlFor="password"
            label="Password"
            id="password"
            name="password"
            type="password"
            required={true}
            placeholder=" "
            value={props.password}
            errorMessage={props.errorMessage.password}
            onChange={props.onInputChange}
          />
          <div className={style['btn-container']}>
            <Button
              type="submit"
              style="button-submit"
              onClick={props.onLoginSubmit}
              disabled={props.disabled}
            >
              <p>登入</p>
            </Button>
          </div>
          <p className={style['footer']}>
            尚未有帳號？
            <a href="#" onClick={props.onSingUpClick}>
              註冊
            </a>
          </p>
        </>
      </Modal>
    </>
  )
}
