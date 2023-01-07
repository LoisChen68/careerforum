import style from './Backdrop.module.scss'

interface backdropProps {
  onConfirm?: (e: React.MouseEvent) => void
}

export default function Backdrop(props: backdropProps) {
  return <div className={style['backdrop']} onClick={props.onConfirm}></div>
}
