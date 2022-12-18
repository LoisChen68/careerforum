import style from './Selector.module.scss'

interface p {
  label: string
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
      <label htmlFor={props.label} className={style['label']}
      >
        {props.label}
      </label>
      <select id={props.label} className={style['select']}>
        {option}
      </select>
    </div>
  )
}