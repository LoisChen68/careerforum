import style from './UserProfile.module.scss'
import userAPI from '../../request/API/userAPI'
import { useParams } from 'react-router'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetUser } from '../../Contexts/UserContext'
import Button from '../../UIComponents/Button/Button'

const defaultUserData = {
  id: 0,
  role: '',
  name: '',
  email: '',
  avatar: '',
  cover: '',
  deletedAt: '',
  approvalStatus: '',
  isAdmin: false,
  isSuspended: false,
}

export default function UserProfile() {
  const getUser = useGetUser()
  const param = useParams()
  const [userData, setUserData] = useState(defaultUserData)

  useEffect(() => {
    userAPI
      .getUser(Number(param.id))
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err))
  }, [Number(param.id)])

  return (
    <>
      <div className={style['wrapper']}>
        <div className={style['container']}>
          <div className={style['user-profile']}>
            <UserAvatar
              avatarStyle="user-profile-avatar"
              userAvatar={userData.avatar}
            />
            <div className={style['user-data']}>
              <p>{userData.name}</p>
              <p className={style['role']}>{userData.role}</p>
            </div>
            <div>
              {getUser?.user.id === Number(param.id) && (
                <Link to={'/careerforum/users/setting'} >
                  <Button
                    type="submit"
                    style="user-setting-button"
                    onClick={(e) => { e }}
                    disabled={false}
                  >
                    <p>編輯個人檔案</p>
                  </Button>
                </Link>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
