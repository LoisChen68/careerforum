import { useEffect, useState } from 'react'
import Answer from '../../Components/Answer/Answer'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './QuestionPage.module.scss'
import questionAPI from '../../request/API/questionAPI'
import { useParams } from 'react-router'
import { QuestionModal } from '../../UIComponents/Modal/Modal'
import { useModalStatus } from '../../Contexts/ModalContext'
import Button from '../../UIComponents/Button/Button'
import { HiOutlineX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useRender } from '../../Contexts/RenderContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonLoader from '../../UIComponents/ButtonLoader/ButtonLoader'

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
  const setModalStatus = useModalStatus()
  const param = useParams()
  const render = useRender()
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState([])
  const [answerStatus, setAnswerStatus] = useState('')
  const [question, setQuestion] = useState(questionData)

  // 取得單筆問題
  useEffect(() => {
    async function fetchQuestion() {
      await questionAPI
        .getQuestion(Number(param.id))
        .then((res) => setQuestion(res.data))
        .catch((err) => console.log(err))
    }
    fetchQuestion()
  }, [])

  // 取得問題底下的回答
  useEffect(() => {
    const id = Number(param.id)
    questionAPI
      .getAnswers(id, 1, limit)
      .then((res) => {
        const answersData = res.data.answers
        setLoading(false)
        setAnswers(answersData)
        render?.handleRerender(false)
        // 當回傳資料長度為 0 ，設置狀態為 'noting' 為顯示 '目前還沒有人回答' 字段
        if (answersData.length === 0) {
          setAnswerStatus('noting')
        } else {
          setAnswerStatus('')
        }
      })
      .catch((err) => console.log(err))
  }, [render?.isRender])

  // lazy loading for answers
  const changePage = () => {
    const id = Number(param.id)
    questionAPI
      .getAnswers(id, page, limit)
      .then((res) => {
        const answersData = res.data.answers
        if (answersData.length === 0) setHasMore(false)
        setLoading(false)
        setAnswers(answers.concat(answersData))
        setPage((page) => page + 1)
        setLimit((limit) => limit + 5)
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <QuestionModal
        onConfirm={() => {
          setModalStatus?.handleSetModal('initial')
        }}
        closeButtonStyle={'button-close-ask'}
        questionId={question.id}
      >
        <InfiniteScroll
          dataLength={answers.length}
          next={changePage}
          hasMore={hasMore}
          loader={loading ? <ButtonLoader /> : ''}
          scrollableTarget="scrollbarDiv"
        >
          <div id="scrollbarDiv" className={`${style['discussion-thread']} ${style['scrollbar']}`}>
            <div className={style['wrapper']}>
              <div className={`${style['container']}`}>
                <section className={style['title-section']}>
                  <div className={style['user']}>
                    <Button
                      type="button"
                      style={'button-close-question'}
                      onClick={() => setModalStatus?.handleSetModal('initial')}
                      disabled={false}
                    >
                      <p className={style['icon']} role="close">
                        <HiOutlineX />
                      </p>
                    </Button>
                    <Link to={`/careerForum/users/${question.User.id}`}>
                      <UserAvatar
                        userAvatar={question.User.avatar}
                        avatarStyle={'body-user-avatar'}
                      />
                    </Link>
                    <div>
                      <div className={style['user-account']}>
                        <Link to={`/careerForum/users/${question.User.id}`}>
                          <p className={style['account']}>{question.User.account}</p>
                        </Link>
                        <p className={style['role']}>{question.User.role}</p>
                      </div>
                      <p>{question.createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                  <h3 className={style['title']}>{question.title}</h3>
                </section>
                <section className={style['content-container']}>
                  <p className={style['content']}>{question.content}</p>
                </section>
                {answerStatus === 'noting' && (
                  <p>目前還沒有人回答</p>
                )}
                {answers.map((answer: answer) => (
                  <div className={style['answer-container']} key={answer.id}>
                    <Answer
                      userId={answer.User.id}
                      userAvatar={answer.User.avatar}
                      userRole={answer.User.role}
                      userAccount={answer.User.account}
                      answerDate={answer.createdAt}
                      answer={answer.content}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </QuestionModal>
    </>
  )
}
