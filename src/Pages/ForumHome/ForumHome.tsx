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
import { useModalStatus } from '../../Contexts/ModalContext'
import { useRender } from '../../Contexts/RenderContext'
import QuestionPage from '../QuestionPage/QuestionPage'
import { Link, useParams } from 'react-router-dom'

export default function ForumHome() {
  const param = useParams()
  const getUser = useGetUser()
  const [alert, setAlert] = useState(false)
  const setModalStatus = useModalStatus()
  const [loading, setLoading] = useState(true)

  // 這裡的 loading 是具有 Backdrop 的 LayoutLoader
  // 頁面渲染完成將 loading 設為 false
  useEffect(() => {
    setLoading(false)
  }, [])

  // 若抓取到網址列上有 id 時，載入 questionPage Modal
  useEffect(() => {
    const id = param.id
    if (id) {
      setModalStatus?.handleSetModal('questionPage')
    } else {
      setModalStatus?.handleSetModal('initial')
    }
  }, [param.id])

  const onAskShow = () => {
    setModalStatus?.handleSetModal('ask')
  }

  const onAskClose = () => {
    setAlert(true)
  }

  function handleOnCancel() {
    setAlert(false)
  }

  function handleOnSure() {
    setAlert(false)
    setModalStatus?.handleSetModal('initial')
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

      <EditQuestion />
      {setModalStatus?.modalStatus === 'ask' && (
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
                <p className={style['name']}>{getUser?.user?.name || ''}</p>
                {getUser?.user?.role === 'student' && (
                  <p className={style['role']}>{'學期三'}</p>
                )}
                {getUser?.user?.role === 'graduate' && (
                  <p className={style['role']}>{'畢業'}</p>
                )}
                {getUser?.user?.role === 'TA' && (
                  <p className={style['role']}>{'助教'}</p>
                )}
                <p></p>
              </div>
            </div>
            <TextAreaAsk placeholder={'請輸入你的問題...'} />
            {alert && (
              <>
                <div className={style['back-drop']} onClick={handleOnCancel} />
                <div className={style['alert-container']}>
                  <h3>{'確定要離開嗎？ 編輯內容將不被保存'}</h3>
                  <div className={style['buttons']}>
                    <button className={style['btn-cancel']} onClick={handleOnCancel}>
                      取消
                    </button>
                    <button className={style['btn-sure']} onClick={handleOnSure}>
                      確定
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        </Modal>
      )}
      {setModalStatus?.modalStatus === 'questionPage' && <QuestionPage />}
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
  name: string
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
  const setModalStatus = useModalStatus()
  const { addToHistory } = useHistory()
  const getUser = useGetUser()
  const render = useRender()
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(3)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [questionStatus, setQuestionStatus] = useState('')

  // 這裡的 loading 是用在 Button 的小型 loader
  // 當 API 取得完成將 loading 設為 false
  useEffect(() => {
    questionsAPI
      .getQuestions(1, limit)
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
      .getQuestions(page, 3)
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
                userName={question.User.name}
                userRole={question.User.role}
                userId={question.User.id}
                userAvatar={question.User.avatar}
                questionCreateDate={question.createdAt}
                questionUpdateDate={question.updatedAt}
                questionTitle={question.title}
                question={question.content}
                questionUserId={question.User.id}
                questionId={question.id}
                hashTags={[{ id: 1, name: '求職' }]}
                answerCount={question.answersCount}
                onQuestionClick={() => {
                  addToHistory({
                    questionId: question.id,
                    title: question.title,
                    userId: question.User.id,
                    avatarUrl: question.User.avatar,
                    content: question.content,
                  })
                  setModalStatus?.handleSetModal('questionPage')
                }}
              />
              <div className={style['hr']} />
              {question.Answers[0] ? (
                <>
                  <Answer
                    userId={question.Answers[0]?.User.id}
                    userName={question.Answers[0]?.User.name}
                    userRole={question.Answers[0]?.User.role}
                    userAvatar={question.Answers[0]?.User.avatar}
                    answerCreateDate={question.Answers[0]?.createdAt}
                    answerUpdateDate={question.Answers[0]?.updatedAt}
                    answerId={question.Answers[0]?.id}
                    answer={question.Answers[0]?.content}
                  />
                  <Link to={`/careerForum/${question.id}`} className={style['look-answers-container']}>
                    <span className={style['look-answers']}>查看更多回答</span>
                  </Link>
                </>
              ) : (
                <p>目前還沒有人回答</p>
              )}
              <form className={style['answer-form']}>
                <div className={style['user-avatar']}>
                  <UserAvatar
                    userAvatar={getUser?.user?.avatar}
                    avatarStyle={'body-user-avatar'}
                  />
                </div>
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

function EditQuestion() {
  const getUser = useGetUser()
  const setModalStatus = useModalStatus()
  const questionId = Number(localStorage.getItem('questionId'))
  const [question, setQuestion] = useState({ id: 0, title: '', content: '' })
  const [alert, setAlert] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if (setModalStatus?.modalStatus === 'editAsk') {
      setIsLoad(true)
      questionsAPI
        .getQuestion(questionId)
        .then((res) => {
          setIsLoad(false)
          setQuestion(res.data.question)
        })
        .catch((err) => console.log(err))
    }
  }, [setModalStatus?.modalStatus])

  function close() {
    setAlert(true)
  }

  function handleOnCancel() {
    setAlert(false)
  }

  function handleOnSure() {
    setAlert(false)
    setModalStatus?.handleSetModal('initial')
  }

  return (
    <>
      {/* TODO: 需要這樣設計，否則會造成資料為上一筆 */}
      {isLoad && (
        <Modal
          title={'編輯問題'}
          onConfirm={close}
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
                <p className={style['name']}>{getUser?.user?.name || ''}</p>
                <p className={style['role']}>{getUser?.user?.role || ''}</p>
              </div>
            </div>
            <ButtonLoader />
          </>
        </Modal>
      )}
      {setModalStatus?.modalStatus === 'editAsk' && !isLoad && (
        <Modal
          title={'編輯問題'}
          onConfirm={close}
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
                <p className={style['name']}>{getUser?.user?.name || ''}</p>
                {getUser?.user?.role === 'student' && (
                  <p className={style['role']}>{'學期三'}</p>
                )}
                {getUser?.user?.role === 'graduate' && (
                  <p className={style['role']}>{'畢業'}</p>
                )}
                {getUser?.user?.role === 'TA' && (
                  <p className={style['role']}>{'助教'}</p>
                )}
                <p></p>
              </div>
            </div>
            <TextAreaAsk
              questionId={question.id}
              title={question.title}
              content={question.content}
              placeholder={'請輸入你的問題...'}
            />
            {alert && (
              <>
                <div className={style['back-drop']} onClick={handleOnCancel} />
                <div className={style['alert-container']}>
                  <h3>{'確定要離開嗎？ 編輯內容將不被保存'}</h3>
                  <div className={style['buttons']}>
                    <button className={style['btn-cancel']} onClick={handleOnCancel}>
                      取消
                    </button>
                    <button className={style['btn-sure']} onClick={handleOnSure}>
                      確定
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        </Modal>
      )}
    </>
  )
}
