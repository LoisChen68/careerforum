import style from './Question.module.scss'

interface questionProps {
  userAccount: string
  userAvatar: string
  questionDate: string
  question: string
  hashTags: value[]
  answerCount: number
}

interface value {
  id: number
  name: string
}

export default function Question(props: questionProps) {
  const hashTag = props.hashTags.map((item: value) => (
    <p key={item.id}>
      {`#${item.name}`}
    </p>
  ))

  return (
    <div className={style['question-container']}>
      <h3 className={style['question-title']}>如何找到好工作？</h3>
      <div className={style['user']}>
        <div className={style['user-avatar']}>
          <img src={props.userAvatar} alt="使用者頭像" />
        </div>
        <div className={style['user-text']}>
          <p className={style['user-name']}>{props.userAccount}</p>
          <p className={style['user-post-date']}>{props.questionDate}</p>
        </div>
      </div>
      <div className={style['content']}>
        {props.question}
      </div>
      <div className={style['hash-tags']}>
        {hashTag}
      </div>
      <p className={style['answer-count']}>{`${props.answerCount} 則回答`}</p>
    </div>
  )
}
