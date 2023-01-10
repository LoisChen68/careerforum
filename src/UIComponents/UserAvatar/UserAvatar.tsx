import style from './UserAvatar.module.scss'

interface userAvatarProps {
  userAvatar: string
}

export function UserAvatar(props: userAvatarProps) {
  return (
    <div className={style['user-avatar']}>
      <img src={props.userAvatar} alt="使用者頭像" />
    </div>
  )
}
