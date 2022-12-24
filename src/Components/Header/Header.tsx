import { Link } from 'react-router-dom'
import Button from '../../UIComponents/Button/Button'
import style from './Header.module.scss'

interface p {
  onLoginClick: (e: React.MouseEvent) => void
  onSignUpClick: (e: React.MouseEvent) => void
}

export default function Header(props: p) {
  return (
    <header className={style['header']}>
      <div className={style['header-wrapper']}>
        <div className={style['header-logo']}>
          <Link to="/">
            <h3 className={style['header-title']}>Career Forum</h3>
          </Link>
        </div>
        <div className={style['header-button']}>
          <Button
            type="button"
            innerText="登入"
            style="button-login"
            onClick={props.onLoginClick}
            disabled={false}
          />
          <Button
            type="button"
            innerText="註冊"
            style="button-sign-up"
            onClick={props.onSignUpClick}
            disabled={false}
          />
        </div>
      </div>
    </header>
  )
}
