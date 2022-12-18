import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import Modal from '../../UIComponents/Modal/Modal'

interface p {
  onConfirm: (e: React.MouseEvent) => void
  onLoginSubmit: (e: React.MouseEvent) => void
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Login(props: p) {
  return (
    <Modal title="登入" onConfirm={props.onConfirm}>
      <>
        <Button
          type="submit"
          style="button-close"
          onClick={props.onConfirm}
          innerText="X"
        />
        <Input
          htmlFor="email"
          label="Email"
          id="email"
          placeholder="enter email"
          onChange={props.onEmailChange}
        />
        <Input
          htmlFor="password"
          label="Password"
          id="password"
          placeholder="enter password"
          onChange={props.onPasswordChange}
        />
        <Button
          type="submit"
          style="button-login-submit"
          onClick={props.onLoginSubmit}
          innerText="登入"
        />
        <p>
          尚未有帳號? <a href="#">註冊</a>
        </p>
      </>
    </Modal>
  )
}
