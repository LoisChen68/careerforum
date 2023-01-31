import { createPortal } from 'react-dom'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import style from './Modal.module.scss'
import { HiOutlineX } from 'react-icons/hi'
import UserAvatar from '../UserAvatar/UserAvatar'
import { useGetUser } from '../../Contexts/UserContext'
import { TextAreaAnswer } from '../TextArea/TextArea'
import { Link } from 'react-router-dom'

interface modalProps {
  title: string
  onConfirm: (e: React.MouseEvent) => void
  modalStyle: string
  closeButtonStyle: string
  children: React.ReactElement
}

export default function Modal(props: modalProps) {
  return createPortal(
    <>
      <div className={style['modal-outer']}>
        <Backdrop onConfirm={props.onConfirm} />
        <div className={`${style[props.modalStyle]} ${style['scrollbar']}`}>
          <header className={style['header']}>
            <h2>{props.title}</h2>
            <Button
              type="button"
              style={props.closeButtonStyle}
              onClick={props.onConfirm}
              disabled={false}
            >
              <p className={style['icon']} role="close">
                <HiOutlineX />
              </p>
            </Button>
          </header>
          <form className={style['form']}>{props.children}</form>
        </div>
      </div>
    </>,
    document.getElementById('modal-root') as Element
  )
}

interface questionModalProps {
  onConfirm: (e: React.MouseEvent) => void
  closeButtonStyle: string
  children: React.ReactElement
  questionId: number
}

export function QuestionModal(props: questionModalProps) {
  const getUser = useGetUser()

  return createPortal(
    <>
      <div className={style['modal-outer']}>
        <Link to="/careerforum/home">
          <Backdrop onConfirm={props.onConfirm} />
        </Link>
        <div
          className={`${style['question-modal-container']} ${style['scrollbar']}`}
        >
          {props.children}
          <form className={style['answer-form']}>
            <UserAvatar
              userAvatar={getUser?.user?.avatar}
              avatarStyle={'body-user-avatar'}
            />
            <TextAreaAnswer
              placeholder={'輸入你的回答...'}
              scrollHeight={100}
              questionId={props.questionId}
            />
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal-root') as Element
  )
}
