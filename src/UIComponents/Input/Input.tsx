import style from './Input.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: p) {
  return (
    <div className={style['input-container']}>
      <label htmlFor={props.htmlFor} className={style['label']}>
        {props.label}
      </label>
      <input
        className={style['input']}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}
