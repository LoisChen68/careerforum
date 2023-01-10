import style from './UserAvatar.module.scss'

interface userAvatarProps {
  userAvatar: string
  avatarStyle: string
}

export default function UserAvatar(props: userAvatarProps) {
  return (
    <div className={style[props.avatarStyle]}>
      <img src={props.userAvatar} alt="使用者頭像" />
    </div>
  )
}
