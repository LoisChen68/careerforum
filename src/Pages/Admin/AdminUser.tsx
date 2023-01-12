// import { useState } from 'react'
import style from './AdminUser.module.scss'

export default function AdminUser() {
  return (
    <div className={style['users-container']}>
      <h3>使用者列表</h3>
      <div className={style['users']}>
        {users.map((user) => (
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
      </div>
    </div>
  )
}

// TODO:dummy data users
const users = [
  {
    id: 1, // user PK:id
    role: 'graduate',
    name: '', // 可填可不填
    email: 'user1@careerForum.com',
    account: 'user1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
    cover: 'http://...',
    createdAt: '2023/1/7',
    updatedAt: '2023/1/7',
    deletedAt: '2023/1/7',
    approvalStatus: 'approved',
    isAdmin: 'false',
    isSuspended: 'false',
  },
  {
    id: 2, // user PK:id
    role: 'graduate',
    name: '', // 可填可不填
    email: 'user1@careerForum.com',
    account: 'user1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
    cover: 'http://...',
    createdAt: '2023/1/7',
    updatedAt: '2023/1/7',
    deletedAt: '2023/1/7',
    approvalStatus: 'approved',
    isAdmin: 'false',
    isSuspended: 'false',
  },
  {
    id: 3, // user PK:id
    role: 'graduate',
    name: '', // 可填可不填
    email: 'user1@careerForum.com',
    account: 'user1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
    cover: 'http://...',
    createdAt: '2023/1/7',
    updatedAt: '2023/1/7',
    deletedAt: '2023/1/7',
    approvalStatus: 'approved',
    isAdmin: 'false',
    isSuspended: 'false',
  },
  {
    id: 4, // user PK:id
    role: 'graduate',
    name: '', // 可填可不填
    email: 'user1@careerForum.com',
    account: 'user1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
    cover: 'http://...',
    createdAt: '2023/1/7',
    updatedAt: '2023/1/7',
    deletedAt: '2023/1/7',
    approvalStatus: 'approved',
    isAdmin: 'false',
    isSuspended: 'false',
  },
]
