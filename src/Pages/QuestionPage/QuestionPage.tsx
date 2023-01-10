import Answer from '../../Components/Answer/Answer'
import Question from '../../Components/Question/Question'
import { TextArea } from '../../UIComponents/TextArea/TextArea'
import UserAvatar from '../../UIComponents/UserAvatar/UserAvatar'
import style from './QuestionPage.module.scss'

export default function QuestionPage() {
  return (
    <div className={style['discussion-thread']}>
      <div className={style['wrapper']}>
        <div className={style['container']}>
          <Question
            title={question.title}
            userAccount={question.user.account}
            userId={question.user.id}
            userAvatar={question.user.avatar}
            questionDate={question.createdAt}
            question={question.content}
            questionId={question.id}
            hashTags={[{ id: 1, name: '求職' }]}
            answerCount={question.answerCount}
          />
          <hr className={style['hr']} />
          {answers.map((answer) => (
            <>
              <div className={style['answer-container']}>
                <Answer
                  key={answer.id}
                  userAvatar={answer.user.avatar}
                  userAccount={answer.user.account}
                  answerDate={answer.createdAt}
                  answer={answer.content}
                />
              </div>
            </>
          ))}
          <form className={style['answer-form']}>
            <UserAvatar
              userAvatar={currentUser.avatar}
              avatarStyle={'body-user-avatar'}
            />
            <TextArea placeholder={'輸入你的回答...'} scrollHeight={100} />
          </form>
        </div>
      </div>
      <hr className={style['answer-hr']} />
    </div>
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

const question = {
  id: 1, // questions PK:id
  title: '如何找到好工作?',
  content: '內文',
  answerCount: 1,
  createdAt: '2023/01/07',
  updatedAt: '2023/01/07',
  userId: 1, // user FK:id
  user: {
    //問題擁有者
    id: 1,
    role: '學期三',
    account: 'user1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4364/4364519.png',
  },
}

const answers = [
  {
    id: 1,
    content: '找好工作的秘訣就是投履歷',
    userId: 2,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T14:24:05.000Z',
    user: {
      //回答擁有者
      id: 2, // user PK:id
      role: '助教',
      account: 'user2',
      avatar: 'https://cdn-icons-png.flaticon.com/512/9207/9207109.png',
    },
  },
  {
    id: 2,
    content: '找工作需要緣分',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  {
    id: 2,
    content:
      '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  {
    id: 2,
    content:
      '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  {
    id: 2,
    content:
      '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  {
    id: 2,
    content:
      '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  {
    id: 2,
    content:
      '找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷找好工作的秘訣就是投履歷',
    userId: 3,
    questionId: 1,
    createdAt: '2023-01-07T08:32:12.000Z',
    updatedAt: '2023-01-07T08:32:12.000Z',
    user: {
      //回答擁有者
      id: 3, // user PK:id
      role: '助教',
      account: 'user3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2053/2053567.png',
    },
  },
  //...
]
