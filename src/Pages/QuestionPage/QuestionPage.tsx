import { useEffect, useState } from 'react'
import { useHistory } from '../../utils/cookies'
import Answer from '../../Components/Answer/Answer'
import Question from '../../Components/Question/Question'
import { TextAreaAnswer } from '../../UIComponents/TextArea/TextArea'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './QuestionPage.module.scss'
import questionAPI from '../../request/API/questionAPI'
import { useParams } from 'react-router'
import { useGetUser } from '../../Contexts/UserContext'

const questionData = {
  id: 0,
  title: '',
  content: '',
  createdAt: '',
  updatedAt: '',
  userId: 0,
  User: {
    id: 0,
    role: '',
    account: '',
    avatar: '',
  },
  answersCount: 0,
}

interface answer {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  userId: number
  User: user
}

interface user {
  id: number
  role: string
  account: string
  avatar: string
}

export default function QuestionPage() {
  const [question, setQuestion] = useState(questionData)
  const [answers, setAnswers] = useState([])
  // TODO:測試資料放進 cookie
  const { addToHistory } = useHistory()
  const param = useParams()
  const getUser = useGetUser()
  const token = localStorage.getItem('token') || ''

  // 取得單筆問題
  useEffect(() => {
    async function fetchQuestion() {
      await questionAPI
        .getQuestion(token, Number(param.id))
        .then((res) => setQuestion(res.data))
        .catch((err) => console.log(err))
    }
    fetchQuestion()
  }, [])

  // 取得問題底下的回答
  useEffect(() => {
    questionAPI
      .getAnswers(token, Number(param.id))
      .then((res) => setAnswers(res.data.answers))
      .catch((err) => console.log(err))
  }, [])

  function addHistory() {
    addToHistory(
      question.id,
      question.title,
      question.User.avatar,
      question.content
    )
  }

  return (
    <div className={style['discussion-thread']}>
      <div className={style['wrapper']}>
        <div className={style['container']}>
          <Question
            title={question.title}
            userAccount={question.User.account}
            userRole={question.User.role}
            userId={question.User.id}
            userAvatar={question.User.avatar}
            questionDate={question.createdAt}
            question={question.content}
            questionId={question.id}
            hashTags={[{ id: 1, name: '求職' }]}
            answerCount={question.answersCount}
            onQuestionClick={() => addHistory}
          />
          <div className={style['hr']} />
          {answers.map((answer: answer) => (
            <div className={style['answer-container']} key={answer.id}>
              <Answer
                userAvatar={answer.User.avatar}
                userRole={answer.User.role}
                userAccount={answer.User.account}
                answerDate={answer.createdAt}
                answer={answer.content}
              />
            </div>
          ))}
          <form className={style['answer-form']}>
            <div className={style['answer-hr']} />
            <UserAvatar
              userAvatar={getUser?.user?.avatar}
              avatarStyle={'body-user-avatar'}
            />
            <TextAreaAnswer
              placeholder={'輸入你的回答...'}
              scrollHeight={100}
              questionId={question.id}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
