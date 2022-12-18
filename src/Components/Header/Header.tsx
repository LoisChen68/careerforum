import Button from '../../UIComponents/Button/Button'
import style from './Header.module.scss'

export default function Header() {
  return (
    <header>
      <div className={style['header-wrapper']}>
        <div className={style['header-logo']}>
          <h1 className={style['header-title']}>Career Forum</h1>
        </div>
        <div className={style['header-button']}>
          <Button
            innerText='登入'
            style='button-login'
          />
          <Button
            innerText='註冊'
            style='button-sign-up'
          />
        </div>
      </div>
    </header>
  )
}