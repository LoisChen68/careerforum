import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import style from './Home.module.scss'
import askDesktop from '../../previewImage/askDesktop.png'
import forumHomeDesktop from '../../previewImage/forumHomeDesktop.png'
import cover from '../../previewImage/cover.png'
import { AiFillGithub } from 'react-icons/ai'

const banner = [askDesktop, forumHomeDesktop]

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots: JSX.Element) => (
      <div
        style={{
          height: '40px',
          position: 'absolute',
          bottom: '0',
        }}
      >
        <ul>{dots}</ul>
      </div>
    ),
  }

  return (
    <>
      <div className={style['wrapper']}>
        <div className={style['container']}>
          <section className={style['main']}>
            <Slider {...settings}>
              {banner.map((item, index) => (
                <div className={style['banner-container']} key={index}>
                  <img src={item} alt="banner" />
                </div>
              ))}
            </Slider>
          </section>
          <section className={style['second']}>
            <p>使用職涯論壇的三個理由</p>
            <p className={style['subtitle']}>人生沒有明確的答案，</p>
            <p className={style['subtitle']}>
              但你可以透過問答探尋你的職涯方向
            </p>
            <ul className={style['card-group']}>
              <div className={style['card']}>
                <li className={style['card-title']}>互助</li>
                <span>
                  剛畢業的你一定感到很迷茫，
                  <br />
                  在這裡你可以向學長姊及助教發問職涯相關問題，
                  <br />
                  我們想利用這個論壇讓社群指引你職涯方向。
                </span>
              </div>
              <div className={style['card']}>
                <li className={style['card-title']}>聚集</li>
                <span>
                  現有的資源都過於分散，
                  <br />
                  於是我們將歷屆學長姐的問答聚集於此論壇，
                  <br />
                  讓你可以參考其他人的問答調整自己的方向。
                </span>
              </div>
              <div className={style['card']}>
                <li className={style['card-title']}>綜合</li>
                <span>
                  過往學長姐大多會收到至少一位助教的指點，
                  <br />
                  如果剛好沒有收到其他資源，
                  <br />
                  那就只會有一個方向可以參考，
                  <br />
                  而每個學長姊與助教都會有不同的回答觀點，
                  <br />
                  在這裡你可以將這些回答綜合出自己的看法。
                </span>
              </div>
            </ul>
          </section>
          <section>
            <img src={cover}></img>
          </section>
        </div>

        <footer className={style['footer']}>
          <div className={style['info-group']}>
            <p>關於開發團隊</p>
            <div className={style['dev-group']}>
              <div>
                <p>前端</p>
                <p>
                  <a
                    rel="noreferrer"
                    href="https://github.com/LoisChen68"
                    target="_blank"
                  >
                    Lois
                  </a>
                </p>
                <p>
                  <a
                    rel="noreferrer"
                    href="https://github.com/Gino-Hsu"
                    target="_blank"
                  >
                    Gino
                  </a>
                </p>
              </div>
              <div>
                <p>後端</p>
                <p>
                  <a
                    rel="noreferrer"
                    href="https://github.com/AdrieneTZ"
                    target="_blank"
                  >
                    Adriene
                  </a>
                </p>
                <p>
                  <a
                    rel="noreferrer"
                    href="https://github.com/seanlin1125"
                    target="_blank"
                  >
                    Sean
                  </a>
                </p>
              </div>
            </div>
          </div>
          <p className={style['github']}>
            <AiFillGithub />
            <a
              rel="noreferrer"
              href="https://github.com/LoisChen68/careerforum"
              target="_blank"
            >
              Github
            </a>
          </p>
          <p>Career Forum &copy; 2023</p>
        </footer>
      </div>
    </>
  )
}
