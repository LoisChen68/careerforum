import { Link } from 'react-router-dom'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'

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
          <p>{props.userName}</p>
          <p className={style['user-role']}>{props.userRole}</p>
          <div>
            <p>{props.answerDate.slice(0, 10)}</p>
          </div>
        </div>
        {props.answer}
      </div>
    </div>
  )
}
