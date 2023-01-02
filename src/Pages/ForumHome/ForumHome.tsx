import style from './ForumHome.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { LayoutLoader } from '../../UIComponents/LayoutLoader/LayoutLoader'

export default function ForumHome() {
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token') || ''
  const navigate = useNavigate()

  //驗證是否攜帶 token，若無導回首頁
  useEffect(() => {
    setLoading(true)
    if (token === '') {
      navigate('/')
      setLoading(false)
    }
    setTimeout(() => {
      if (token) {
        setLoading(false)
      }
    }, 3000)
  }, [])

  return (
    <>
      {loading && (
        <>
          <Backdrop />
          <LayoutLoader />
        </>
      )}
      <div className={style['wrapper']}>
        <div className={style['container']}>
          <p>Forum Home Page</p>
          <p>Forum Home Page</p>
          <p>Forum Home Page</p>
          <p>Forum Home Page</p>
          <p>Forum Home Page</p>
        </div>
      </div>
    </>
  )
}
