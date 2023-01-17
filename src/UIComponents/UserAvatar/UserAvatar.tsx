import style from './UserAvatar.module.scss'

interface userAvatarProps {
  userAvatar: string | undefined
  avatarStyle: string
}

export default function UserAvatar(props: userAvatarProps) {
  const defaultAvatar =
    'https://cdn-icons-png.flaticon.com/512/1864/1864514.png'
  return (
    <div className={style[props.avatarStyle]}>
      <img
        src={props.userAvatar ? props.userAvatar : defaultAvatar}
        alt="使用者頭像"
      />
    </div>
  )
}
