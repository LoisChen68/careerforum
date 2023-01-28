import style from './Input.module.scss'

interface inputProps {
  htmlFor: string
  label: string
  id: string
  name: string
  placeholder?: string
  type: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: string
  value: string
  maxLength?: number
}

export default function Input(props: inputProps) {
  return (
    <div className={style['input-container']}>
      <input
        className={props.errorMessage ? style['error-input'] : style['input']}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        maxLength={props.maxLength}
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
