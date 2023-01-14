import style from './ForumHome.module.scss'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { LayoutLoader } from '../../UIComponents/LayoutLoader/LayoutLoader'
import Question from '../../Components/Question/Question'
import Answer from '../../Components/Answer/Answer'
import {
  TextAreaAnswer,
  TextAreaAsk,
} from '../../UIComponents/TextArea/TextArea'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import Modal from '../../UIComponents/Modal/Modal'
import Record from '../../Components/Record/Record'
import questionsAPI from '../../request/API/questionAPI'
import { useGetUser } from '../../Contexts/UserContext'
import { useHistory } from '../../utils/cookies'
import ButtonLoader from '../../UIComponents/ButtonLoader/ButtonLoader'
import { useRender } from '../../Contexts/RenderContext'

export default function ForumHome() {
  const [authModal, setAuthModal] = useState('initialAuthModal')
  const [loading, setLoading] = useState(true)
  const getUser = useGetUser()

  // 這裡的 loading 是具有 Backdrop 的 LayoutLoader
  // 頁面渲染完成將 loading 設為 false
  useEffect(() => {
    setLoading(false)
  }, [])

  const onAskShow = () => {
    setAuthModal('ask')
  }

  const onAskClose = () => {
    setAuthModal('initialAuthModal')
  }

  return (
    <>
      {loading && (
        <>
          <Backdrop />
          <LayoutLoader />
        </>
      )}
      <div className={style['discussion-thread']}>
        <div className={style['main-thread']}>
          <section className={style['ask-question']}>
            <div className={style['ask-question-container']}>
              <UserAvatar
                userAvatar={getUser?.user?.avatar}
                avatarStyle={'body-user-avatar'}
              />
              <p className={style['toAsk']} onClick={onAskShow}>
                想問點什麼嗎？
              </p>
            </div>
          </section>
          <DiscussionThread />
        </div>
        <div className={style['record']}>
          <Record />
        </div>
      </div>

      {authModal === 'ask' && (
        <Modal
          title={'想問點什麼嗎？'}
          onConfirm={onAskClose}
          modalStyle="ask-modal-container"
          closeButtonStyle={'button-close-ask'}
        >
          <>
            <div className={style['ask-modal-avatar']}>
              <UserAvatar
                userAvatar={getUser?.user?.avatar}
                avatarStyle={'body-user-avatar'}
              />
              <div className={style['user']}>
                <p className={style['name']}>{getUser?.user?.account || ''}</p>
                <p className={style['role']}>{getUser?.user?.role || ''}</p>
                <p></p>
              </div>
            </div>
            <TextAreaAsk placeholder={'請輸入你的問題...'} />
          </>
        </Modal>
      )}
    </>
  )
}

interface question {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  userId: number
  answersCount: number
  User: user
  Answers: answer[]
}

interface user {
  id: number
  role: string
  account: string
  avatar: string
}

interface answer {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  questionId: number
  userId: number
  User: user
}

function DiscussionThread() {
  const token = localStorage.getItem('token') || ''
  const getUser = useGetUser()
  const { addToHistory } = useHistory()
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(3)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [questionStatus, setQuestionStatus] = useState('')
  const render = useRender()

  // 這裡的 loading 是用在 Button 的小型 loader
  // 當 API 取得完成將 loading 設為 false
  useEffect(() => {
    questionsAPI
      .getQuestions(token, 1, limit)
      .then((res) => {
        const questionData = res.data.questions
        setQuestions(questionData)
        setLoading(false)
        render?.handleRerender(false)
        // 當回傳資料長度為 0 ，設置狀態為 'noting' 為顯示 '目前還沒有人問問題' 字段
        if (questionData.length === 0) {
          setQuestionStatus('noting')
        } else {
          setQuestionStatus('')
        }
      })
      .catch((err) => console.log(err))
  }, [render?.isRender])

  // lazy loading for questions
  const changePage = () => {
    questionsAPI
      .getQuestions(token, page, 3)
      .then((res) => {
        const questionData = res.data.questions
        if (questionData.length === 0) setHasMore(false)
        setQuestions(questions.concat(questionData))
        setPage((page) => page + 1)
        setLimit((limit) => limit + 3)
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <InfiniteScroll
        dataLength={questions.length}
        next={changePage}
        hasMore={hasMore}
        loader={loading ? <ButtonLoader /> : ''}
      >
        {questions.map((question: question) => (
          <div className={style['wrapper']} key={question.id}>
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
                onQuestionClick={() => {
                  addToHistory(
                    question.id,
                    question.title,
                    question.User.avatar,
                    question.content
                  )
                }}
              />
              <div className={style['hr']} />
              {question.Answers[0] ? (
                <Answer
                  userAccount={question.Answers[0]?.User.account}
                  userRole={question.Answers[0]?.User.role}
                  userAvatar={question.Answers[0]?.User.avatar}
                  answerDate={question.Answers[0]?.createdAt}
                  answer={question.Answers[0]?.content}
                />
              ) : (
                <p>目前還沒有人回答</p>
              )}
              <form className={style['answer-form']}>
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
        ))}
      </InfiniteScroll>
      {questionStatus === 'noting' && <p>目前還沒有人問問題</p>}
    </>
  )
}
