import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRender } from '../../Contexts/RenderContext'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import { useHistory } from '../../utils/cookies'
import style from './Record.module.scss'

interface record {
  questionId: number
  avatarUrl: string
  userId: number
  title: string
  content: string
}

export default function Record() {
  const render = useRender()
  const [records, setRecords] = useState([])
  const { getHistory } = useHistory()

  useEffect(() => {
    setRecords(getHistory())
  }, [render?.isRender])

  return (
    <div className={style['record']}>
      <h3 className={style['record-title']}>最近瀏覽紀錄</h3>
      <div className={style['record-list']}>
        {records.map((record: record) => (
          <div className={style['list-item']} key={record.questionId}>
            <Link to={`/careerForum/users/${record.userId}`}>
              <UserAvatar
                avatarStyle={'body-user-avatar'}
                userAvatar={record.avatarUrl}
              />
            </Link>
            <div className={style['list-info']}>
              <Link to={`/careerForum/${record.questionId}`}>
                <p className={style['list-title']}>{record.title}</p>
              </Link>
              <p className={style['list-content']}>{record.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
