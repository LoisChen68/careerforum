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
          required={true}
          onChange={props.onRoleChange}
        />
        <Input
          htmlFor="email"
          label="Email"
          id="email"
          type="email"
          placeholder=" "
          required={true}
          onChange={props.onEmailChange}
        />
        <Input
          htmlFor="account"
          label="Account"
          id="account"
          type="text"
          placeholder=" "
          required={true}
          onChange={props.onAccountChange}
        />
        <Input
          htmlFor="password"
          label="Password"
          id="password"
          type="password"
          placeholder=" "
          required={true}
          onChange={props.onPasswordChange}
        />
        <Input
          htmlFor="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder=" "
          required={true}
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
  {value: "", name: "Role", disable: true, selected: true},
  {value: "TA", name: "助教", disable: false, selected: false},
  {value: "student", name: "學期三就讀中", disable: false, selected: false},
  {value: "graduate", name: "畢業", disable: false, selected: false},
]