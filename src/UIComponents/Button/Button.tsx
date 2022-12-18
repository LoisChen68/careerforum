import style from './Button.module.scss'

interface p {
  innerText: string
  style: string
  type: 'submit' | 'reset' | 'button' | undefined
  onClick: (e: React.MouseEvent) => void
}

export default function Button(props: p) {
  return (
    <button
      className={style[props.style]}
      type={props.type}
      onClick={props.onClick}
    >
      {props.innerText}
    </button>
  )
}
