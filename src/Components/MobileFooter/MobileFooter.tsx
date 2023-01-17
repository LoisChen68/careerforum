import { FaPencilAlt, FaUserAlt, FaUserCog } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import style from './MobileFooter.module.scss'
import { Link } from 'react-router-dom'

interface mobileFooterProps {
  onLogoutClick: (e: React.MouseEvent) => void
}

export default function MobileFooter(props: mobileFooterProps) {
  return (
    <footer className={style['footer']}>
      <div className={style['footer-container']}>
        <div className={style['item']}>
          <FaPencilAlt />
          <p>發問</p>
        </div>
        <Link to={`/careerforum/users/${1}`}>
          <div className={style['item']}>
            <FaUserAlt />
            <p>個人資料</p>
          </div>
        </Link>
        <Link to={`/careerforum/users/setting/${1}`}>
          <div className={style['item']}>
            <FaUserCog />
            <p>帳號設定</p>
          </div>
        </Link>
        <div className={style['item']} onClick={props.onLogoutClick}>
          <FiLogOut />
          <p>登出</p>
        </div>
      </div>
    </footer>
  )
}
