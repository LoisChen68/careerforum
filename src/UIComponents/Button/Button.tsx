import ButtonLoader from '../ButtonLoader/ButtonLoader'
import style from './Button.module.scss'

interface buttonProps {
  children: React.ReactElement
  style: string
  type: 'submit' | 'reset' | 'button' | undefined
  onClick: (e: React.MouseEvent) => void
  disabled: boolean
  loading?: boolean
}

export default function Button(props: buttonProps) {
  return (
    <button
      className={style[props.style]}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? (
        <>
          <div className={style['loader']}>
            <ButtonLoader />
          </div>
          <p className={style['loading-text']}>
            Loading<span className={style['loading-dot']}>...</span>
          </p>
        </>
      ) : (
        <div className={style['button-text']}>{props.children}</div>
      )}
    </button>
  )
}
