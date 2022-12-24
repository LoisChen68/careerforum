import { createPortal } from 'react-dom'
import style from './Modal.module.scss'

interface p {
  title: string
  onConfirm: (e: React.MouseEvent) => void
  children: React.ReactElement
}

export default function Login(props: p) {
  return createPortal(
    <>
      <div className={style['backdrop']} onClick={props.onConfirm}></div>
      <div className={style['modal-outer']}>
        <div className={style['modal-container']}>
          <header className={style['header']}>
            <h2>{props.title}</h2>
          </header>
          <form className={style['form']}>{props.children}</form>
        </div>
      </div>
    </>,
    document.getElementById('modal-root') as Element
  )
}
