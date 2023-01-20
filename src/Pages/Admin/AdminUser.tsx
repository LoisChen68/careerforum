// import { useState } from 'react'
import { useState, useEffect } from 'react'
import adminAPI from '../../request/API/adminAPI'
import { useRender } from '../../Contexts/RenderContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonLoader from '../../UIComponents/ButtonLoader/ButtonLoader'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './AdminUser.module.scss'

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
  const [alert, setAlert] = useState(false)
  const [approval, setApproval] = useState('')
  const [userIdIsClicked, setUserIdIsClicked] = useState(0)
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
  }, [render?.isRender])

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

  const handleOnClick = (userId: number, status: string) => {
    setAlert(true)
    setApproval(status)
    setUserIdIsClicked(userId)
  }

  const handleOnCancel = () => {
    setAlert(false)
    setApproval('')
    setUserIdIsClicked(0)
  }

  const handleOnSure = () => {
    adminAPI
      .patchUsers(userIdIsClicked, approval)
      .then(() => {
        render?.handleRerender(true)
        setAlert(false)
        setApproval('')
        setUserIdIsClicked(0)
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
                <UserAvatar
                  userAvatar={user.avatar}
                  avatarStyle={'body-user-avatar'}
                />
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
                  <button
                    className={style['btn']}
                    onClick={() => handleOnClick(user.id, 'approved')}
                  >
                    Approved
                  </button>
                  <button
                    className={style['btn-warning']}
                    onClick={() => handleOnClick(user.id, 'rejected')}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {usersStatus === 'nothing' && <p>目前還沒有任何使用者</p>}
      </div>
      {alert && (
        <>
          <div className={style['back-drop']} onClick={handleOnCancel} />
          <div className={style['alert-container']}>
            <h3>{`確定要更改使用者狀態為 ${approval}？`}</h3>
            <div className={style['buttons']}>
              <button className={style['btn-cancel']} onClick={handleOnCancel}>
                取消
              </button>
              <button className={style['btn-sure']} onClick={handleOnSure}>
                確定
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
