import style from './Home.module.scss'


export default function Home() {
  return (
    <>
      <div className={style['wrapper']}>
        <section className={style['main']}>
          <p>首頁</p>
        </section>
        <section className={style['second']}>
          <p>理念</p>
        </section>
        <footer className={style['footer']}>
          <p>頁腳</p>
        </footer>
      </div>
    </>
  )
}