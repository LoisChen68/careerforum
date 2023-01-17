import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'

interface answerProps {
  userAvatar: string
  userAccount: string
  userRole: string
  answerDate: string
  answer: string
}

export default function Answer(props: answerProps) {
  return (
    <div className={style['answer-container']}>
      <UserAvatar
        userAvatar={props.userAvatar}
        avatarStyle={'body-user-avatar'}
      />
      <div className={style['answer']}>
        <div className={style['user']}>
          <p className={style['user-role']}>{props.userRole}</p>
          <p>{props.userAccount}</p>
          <p>{props.answerDate}</p>
        </div>
        {props.answer}
      </div>
    </div>
  )
}