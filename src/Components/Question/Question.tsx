import { Link } from 'react-router-dom'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Question.module.scss'

interface questionProps {
  userAccount: string
  userRole: string
  userId: number
  userAvatar: string
  questionDate: string
  question: string
  questionId: number
  hashTags: value[]
  answerCount: number
  title: string
  onQuestionClick: (e: React.MouseEvent) => void
}

interface value {
  id: number
  name: string
}

export default function Question(props: questionProps) {
  const hashTag = props.hashTags.map((item: value) => (
    <p key={item.id}>{`#${item.name}`}</p>
  ))

  return (
    <div className={style['question-container']}>
      <Link to={`/careerforum/${props.questionId}`}>
        <h3 className={style['question-title']} onClick={props.onQuestionClick}>
          {props.title}
        </h3>
      </Link>
      <div className={style['user']}>
        <Link to={`/careerforum/users/${props.userId}`}>
          <UserAvatar
            userAvatar={props.userAvatar}
            avatarStyle={'body-user-avatar'}
          />
        </Link>
        <div className={style['user-text']}>
          <div className={style['user-name-role']}>
            <Link to={`/careerforum/users/${props.userId}`}>
              <p className={style['user-name']}>{props.userAccount}</p>
            </Link>
            <p className={style['user-role']}>{props.userRole}</p>
          </div>
          <p className={style['user-post-date']}>{props.questionDate}</p>
        </div>
      </div>
      <div className={style['content']}>{props.question}</div>
      <div className={style['hash-tags']}>{hashTag}</div>
      <Link to={`/careerforum/${props.questionId}`}>
        <p className={style['answer-count']}>{`${props.answerCount} 則回答`}</p>
      </Link>
    </div>
  )
}
