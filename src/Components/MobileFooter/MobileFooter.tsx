import { FaPencilAlt, FaUserAlt, FaUserCog } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import style from './MobileFooter.module.scss'

export default function MobileFooter() {
  return (
    <footer className={style['footer']}>
      <div className={style['footer-container']}>
        <div className={style['item']}>
          <FaPencilAlt />
          <p>發問</p>
        </div>
        <div className={style['item']}>
          <FaUserAlt />
          <p>個人資料</p>
        </div>
        <div className={style['item']}>
          <FaUserCog />
          <p>帳號設定</p>
        </div>
        <div className={style['item']}>
          <FiLogOut />
          <p>登出</p>
        </div>
      </div>
    </footer>
  )
}
