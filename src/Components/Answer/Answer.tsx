import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './Answer.module.scss'
import { dayFormat } from '../../utils/dayFormat'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useGetUser } from '../../Contexts/UserContext'
import { useModalStatus } from '../../Contexts/ModalContext'
import { useMenuStatus } from '../../Contexts/ToggleMenuCotext'
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
  answerCreateDate: string
  answerUpdateDate: string
  answerId: number
  answer: string
}

export default function Answer(props: answerProps) {
  const [alert, setAlert] = useState(false)
  const [submitLoad, setSubmitLoad] = useState(false)
  const [contentStatus, setContentStatus] = useState('')
  const render = useRender()
  const getUser = useGetUser()
  const setModalStatus = useModalStatus()
  const setMenuStatus = useMenuStatus()
  const contentRef = useRef<HTMLParagraphElement>(null)
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
    setSubmitLoad(true)
    answerAPI
      .deleteAnswer(answerId)
      .then(() => {
        setAlert(false)
        setSubmitLoad(false)
        render?.handleRerender(true)
        toast.success('????????????', {
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
      .catch((err) => console.log(err))
  }

  function hadleMenuOnClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (`a-${props.answerId}` !== setMenuStatus?.toggleMenu) {
      setMenuStatus?.handleToggleMenu(`a-${props.answerId}`)
    } else {
      setMenuStatus?.handleToggleMenu(null)
    }
  }

  // ?????? content ??? scroolHeight(????????????????????????)??? clientHeight(?????????????????????)?????? scroolHeight > clientHeight ?????? state "close" ???????????? <p>????????????</p>
  function handleContnetHeight() {
    const scrollHeight = contentRef.current
      ? contentRef.current.scrollHeight
      : 0
    const clientHeight = contentRef.current
      ? contentRef.current.clientHeight
      : 0

    if (scrollHeight > clientHeight) {
      setContentStatus('close')
    } else {
      setContentStatus('')
    }
  }

  useEffect(() => {
    // ?????? 'resize' ???????????????????????????????????????????????? handleContnetHeight ??????
    window.addEventListener('resize', handleContnetHeight)
    handleContnetHeight() // ????????????????????????????????????????????????

    return () => {
      window.removeEventListener('resize', handleContnetHeight)
    }
  }, [])

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
              <p className={style['user-role']}>{'?????????'}</p>
            )}
            {props.userRole === 'graduate' && (
              <p className={style['user-role']}>{'??????'}</p>
            )}
            {props.userRole === 'TA' && (
              <p className={style['user-role']}>{'??????'}</p>
            )}
            <div>
              {props.answerCreateDate !== props.answerUpdateDate ? (
                <div>
                  <span className={style['user-post-date']}>
                    {dayFormat(props.answerUpdateDate)}
                  </span>
                  <span className={style['edited']}> (?????????)</span>
                </div>
              ) : (
                <p className={style['user-post-date']}>
                  {dayFormat(props.answerCreateDate)}
                </p>
              )}
            </div>
          </div>
          {getUser?.user.id === props.userId && (
            <div className={style['menu-icon']}>
              <div
                className={style['dot-menu-icon']}
                onClick={(e) => hadleMenuOnClick(e)}
              >
                <p>
                  <BiDotsVerticalRounded />
                </p>
              </div>
              <input
                id={`dot-icon-answer-${props.answerId}`}
                type="checkbox"
                className={style['menu-toggle']}
                checked={
                  `a-${props.answerId}` === setMenuStatus?.toggleMenu
                    ? true
                    : false
                }
                readOnly={true}
              />
              <div className={style['menu']}>
                <ul className={style['menu-list']}>
                  {getUser?.user?.id === props.userId && (
                    <>
                      <li className={style['menu-item']}>
                        <p onClick={() => handleEditClick(props.answerId)}>
                          ??????
                        </p>
                      </li>
                      <li className={style['menu-item']}>
                        <p onClick={() => handleDeleteClick(props.answerId)}>
                          ??????
                        </p>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <p
          ref={contentRef}
          className={
            contentStatus === 'open' ? style['content-open'] : style['content']
          }
        >
          {props.answer}
        </p>
        {contentStatus === 'close' && (
          <p
            className={style['content-status']}
            onClick={() => setContentStatus('open')}
          >
            ????????????
          </p>
        )}
        {contentStatus === 'open' && (
          <p
            className={style['content-status']}
            onClick={() => setContentStatus('close')}
          >
            ????????????
          </p>
        )}
      </div>
      <EditAnswer />
      {alert && (
        <>
          <Backdrop onConfirm={handleOnCancel} />
          <div className={style['alert-container']}>
            <h3>{`?????????????????????????????????`}</h3>
            <div className={style['buttons']}>
              <button className={style['btn-cancel']} onClick={handleOnCancel}>
                ??????
              </button>
              <button
                className={style['btn-sure']}
                onClick={handleOnSure}
                disabled={submitLoad}
              >
                ??????
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
      answerAPI
        .getAnswer(answerId)
        .then((res) => {
          setIsLoad(isLoad)
          setContent(res.data.answer.content)
        })
        .catch((err) => console.log(err))
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
          title={'????????????'}
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
          title={'????????????'}
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
              placeholder={'??????????????????...'}
              scrollHeight={200}
              answerId={answerId}
              content={content}
            />
            {alert && (
              <>
                <div className={style['back-drop']} onClick={handleOnCancel} />
                <div className={style['alert-container']}>
                  <h3>{'????????????????????? ???????????????????????????'}</h3>
                  <div className={style['buttons']}>
                    <button
                      className={style['btn-cancel']}
                      onClick={handleOnCancel}
                    >
                      ??????
                    </button>
                    <button
                      className={style['btn-sure']}
                      onClick={handleOnSure}
                    >
                      ??????
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
