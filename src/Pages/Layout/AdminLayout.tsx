import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiChevronsRight, FiChevronsLeft } from 'react-icons/fi'
import style from './AdminLayout.module.scss'
import { useGetUser } from '../../Contexts/UserContext'

export default function AdminLayout() {
  const getUser = useGetUser()
  const navigate = useNavigate()
  const [menuIsShow, setMenuIsShow] = useState('hidden')

  useEffect(() => {
    if (getUser?.user.permissionRole !== 'admin') {
      navigate('/careerforum/home')
    }
  }, [getUser?.user.permissionRole])


  const handleToggleMenu = () => {
    if (menuIsShow === 'hidden') {
      setMenuIsShow('show')
    } else {
      setMenuIsShow('hidden')
    }
  }

  return (
    <>
      {getUser?.user.permissionRole === 'admin' && (
        <>
          <input
            type="checkbox"
            id="toggleMenu"
            className={style['toggle-menu-checkbox']}
            checked={menuIsShow === 'show' ? true : false}
          />
          <div className={style['menu']}>
            {menuIsShow === 'show' ? (
              <div onClick={handleToggleMenu} className={style['left-icon']}>
                <FiChevronsLeft />
              </div>
            ) : (
              <div onClick={handleToggleMenu} className={style['right-icon']}>
                <FiChevronsRight />
              </div>
            )}
            {menuIsShow === 'show' && (
              <ul className={style['menu-lists']}>
                <li>使用者列表</li>
                <li>問題列表</li>
              </ul>
            )}
          </div>
          <section className={style['main-section']}>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}
