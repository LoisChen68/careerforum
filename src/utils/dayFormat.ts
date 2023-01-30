import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-tw'

dayjs.extend(relativeTime)
dayjs.locale('zh-TW')

export function dayFormat(date: string) {
  const dateObject = dayjs(date)
  const relativeTime = dateObject.from(dayjs())

  return relativeTime
}
