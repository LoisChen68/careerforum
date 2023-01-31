import { useEffect, useRef, useState } from 'react'
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
import { dayFormat } from '../../utils/dayFormat'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useGetUser } from '../../Contexts/UserContext'
import { toast } from 'react-toastify'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { useHistory } from '../../utils/cookies'

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
    name: '',
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
  name: string
  avatar: string
}

export default function QuestionPage() {
  const param = useParams()
  const render = useRender()
  const getUser = useGetUser()
  const setModalStatus = useModalStatus()
  const { removeHistory } = useHistory()
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [alert, setAlert] = useState(false)
  const [submitLoad, setSubmitLoad] = useState(false)
  const [answers, setAnswers] = useState([])
  const [answerStatus, setAnswerStatus] = useState('')
  const [question, setQuestion] = useState(questionData)

  // 取得單筆問題
  useEffect(() => {
    async function fetchQuestion() {
      await questionAPI
        .getQuestion(Number(param.id))
        .then((res) => {
          setLoading(false)
          setQuestion(res.data.question)
        })
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

  function handleEditClick(id: number) {
    setModalStatus?.handleSetModal('editAsk')
    localStorage.setItem('questionId', id.toString())
  }

  function handleDeleteClick(id: number) {
    setAlert(true)
    localStorage.setItem('questionId', id.toString())
  }

  function handleOnSure() {
    setSubmitLoad(true)
    questionAPI
      .deleteQuestion(Number(question.id))
      .then((res) => {
        const question = res.data.question
        toast.success('刪除成功', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setAlert(false)
        setSubmitLoad(false)
        render?.handleRerender(true)
        removeHistory(question.id)
        setModalStatus?.handleSetModal('initial')
      })
      .catch((err) => console.log(err))
  }

  function handleOnCancel() {
    setAlert(false)
  }

  function close() {
    setModalStatus?.handleSetModal('initial')
  }

  function copyURL() {
    navigator.clipboard.writeText(`${origin}/careerforum/${question.id}`)
    toast.success('複製分享網址成功', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  return (
    <>
      <QuestionModal
        onConfirm={close}
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
          <div
            id="scrollbarDiv"
            className={`${style['discussion-thread']} ${style['scrollbar']}`}
          >
            <div className={style['wrapper']}>
              <div className={`${style['container']}`}>
                <section className={style['title-section']}>
                  <div className={style['user-close-button']}>
                    <div className={style['user']}>
                      <Link to={`/careerForum/users/${question.User.id}`}>
                        <UserAvatar
                          userAvatar={question.User.avatar}
                          avatarStyle={'body-user-avatar'}
                        />
                      </Link>
                      <div>
                        <div className={style['user-name']}>
                          <Link to={`/careerForum/users/${question.User.id}`}>
                            <p className={style['name']}>
                              {question.User.name}
                            </p>
                          </Link>
                          {question.User.role === 'student' && (
                            <p className={style['role']}>{'學期三'}</p>
                          )}
                          {question.User.role === 'graduate' && (
                            <p className={style['role']}>{'畢業'}</p>
                          )}
                          {question.User.role === 'TA' && (
                            <p className={style['role']}>{'助教'}</p>
                          )}
                        </div>
                        {question.createdAt !== question.updatedAt ? (
                          <>
                            <span>{dayFormat(question.updatedAt)}</span>
                            <span className={style['edited']}> (已編輯)</span>
                          </>
                        ) : (
                          <span>{dayFormat(question.createdAt)}</span>
                        )}
                      </div>
                    </div>
                    <div className={style['menu-close-button']}>
                      <label htmlFor={'dot-icon'}>
                        <p>
                          <BiDotsVerticalRounded />
                        </p>
                      </label>
                      <input
                        ref={checkboxRef}
                        id={'dot-icon'}
                        type="checkbox"
                        className={style['menu-toggle']}
                      />
                      <div
                        className={style['menu']}
                        onClick={() =>
                          checkboxRef.current &&
                          (checkboxRef.current.checked = false)
                        }
                      >
                        <ul className={style['menu-list']}>
                          {getUser?.user?.id === question.User.id && (
                            <>
                              <li className={style['menu-item']}>
                                <p onClick={() => handleEditClick(question.id)}>
                                  編輯
                                </p>
                              </li>
                              <li className={style['menu-item']}>
                                <p
                                  onClick={() => handleDeleteClick(question.id)}
                                >
                                  刪除
                                </p>
                              </li>
                            </>
                          )}
                          <li className={style['menu-item']}>
                            <p onClick={copyURL}>分享</p>
                          </li>
                        </ul>
                      </div>
                      <Link to="/careerforum/home">
                        <Button
                          type="button"
                          style={'button-close-question'}
                          onClick={close}
                          disabled={false}
                        >
                          <p className={style['icon']} role="close">
                            <HiOutlineX />
                          </p>
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <h3 className={style['title']}>{question.title}</h3>
                </section>
                <section className={style['content-container']}>
                  {loading && <ButtonLoader />}
                  <p className={style['content']}>{question.content}</p>
                </section>
                <div className={style['answer-container']}>
                  {loading && <ButtonLoader />}
                  {answerStatus === 'noting' && <p>目前還沒有人回答</p>}
                  {answers.map((answer: answer) => (
                    <Answer
                      key={answer.id}
                      userId={answer.User.id}
                      userAvatar={answer.User.avatar}
                      userRole={answer.User.role}
                      userName={answer.User.name}
                      answerCreateDate={answer.createdAt}
                      answerUpdateDate={answer.updatedAt}
                      answerId={answer.id}
                      answer={answer.content}
                    />
                  ))}
                  {alert && (
                    <>
                      <Backdrop onConfirm={handleOnCancel} />
                      <div className={style['alert-container']}>
                        <h3>{`確定要刪除 ${question.title} 這則問題嗎？`}</h3>
                        <div className={style['buttons']}>
                          <button
                            className={style['btn-cancel']}
                            onClick={handleOnCancel}
                          >
                            取消
                          </button>
                          <button
                            className={style['btn-sure']}
                            onClick={handleOnSure}
                            disabled={submitLoad}
                          >
                            確定
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </QuestionModal>
    </>
  )
}
