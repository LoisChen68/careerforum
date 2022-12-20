import React from 'react'
import style from './Selector.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  value: o[]
  required: boolean
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

interface o {
  value: string
  name: string
  disable: boolean
  selected: boolean
}

export default function Selector(props: p) {
  const option = props.value.map((i: o) =>
    <option
      key={i.value}
      value={i.value}
      disabled={i.disable}
      selected={i.selected}
    >
      {i.name}
    </option>
  )

  return (
    <div className={style['select-container']}>
      <select
        id={props.id}
        className={style['select']}
        required={props.required}
        onChange={props.onChange}>
        {option}
      </select>
    </div>
  )
}