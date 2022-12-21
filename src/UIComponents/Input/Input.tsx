import style from './Input.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  placeholder?: string
  type: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: string
  value: string
}

export default function Input(props: p) {
  return (
    <div className={style['input-container']}>
      <input
        className={props.errorMessage ? style['error-input'] : style['input']}
        id={props.id}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
      />
      <span className={style['error-message']}>{props.errorMessage}</span>
      <label htmlFor={props.htmlFor} className={style['label']}>
        {props.label}
      </label>
    </div>
  )
}
