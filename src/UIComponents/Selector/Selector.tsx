import React from 'react'
import style from './Selector.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  value: o[]
  required: boolean
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  errorMessage: string
  selectedValue: string
}

interface o {
  value: string
  name: string
  disable: boolean
}

export default function Selector(props: p) {
  const option = props.value.map((i: o) => (
    <option key={i.value} value={i.value} disabled={i.disable}>
      {i.name}
    </option>
  ))

  return (
    <div className={style['select-container']}>
      <select
        id={props.id}
        className={style['select']}
        required={props.required}
        defaultValue={'' || props.selectedValue}
        onChange={props.onChange}
      >
        {option}
      </select>
      <span className={style['error-message']}>{props.errorMessage}</span>
    </div>
  )
}
