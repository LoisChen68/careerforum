import Loader from '../Loader/Loader'
import style from './Button.module.scss'

interface p {
  innerText: string
  style: string
  type: 'submit' | 'reset' | 'button' | undefined
  onClick: (e: React.MouseEvent) => void
  disabled: boolean
}

export default function Button(props: p) {
  return (
    <button
      className={style[props.style]}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <>
          <div className={style['loader']}>
            <Loader />
          </div>
          <p className={style['loading']}>
            Loading<span className={style['loading-text']}>...</span>
          </p>
        </>
      ) : (
        <p className={style['button-text']}>{props.innerText}</p>
      )}
    </button>
  )
}
