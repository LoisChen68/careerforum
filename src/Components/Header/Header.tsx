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
          <h3 className={style['header-title']}>Career Forum</h3>
        </div>
        <div className={style['header-button']}>
          <Button
            type="button"
            innerText="登入"
            style="button-login"
            onClick={props.onLoginClick}
          />
          <Button
            type="button"
            innerText="註冊"
            style="button-sign-up"
            onClick={props.onSignUpClick}
          />
        </div>
      </div>
    </header>
  )
}
