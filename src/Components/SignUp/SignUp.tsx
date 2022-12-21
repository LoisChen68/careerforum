import Button from "../../UIComponents/Button/Button";
import Input from "../../UIComponents/Input/Input";
import Modal from "../../UIComponents/Modal/Modal";
import Selector from '../../UIComponents/Selector/Selector'

interface p {
  onConfirm: (e: React.MouseEvent) => void
  onSingUpSubmit: (e: React.MouseEvent) => void
  onLoginClick: (e: React.MouseEvent) => void
  onRoleChange: React.ChangeEventHandler<HTMLSelectElement>
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAccountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: o
  email: string
  account: string
  password: string
  confirmPassword: string
  value: string
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
    <Modal
      title="註冊"
      onConfirm={props.onConfirm}
    >
      <>
        <Button
          type="button"
          style="button-close"
          onClick={props.onConfirm}
          innerText="X"
        />
        <Selector
          htmlFor="role"
          label="Role"
          id="role"
          value={options}
          selectedValue={props.value}
          errorMessage={props.errorMessage.role}
          required={true}
          onChange={props.onRoleChange}
        />
        <Input
          htmlFor="email"
          label="Email"
          id="email"
          type="email"
          placeholder=" "
          value={props.email}
          required={true}
          errorMessage={props.errorMessage.email}
          onChange={props.onEmailChange}
        />
        <Input
          htmlFor="account"
          label="Account"
          id="account"
          type="text"
          placeholder=" "
          value={props.account}
          required={true}
          errorMessage={props.errorMessage.account}
          onChange={props.onAccountChange}
        />
        <Input
          htmlFor="password"
          label="Password"
          id="password"
          type="password"
          placeholder=" "
          value={props.password}
          required={true}
          errorMessage={props.errorMessage.password}
          onChange={props.onPasswordChange}
        />
        <Input
          htmlFor="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder=" "
          required={true}
          value={props.confirmPassword}
          errorMessage={props.errorMessage.confirmPassword}
          onChange={props.onConfirmPasswordChange}
        />
        <Button
          type="submit"
          style="button-submit"
          onClick={props.onSingUpSubmit}
          innerText="註冊"
        />
        <p>
          已有帳號? <a href="#" onClick={props.onLoginClick}>登入</a>
        </p>
      </>
    </Modal>
  )
}

const options = [
  {value: "", name: "Role", disable: true},
  {value: "TA", name: "助教", disable: false},
  {value: "student", name: "學期三就讀中", disable: false},
  {value: "graduate", name: "畢業", disable: false},
]