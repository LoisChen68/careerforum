import { useEffect, useState } from 'react'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import { useHistory } from '../../utils/cookies'
import style from './Record.module.scss'

export default function Record() {
  const [records, setRecords] = useState([])
  const { getHistory } = useHistory()

  useEffect(() => {
    setRecords(getHistory())
  }, [])

  return (
    <div className={style['record']}>
      <h3 className={style['record-title']}>最近瀏覽紀錄</h3>
      <div className={style['record-list']}>
        {records.map(
          (record: {
            id?: number
            avatarUrl?: string
            title?: string
            content?: string
          }) => (
            <div className={style['list-item']} key={record.id}>
              <UserAvatar avatarStyle={'body-user-avatar'} userAvatar={record.avatarUrl} />
              <div className={style['list-info']}>
                <p className={style['list-title']}>{record.title}</p>
                <p className={style['list-content']}>{record.content}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
