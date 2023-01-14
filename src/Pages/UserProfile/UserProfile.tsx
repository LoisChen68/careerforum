import style from './UserProfile.module.scss'
import userAPI from '../../request/API/userAPI'
import { useParams } from 'react-router'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import { useEffect, useState } from 'react'

const defaultUserData = {
  id: 0,
  role: '',
  name: '',
  email: '',
  account: '',
  avatar: '',
  cover: '',
  deletedAt: '',
  approvalStatus: '',
  isAdmin: false,
  isSuspended: false,
}

export default function UserProfile() {
  const param = useParams()
  const token = localStorage.getItem('token')
  const [userData, setUserData] = useState(defaultUserData)

  useEffect(() => {
    userAPI
      .getUser(token, Number(param.id))
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className={style['user-profile']}>
        <div className={style['wrapper']}>
          <div className={style['container']}>
            <UserAvatar avatarStyle="body-user-avatar" userAvatar={userData.avatar} />
            <p>{userData.account}</p>
            <p>{userData.role}</p>
          </div>
        </div>
      </div>
    </>
  )
}