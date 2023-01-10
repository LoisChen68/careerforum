import { Link } from 'react-router-dom'
import Button from '../../UIComponents/Button/Button'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Header.module.scss'

interface headerProps {
  onLoginClick: (e: React.MouseEvent) => void
  onSignUpClick: (e: React.MouseEvent) => void
  onLogoutClick: (e: React.MouseEvent) => void
  authPass: boolean
}

export default function Header(props: headerProps) {
  return (
    <header className={style['header']}>
      <div className={style['header-wrapper']}>
        <div className={style['header-nav']}>
          <Link to="/">
            <h3 className={style['header-title']}>Career Forum</h3>
          </Link>
          <div className={style['nav-link']}>
            <Link to="/careerforum/home">
              <nav className={style['nav-item']}>問答版</nav>
            </Link>
          </div>
        </div>
        <div className={style['header-button']}>
          {!props.authPass && (
            <>
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
            </>
          )}
          {props.authPass && (
            <UserAvatar
              userAvatar={currentUser.avatar}
              avatarStyle={'header-user-avatar'}
            />
          )}
        </div>
      </div>
    </header>
  )
}

const currentUser = {
  id: '1', // user PK:id
  role: 'TA',
  name: '', // 可填可不填
  account: 'user1',
  email: 'user1@careerForum.com',
  avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
  cover: 'http://...',
  createdAt: '2023/01/07',
  updatedAt: '2023/01/07',
}
