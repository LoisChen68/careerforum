import ButtonLoader from '../ButtonLoader/ButtonLoader'
import style from './Button.module.scss'

interface buttonProps {
  innerText: string
  style: string
  type: 'submit' | 'reset' | 'button' | undefined
  onClick: (e: React.MouseEvent) => void
  disabled: boolean
}

export default function Button(props: buttonProps) {
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
            <ButtonLoader />
          </div>
          <p className={style['loading-text']}>
            Loading<span className={style['loading-dot']}>...</span>
          </p>
        </>
      ) : (
        <p className={style['button-text']}>{props.innerText}</p>
      )}
    </button>
  )
}
