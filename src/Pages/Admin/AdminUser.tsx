// import { useState } from 'react'
import { useState, useEffect } from 'react'
import adminAPI from '../../request/API/adminAPI'
import { useRender } from '../../Contexts/RenderContext'
import style from './AdminUser.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonLoader from '../../UIComponents/ButtonLoader/ButtonLoader'

interface user {
  id: number
  role: string
  name: string | null
  email: string
  account: string
  avatar: string
  cover: string | null
  deletedAt: string | null
  approvalStatus: string
  isAdmin: boolean
  isSuspended: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminUser() {
  const [users, setUsers] = useState([])
  const [usersStatus, setUsersStatus] = useState('')
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(3)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const render = useRender()

  useEffect(() => {
    adminAPI
      .getUsers(1, limit)
      .then((res) => {
        const usersData = res.data.users
        setUsers(usersData)
        setLoading(false)
        render?.handleRerender(false)

        if (usersData.length === 0) {
          setUsersStatus('nothing')
        } else {
          setUsersStatus('')
        }
      })
      .catch((err) => console.error(err))
  })

  // Lazy Loading for users
  const changePage = () => {
    adminAPI
      .getUsers(page, 3)
      .then((res) => {
        const usersData = res.data.users
        if (usersData.length === 0) setHasMore(false)
        setUsers(users.concat(usersData))
        setPage((page) => page + 1)
        setLimit((limit) => limit + 3)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className={style['users-container']}>
      <h3>使用者列表</h3>
      <div className={style['users']}>
        <InfiniteScroll
          dataLength={users.length}
          next={changePage}
          hasMore={hasMore}
          loader={loading ? <ButtonLoader /> : ''}
        >
          {users.map((user: user) => (
            <div key={user.id} className={style['user']}>
              <div className={style['user-header']}>
                <div className={style['avatar']}>
                  <img src={user.avatar} alt="使用者頭像" />
                </div>
                <div className={style['appellation']}>
                  <p>{user.account}</p>
                  <p className={style['appellation-role']}>{user.role}</p>
                </div>
              </div>
              <div className={style['user-info']}>
                <p>{`Account：${user.account}`}</p>
                <p>{`Name： ${user.name}`}</p>
                <p>{`Email： ${user.email}`}</p>
                <div className={style['role']}>
                  <p>{`Role： ${user.role}`}</p>
                  <button className={style['btn']}>TA</button>
                  <button className={style['btn']}>Student</button>
                  <button className={style['btn']}>Graduate</button>
                </div>
                <div className={style['approvalStatus']}>
                  <p>{`審查狀態：${user.approvalStatus}`}</p>
                  <button className={style['btn']}>Approved</button>
                  <button className={style['btn-warning']}>Rejected</button>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {usersStatus === 'nothing' && <p>目前還沒有任何使用者</p>}
      </div>
    </div>
  )
}
