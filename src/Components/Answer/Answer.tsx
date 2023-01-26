import { Link } from 'react-router-dom'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'
import { dayFormat } from '../../utils/dayFormat'

interface answerProps {
  userId: number
  userAvatar: string
  userName: string
  userRole: string
  answerDate: string
  answer: string
}

export default function Answer(props: answerProps) {

  return (
    <div className={style['answer-container']}>
      <Link to={`/careerForum/users/${props.userId}`}>
        <UserAvatar
          userAvatar={props.userAvatar}
          avatarStyle={'body-user-avatar'}
        />
      </Link>
      <div className={style['answer']}>
        <div className={style['user']}>
          <Link to={`/careerForum/users/${props.userId}`}>
            <p className={style['user-name']}>{props.userName}</p>
          </Link>
          {props.userRole === 'student' && (
            <p className={style['user-role']}>{'學期三'}</p>
          )}
          {props.userRole === 'graduate' && (
            <p className={style['user-role']}>{'畢業'}</p>
          )}
          {props.userRole === 'TA' && (
            <p className={style['user-role']}>{'助教'}</p>
          )}
          <div>
            <p className={style['user-post-date']}>{dayFormat(props.answerDate)
            }</p>
          </div>
        </div>
        <p className={style['content']}>{props.answer}</p>
      </div>
    </div>
  )
}
