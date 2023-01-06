import style from './ForumHome.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { LayoutLoader } from '../../UIComponents/LayoutLoader/LayoutLoader'
import Question from '../../Components/Question/Question'

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
          {/* TODO:為了看得到畫面，暫時放在這 */}
          <Question userAccount={'gino'} userAvatar={''} questionDate={'2023/1/13'} question={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis est esse quisquam temporibus sunt facilis, repellat adipisci possimus illum quos consequatur repudiandae earum aliquam sed dolor provident excepturi repellendus molestiae.'} hashTags={[{ id: 1, name: '求職' }]} answerCount={1} />
        </div>
      </div>
    </>
  )
}