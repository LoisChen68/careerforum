import { Link } from 'react-router-dom'
import { useGetUser } from '../../Contexts/UserContext'
import Button from '../../UIComponents/Button/Button'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Header.module.scss'

interface headerProps {
  onLoginClick: (e: React.MouseEvent) => void
  onSignUpClick: (e: React.MouseEvent) => void
  onLogoutClick: (e: React.MouseEvent) => void
  authPass: boolean
  avatar: string
}

export default function Header(props: headerProps) {
  const getUser = useGetUser()
  return (
    <header className={style['header']}>
      <div className={style['header-wrapper']}>
        <div className={style['header-nav']}>
          <Link to="/careerforum">
            <h3 className={style['header-title']}>Career Forum</h3>
          </Link>
          <div className={style['nav-link']}>
            {props.authPass && (
              <Link to="/careerforum/home">
                <nav>問答版</nav>
              </Link>
            )}
          </div>
        </div>
        <div className={style['header-button']}>
          {!props.authPass && (
            <>
              <Button
                type="button"
                style="button-login"
                onClick={props.onLoginClick}
                disabled={false}
              >
                <p>登入</p>
              </Button>
              <Button
                type="button"
                style="button-sign-up"
                onClick={props.onSignUpClick}
                disabled={false}
              >
                <p>註冊</p>
              </Button>
            </>
          )}
          {props.authPass && (
            <div className={style['avatar-container']}>
              <label htmlFor="avatar">
                <UserAvatar
                  userAvatar={props.avatar}
                  avatarStyle={'header-user-avatar'}
                />
              </label>
              <input
                id="avatar"
                type="checkbox"
                className={style['menu-toggle']}
              />
              <div className={style['avatar-menu']}>
                <ul className={style['avatar-list']}>
                  <li className={style['avatar-item']}>
                    <Link to={`/careerforum/users/${getUser?.user?.id}`}>個人資料</Link>
                  </li>
                  <li className={style['avatar-item']}>
                    <Link to={`/careerforum/users/setting/${getUser?.user?.id}`}>帳號設定</Link>
                  </li>
                  <li onClick={props.onLogoutClick}>
                    <Link to="/">登出</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
