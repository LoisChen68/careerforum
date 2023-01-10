import { UserAvatar } from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'

interface answerProps {
  userAvatar: string
  userAccount: string
  answerDate: string
  answer: string
}

export function Answer(props: answerProps) {
  return (
    <div className={style['answer-container']}>
      <UserAvatar userAvatar={props.userAvatar} />
      <div className={style['answer']}>
        <div className={style['user']}>
          <p>{props.userAccount}</p>
          <p>{props.answerDate}</p>
        </div>
        {props.answer}
      </div>
    </div>
  )
}
