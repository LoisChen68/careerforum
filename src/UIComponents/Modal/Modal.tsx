import { createPortal } from 'react-dom'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import style from './Modal.module.scss'
import { HiOutlineX } from 'react-icons/hi'

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
}


export function QuestionModal(props: questionModalProps) {

  return createPortal(
    <>
      <div className={style['modal-outer']}>
        <Backdrop onConfirm={props.onConfirm} />
        <div className={`${style['question-modal-container']} ${style['scrollbar']}`}>
          {props.children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root') as Element
  )
}
