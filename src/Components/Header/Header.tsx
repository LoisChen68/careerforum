import Button from '../../UIComponents/Button/Button'
import style from './Header.module.scss'

interface p {
  handleLoginModel: (e: React.MouseEvent) => void
}

export default function Header(props: p) {

  return (
    <header className={style['header']}>
      <div className={style['header-wrapper']}>
        <div className={style['header-logo']}>
          <h1 className={style['header-title']}>Career Forum</h1>
        </div>
        <div className={style['header-button']}>
          <Button
            type='button'
            innerText='登入'
            style='button-login'
            onClick={props.handleLoginModel}
          />
          <Button
            type='button'
            innerText='註冊'
            style='button-sign-up'
            onClick={props.handleLoginModel}
          />
        </div>
      </div>
    </header>
  )
}