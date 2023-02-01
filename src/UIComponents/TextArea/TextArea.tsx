import React, { useEffect, useRef, useState } from 'react'
import questionAPI from '../../request/API/questionAPI'
import Button from '../Button/Button'
import style from './TextArea.module.scss'
import { useRender } from '../../Contexts/RenderContext'
import { useModalStatus } from '../../Contexts/ModalContext'
import { toast } from 'react-toastify'
import answerAPI from '../../request/API/answerAPI'
import { useHistory } from '../../utils/cookies'
import { IoIosPaperPlane } from 'react-icons/io'

interface textAreaProps {
  title?: string
  content?: string
  placeholder: string
  scrollHeight?: number
  questionId?: number
  answerId?: number
}

// for 回答問題 textArea
export function TextAreaAnswer(props: textAreaProps) {
  const reRender = useRender()
  const useSetModal = useModalStatus()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [content, setContent] = useState(props.content ? props.content : '')

  if (props.scrollHeight) {
    autoSizeTextArea(textAreaRef.current, content, props.scrollHeight)
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
  }

  function onSubmitClick(e: React.MouseEvent) {
    e.preventDefault()

    if (content === props.content) {
      return
    }

    if (props.answerId) {
      answerAPI
        .putAnswer(props.answerId, content)
        .then(() => {
          toast.success('編輯成功', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          reRender?.handleRerender(true)
          useSetModal?.handleSetModal('initial')
        })
        .catch((err) => console.log(err))
    }

    if (!content.trim()) {
      toast.error('內容不得為空', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
    if (!props.answerId && content.trim()) {
      questionAPI
        .postAnswers(props.questionId, content)
        .then(() => {
          reRender?.handleRerender(true)
          setContent('')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <textarea
        className={`${style['textareaAnswer']} ${style['scrollbar']}`}
        onChange={handleChange}
        placeholder={props.placeholder}
        ref={textAreaRef}
        value={content}
      />
      {content && (
        <Button
          type="button"
          style={
            content && content !== props.content
              ? 'button-answer-submit'
              : 'button-answer-submit-disable'
          }
          onClick={onSubmitClick}
          disabled={false}
        >
          <div className={style['submit-icon']}>
            <p><IoIosPaperPlane /></p>
          </div>
        </Button>
      )}
    </>
  )
}

// for 發問問題 textArea
export function TextAreaAsk(props: textAreaProps) {
  const reRender = useRender()
  const useSetModal = useModalStatus()
  const { modifyHistoryQuestion } = useHistory()
  const [submitLoad, setSubmitLoad] = useState(false)
  const [title, setTitle] = useState(props.title ? props.title : '')
  const [content, setContent] = useState(props.content ? props.content : '')
  const [errorMessage, setErrorMessage] = useState({ title: '', content: '' })
  const [titleLengthLimit, contentLengthLimit] = [50, 500]

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setTitle(e.target.value)
    if (value.length > titleLengthLimit) {
      setErrorMessage({ ...errorMessage, title: '標題長度超過限制' })
    }
    if (!value) {
      setErrorMessage({ ...errorMessage, title: '標題不得為空' })
    } else if (value && value.length <= titleLengthLimit) {
      setErrorMessage({ ...errorMessage, title: '' })
    }
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    if (value.length > contentLengthLimit) {
      setErrorMessage({ ...errorMessage, content: '內容長度超過限制' })
    }
    if (!value) {
      setErrorMessage({ ...errorMessage, content: '內容不得為空' })
    } else if (value && value.length <= contentLengthLimit) {
      setErrorMessage({ ...errorMessage, content: '' })
    }
  }

  function onSubmitClick(e: React.MouseEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setErrorMessage({ ...errorMessage, title: '標題不得為空' })
    }

    if (!content.trim()) {
      setErrorMessage({ ...errorMessage, content: '內容不得為空' })
    }

    if (
      title.length > titleLengthLimit ||
      content.length > contentLengthLimit
    ) {
      return setErrorMessage({ ...errorMessage, content: '內容長度超過限制' })
    }

    if (title === props.title && content === props.content) {
      return
    }

    // 如果父層有 questionId 則修改問題
    if (props.questionId) {
      setSubmitLoad(true)
      questionAPI
        .putQuestion(props.questionId, title, content)
        .then((res) => {
          const question = res.data.question
          toast.success('編輯成功', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setSubmitLoad(false)
          reRender?.handleRerender(true)
          useSetModal?.handleSetModal('initial')
          modifyHistoryQuestion(question.id, question.title, question.content)
        })
        .catch((err) => console.log(err))
    }
    // 新增問題
    if (!props.questionId && title && content) {
      setSubmitLoad(true)
      questionAPI
        .postQuestion(title, content)
        .then(() => {
          setSubmitLoad(false)
          reRender?.handleRerender(true)
          useSetModal?.handleSetModal('initial')
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <input
        className={style['question-title-input']}
        id="questionTitle"
        name="questionTitle"
        type="text"
        required={true}
        placeholder="標題"
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        value={title}
        maxLength={50}
        onChange={handleInputChange}
      />
      <div className={style['message']}>
        <span>{title.length}/50</span>
        {errorMessage.title && (
          <div className={style['title-error']}>
            <p>{errorMessage.title}</p>
          </div>
        )}
      </div>
      <textarea
        name="questionContent"
        className={`${style['textareaAsk']} ${style['scrollbar']}`}
        onChange={handleTextAreaChange}
        placeholder={props.placeholder}
        value={content}
        maxLength={500}
      />
      <div className={style['message']}>
        <span>{content.length}/500</span>
        {errorMessage.content && (
          <div className={style['content-error']}>{errorMessage.content}</div>
        )}
      </div>
      <Button
        type="button"
        style={
          title &&
            content &&
            (title !== props.title || content !== props.content)
            ? 'button-ask-submit'
            : 'button-ask-submit-disable'
        }
        onClick={onSubmitClick}
        disabled={submitLoad}
      >
        <p>送出</p>
      </Button>
    </>
  )
}

// 讓 textArea 根據輸入行數自動調整高度
function autoSizeTextArea(
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  height: number
) {
  useEffect(() => {
    if (textAreaRef) {
      // 定義 textArea 預設高度
      textAreaRef.style.height = ''
      // 定義 textArea 元素內容高度
      const scrollHeight = textAreaRef.scrollHeight
      if (scrollHeight < height) {
        // 當 scrollHeight 小於 height 隱藏內容
        textAreaRef.style.overflow = 'hidden'
        // 將 textArea 高度依據 scrollHeight 進行變化
        textAreaRef.style.height = `${scrollHeight}px`
      } else {
        // 當 scrollHeight 大於 height 顯示內容
        textAreaRef.style.overflow = ''
        // 當 scrollHeight 大於 height 將文本區域高度固定在 height px
        textAreaRef.style.height = `${height}px`
      }
    }
  }, [textAreaRef, value])
}
