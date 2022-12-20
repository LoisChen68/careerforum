import style from './Input.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  placeholder?: string
  type: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: p) {
  return (
    <div className={style['input-container']}>
      <input
        className={style['input']}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
      />
      <label htmlFor={props.htmlFor} className={style['label']}>
        {props.label}
      </label>
    </div>
  )
}
