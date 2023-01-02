import style from './Backdrop.module.scss'

interface p {
  onConfirm?: (e: React.MouseEvent) => void
}

export default function Backdrop(props: p) {
  return <div className={style['backdrop']} onClick={props.onConfirm}></div>
}
