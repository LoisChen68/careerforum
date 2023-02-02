import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useModalStatus } from '../../Contexts/ModalContext'
import { useGetUser } from '../../Contexts/UserContext'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Question.module.scss'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import questionAPI from '../../request/API/questionAPI'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { useRender } from '../../Contexts/RenderContext'
import { useMenuStatus } from '../../Contexts/ToggleMenuCotext'
import { toast } from 'react-toastify'
import { dayFormat } from '../../utils/dayFormat'
import { useHistory } from '../../utils/cookies'

interface questionProps {
  userName: string
  userRole: string
  userId: number
  userAvatar: string
  questionCreateDate: string
  questionUpdateDate: string
  questionTitle: string
  question: string
  questionId: number
  questionUserId: number
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
  const render = useRender()
  const getUser = useGetUser()
  const { removeHistory } = useHistory()
  const [alert, setAlert] = useState(false)
  const [submitLoad, setSubmitLoad] = useState(false)
  const setModalStatus = useModalStatus()
  const setMenuStatus = useMenuStatus()
  const questionId = localStorage.getItem('questionId')
  const origin = window.location.origin

  const hashTag = props.hashTags.map((item: value) => (
    <p key={item.id}>{`#${item.name}`}</p>
  ))

  function handleEditClick(id: number) {
    if (questionId) {
      localStorage.removeItem('questionId')
    }
    setModalStatus?.handleSetModal('editAsk')
    localStorage.setItem('questionId', id.toString())
  }

  function handleDeleteClick(id: number) {
    setAlert(true)
    localStorage.setItem('questionId', id.toString())
  }

  function handleOnCancel() {
    setAlert(false)
  }

  function handleOnSure() {
    setSubmitLoad(true)
    questionAPI
      .deleteQuestion(Number(questionId))
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
      })
      .catch((err) => console.log(err))
  }

  function copyURL() {
    navigator.clipboard.writeText(`${origin}/careerforum/${props.questionId}`)
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

  function hadleMenuOnClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (`q-${props.questionId}` !== setMenuStatus?.toggleMenu) {
      setMenuStatus?.handleToggleMenu(`q-${props.questionId}`)
    } else {
      setMenuStatus?.handleToggleMenu(null)
    }
  }

  return (
    <div className={style['question-container']}>
      <div className={style['title-container']}>
        <Link to={`/careerforum/${props.questionId}`}>
          <h3
            className={style['question-title']}
            onClick={props.onQuestionClick}
          >
            {props.title}
          </h3>
        </Link>
        <div>
          <div className={style['dot-menu-icon']}
            onClick={(e) => hadleMenuOnClick(e)
            }
          >
            <p>
              <BiDotsVerticalRounded />
            </p>
          </div>
          <input
            id={`dot-icon-question-${props.questionId}`}
            type="checkbox"
            className={style['menu-toggle']}
            checked={`q-${props.questionId}` === setMenuStatus?.toggleMenu ? true : false}
            readOnly={true}
          />
          <div
            className={style['menu']}
          >
            <ul className={style['menu-list']}>
              {getUser?.user?.id === props.questionUserId && (
                <>
                  <li className={style['menu-item']}>
                    <p onClick={() => handleEditClick(props.questionId)}>
                      編輯
                    </p>
                  </li>
                  <li className={style['menu-item']}>
                    <p onClick={() => handleDeleteClick(props.questionId)}>
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
          {alert && (
            <>
              <Backdrop onConfirm={handleOnCancel} />
              <div className={style['alert-container']}>
                <h3>{`確定要刪除 ${props.questionTitle} 這則問題嗎？`}</h3>
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
              <p className={style['user-name']}>{props.userName}</p>
            </Link>
            {props.userRole === 'student' && (
              <p className={style['user-role']}>{'學期三'}</p>
            )}
            {props.userRole === 'graduate' && (
              <p className={style['user-role']}>{'畢業'}</p>
            )}
            {props.userRole === 'TA' && (
              <p className={style['user-role']}>{'助教'}</p>
            )}
          </div>
          {props.questionCreateDate !== props.questionUpdateDate ? (
            <div>
              <span className={style['user-post-date']}>
                {dayFormat(props.questionUpdateDate)}
              </span>
              <span className={style['edited']}> (已編輯)</span>
            </div>
          ) : (
            <span className={style['user-post-date']}>
              {dayFormat(props.questionCreateDate)}
            </span>
          )}
        </div>
      </div>
      <div className={style['content']}>{props.question}</div>
      <div className={style['hash-tags']}>{hashTag}</div>
      <Link to={`/careerforum/${props.questionId}`} className={style['answer-count-container']}>
        <span
          className={style['answer-count']}
        >{`${props.answerCount} 則回答`}</span>
      </Link>
    </div>
  )
}
