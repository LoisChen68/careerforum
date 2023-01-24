import React from 'react'
import style from './Selector.module.scss'

interface selectorProps {
  htmlFor: string
  label: string
  id: string
  value: value[]
  required: boolean
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  errorMessage: string
  selectedValue: string
  name: string
}

interface value {
  value: string
  name: string
  disable: boolean
}

export default function Selector(props: selectorProps) {
  const option = props.value.map((i: value) => (
    <option key={i.value} value={i.value} disabled={i.disable}>
      {i.name}
    </option>
  ))

  return (
    <div className={style['select-container']}>
      <select
        id={props.id}
        name={props.name}
        className={style['select']}
        required={props.required}
        value={props.selectedValue}
        onChange={props.onChange}
      >
        {option}
      </select>
      <span className={style['error-message']}>{props.errorMessage}</span>
    </div>
  )
}
