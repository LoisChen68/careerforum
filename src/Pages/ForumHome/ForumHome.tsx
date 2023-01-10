import style from './ForumHome.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Backdrop from '../../UIComponents/Backdrop/Backdrop'
import { LayoutLoader } from '../../UIComponents/LayoutLoader/LayoutLoader'
import Question from '../../Components/Question/Question'
import { Answer } from '../../Components/Answer/Answer'
import { TextArea } from '../../UIComponents/TextArea/TextArea'
import { UserAvatar } from '../../UIComponents/UserAvatar/UserAvatar'

export default function ForumHome() {
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token') || ''
  const navigate = useNavigate()

  //驗證是否攜帶 token，若無導回首頁
  useEffect(() => {
    setLoading(true)
    if (token === '') {
      navigate('/')
      setLoading(false)
    }
    setTimeout(() => {
      if (token) {
        setLoading(false)
      }
    }, 3000)
  }, [])

  return (
    <>
      {loading && (
        <>
          <Backdrop />
          <LayoutLoader />
        </>
      )}
  <div className={style['discussion-thread']}>
    <DiscussionThread />
  </div>
    </>
  )
}

function DiscussionThread() {
  return (
    <>
      {questionsData.questions.map((question) => (
        <div className={style['wrapper']} key={question.id}>
          <div className={style['container']}>
            <Question
              title={question.title}
              userAccount={question.user.account}
              userAvatar={question.user.avatar}
              questionDate={question.createdAt}
              question={question.content}
              hashTags={[{ id: 1, name: '求職' }]}
              answerCount={question.answerCount}
            />
            <hr className={style['hr']} />
            <Answer
              userAccount={question.answer.user.account}
              userAvatar={question.answer.user.avatar}
              answerDate={question.answer.createdAt}
              answer={question.answer.content}
            />
            <form className={style['answer-form']}>
              <UserAvatar userAvatar={currentUser.avatar} />
              <TextArea placeholder={'輸入你的回答...'} scrollHeight={100} />
            </form>
          </div>
        </div>
      ))}
    </>
  )
}
// TODO: Dummy Data
const currentUser = {
  id: '1', // user PK:id
  role: 'TA',
  name: '', // 可填可不填
  account: 'user1',
  email: 'user1@careerForum.com',
  avatar: 'https://cdn-icons-png.flaticon.com/512/1864/1864514.png',
  cover: 'http://...',
  createdAt: '2023/01/07',
  updatedAt: '2023/01/07',
}

const questionsData = {
  count: 1, // 資料總筆數
  page: 1, // 預設回傳第一頁
  limit: 10, // 預設回傳 10 筆資料
  questions: [
    {
      id: 1, // questions PK:id
      title: '如何找到好工作?',
      content: '內文',
      answerCount: 1,
      userId: 1, // user FK:id
      createdAt: '2023/01/07',
      updatedAt: '2023/01/07',
      user: {
        //問題擁有者
        id: 1,
        role: '學期三',
        account: 'user1',
        avatar: 'https://cdn-icons-png.flaticon.com/512/4364/4364519.png',
      },
      answer: {
        // 預設回傳最新，limit:1
        id: '1', // answer PK:id
        content:
          '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
        userId: 2, // FK:user_id
        questionId: 1, // FK:question_id
        createdAt: '2023/01/07',
        updatedAt: '2023/01/07',
        user: {
          //回答擁有者
          id: 2, // user PK:id
          role: '助教',
          account: 'user2',
          avatar: 'https://cdn-icons-png.flaticon.com/512/9207/9207109.png',
        },
      },
    },
    {
      id: 2, // questions PK:id
      title: '如何找到好工作?',
      content: '內文',
      answerCount: 1,
      userId: 1, // user FK:id
      createdAt: '2023/01/07',
      updatedAt: '2023/01/07',
      user: {
        //問題擁有者
        id: 1,
        role: '學期三',
        account: 'user1',
        avatar: 'https://cdn-icons-png.flaticon.com/512/4364/4364519.png',
      },
      answer: {
        // 預設回傳最新，limit:1
        id: 2, // answer PK:id
        content: '找好工作的秘訣就是投履歷',
        userId: 2, // FK:user_id
        questionId: 2, // FK:question_id
        createdAt: '2023/01/07',
        updatedAt: '2023/01/07',
        user: {
          //回答擁有者
          id: 2, // user PK:id
          role: '助教',
          account: 'user2',
          avatar: 'https://cdn-icons-png.flaticon.com/512/9207/9207109.png',
        },
      },
    },
    //...
  ],
}
