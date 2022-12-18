import style from './Button.module.scss'

interface p {
  innerText: string
  style: string
}

export default function Button(props: p) {
  return (
    <button className={style[props.style]}>{props.innerText}</button>
  )
}