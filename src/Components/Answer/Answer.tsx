import { Link } from 'react-router-dom'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'
import { dayFormat } from '../../utils/dayFormat'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import { useGetUser } from '../../Contexts/UserContext'
import { useModalStatus } from '../../Contexts/ModalContext'
import Modal from '../../UIComponents/Modal/Modal'
import { TextAreaAnswer } from '../../UIComponents/TextArea/TextArea'
import answerAPI from '../../request/API/answerAPI'
import ButtonLoader from '../../UIComponents/ButtonLoader/ButtonLoader'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { useRender } from '../../Contexts/RenderContext'
import { toast } from 'react-toastify'

interface answerProps {
  userId: number
  userAvatar: string
  userName: string
  userRole: string
  answerDate: string
  answerId: number
  answer: string
}

export default function Answer(props: answerProps) {
  const render = useRender()
  const getUser = useGetUser()
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [alert, setAlert] = useState(false)
  const setModalStatus = useModalStatus()
  const answerId = Number(localStorage.getItem('answerId'))

  function handleEditClick(id: number) {
    setModalStatus?.handleSetModal('editAnswer')
    localStorage.setItem('answerId', id.toString())
  }

  function handleDeleteClick(id: number) {
    setAlert(true)
    localStorage.setItem('answerId', id.toString())
  }

  function handleOnCancel() {
    setAlert(false)
  }

  function handleOnSure() {
    answerAPI
      .deleteAnswer(answerId)
      .then(() => {
        setAlert(false)
        render?.handleRerender(true)
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
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={style['answer-container']}>
      <Link to={`/careerForum/users/${props.userId}`}>
        <UserAvatar
          userAvatar={props.userAvatar}
          avatarStyle={'body-user-avatar'}
        />
      </Link>
      <div className={style['answer']}>
        <div className={style['user-menu-icon']}>
          <div className={style['user']}>
            <Link to={`/careerForum/users/${props.userId}`}>
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
            <div>
              <p className={style['user-post-date']}>{dayFormat(props.answerDate)
              }</p>
            </div>
          </div>
          {getUser?.user.id === props.userId && (
            <div className={style['menu-icon']}>
              <label htmlFor={`dot-icon-answer-${props.answerId}`}>
                <p><BiDotsVerticalRounded /></p>
              </label>
              <input
                ref={checkboxRef}
                id={`dot-icon-answer-${props.answerId}`}
                type="checkbox"
                className={style['menu-toggle']}
              />
              <div className={style['menu']} onClick={() => checkboxRef.current && (checkboxRef.current.checked = false)}>
                <ul className={style['menu-list']}>
                  {getUser?.user?.id === props.userId && (
                    <>
                      <li className={style['menu-item']}>
                        <p onClick={() => handleEditClick(props.answerId)}>編輯</p>
                      </li>
                      <li className={style['menu-item']}>
                        <p onClick={() => handleDeleteClick(props.answerId)}>刪除</p>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

          )}
        </div>
        <p className={style['content']}>{props.answer}</p>
      </div>
      <EditAnswer />
      {alert && (
        <>
          <Backdrop onConfirm={handleOnCancel} />
          <div className={style['alert-container']}>
            <h3>{`確定要刪除這則回答嗎？`}</h3>
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
    </div>
  )
}


function EditAnswer() {
  const getUser = useGetUser()
  const setModalStatus = useModalStatus()
  const answerId = Number(localStorage.getItem('answerId'))
  const [content, setContent] = useState('')
  const [isLoad, setIsLoad] = useState(false)
  const [alert, setAlert] = useState(false)


  useEffect(() => {
    if (setModalStatus?.modalStatus === 'editAnswer') {
      setIsLoad(true)
      answerAPI.getAnswer(answerId)
        .then(res => {
          setIsLoad(isLoad)
          setContent(res.data.answer.content)
        })
        .catch(err => console.log(err))
    }
  }, [setModalStatus?.modalStatus])

  function handleOnCancel() {
    setAlert(false)
  }

  function handleOnSure() {
    setAlert(false)
    setModalStatus?.handleSetModal('initial')
  }

  function close() {
    setAlert(true)
  }

  return (
    <>
      {isLoad && (
        <Modal
          title={'編輯回答'}
          onConfirm={close}
          modalStyle="edit-answer-container"
          closeButtonStyle={'button-close-ask'}
        >
          <div className={style['']}>
            <UserAvatar
              userAvatar={getUser?.user?.avatar}
              avatarStyle={'body-user-avatar'}
            />
            <ButtonLoader />
          </div>
        </Modal>
      )}
      {!isLoad && setModalStatus?.modalStatus === 'editAnswer' && (
        <Modal
          title={'編輯回答'}
          onConfirm={close}
          modalStyle="edit-answer-container"
          closeButtonStyle={'button-close-ask'}
        >
          <div className={style['answer-form']}>
            <div className={style['user-avatar']}>
              <UserAvatar
                userAvatar={getUser?.user?.avatar}
                avatarStyle={'body-user-avatar'}
              />
            </div>
            <TextAreaAnswer
              placeholder={'輸入你的回答...'}
              scrollHeight={200}
              answerId={answerId}
              content={content}
            />
          </div>
        </Modal>
      )}
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
  )
}