import style from './Selector.module.scss'

interface p {
  htmlFor: string
  label: string
  id: string
  value: o[]
}

interface o {
  value: string
  name: string
}

export default function Selector(props: p) {
  const option = props.value.map((i: o) =>
    <option key={i.value} value={i.value}>
      {i.name}
    </option>
  )

  return (
    <div className={style['select-container']}>
      <label htmlFor={props.htmlFor} className={style['label']}
      >
        {props.label}
      </label>
      <select id={props.id} className={style['select']}>
        {option}
      </select>
    </div>
  )
}