import { FaPencilAlt, FaUserAlt, FaUserCog } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import style from './MobileFooter.module.scss'
import { NavLink } from 'react-router-dom'
import { useModalStatus } from '../../Contexts/ModalContext'
import { useGetUser } from '../../Contexts/UserContext'

interface mobileFooterProps {
  onLogoutClick: (e: React.MouseEvent) => void
  onAskClick: (e: React.MouseEvent) => void
}

export default function MobileFooter(props: mobileFooterProps) {
  const getUser = useGetUser()
  const modalStatus = useModalStatus()

  return (
    <footer className={style['footer']}>
      <div className={style['footer-container']}>
        <NavLink
          to="/careerforum/home"
          className={({ isActive }) =>
            isActive && modalStatus?.modalStatus === 'ask'
              ? style['activeStyle']
              : undefined
          }
        >
          <div className={style['item']} onClick={props.onAskClick}>
            <FaPencilAlt />
            <p>發問</p>
          </div>
        </NavLink>
        <NavLink
          to={`/careerforum/users/${getUser?.user?.id}`}
          className={({ isActive }) =>
            isActive ? style['activeStyle'] : undefined
          }
        >
          <div className={style['item']}>
            <FaUserAlt />
            <p>個人資料</p>
          </div>
        </NavLink>
        <NavLink
          to={'/careerforum/users/setting'}
          className={({ isActive }) =>
            isActive ? style['activeStyle'] : undefined
          }
        >
          <div className={style['item']}>
            <FaUserCog />
            <p>帳號設定</p>
          </div>
        </NavLink>
        <div className={style['item']} onClick={props.onLogoutClick}>
          <FiLogOut />
          <p>登出</p>
        </div>
      </div>
    </footer>
  )
}
