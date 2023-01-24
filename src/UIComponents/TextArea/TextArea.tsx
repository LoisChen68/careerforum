import React, { useEffect, useRef, useState } from 'react'
import questionAPI from '../../request/API/questionAPI'
import Button from '../Button/Button'
import style from './TextArea.module.scss'
import { useRender } from '../../Contexts/RenderContext'
import { useModalStatus } from '../../Contexts/ModalContext'
import { toast } from 'react-toastify'

interface textAreaProps {
  placeholder: string
  scrollHeight?: number
  questionId?: number
}

// for 回答問題 textArea
export function TextAreaAnswer(props: textAreaProps) {
  const [value, setValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const reRender = useRender()

  if (props.scrollHeight) {
    autoSizeTextArea(textAreaRef.current, value, props.scrollHeight)
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setValue(value)
  }

  function onSubmitClick(e: React.MouseEvent) {
    e.preventDefault()

    if (!value.trim()) {
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
    if (value.trim()) {
      questionAPI
        .postAnswers(props.questionId, value)
        .then(() => {
          reRender?.handleRerender(true)
          setValue('')
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
        value={value}
      />
      {value && (
        <Button
          type="button"
          style="button-answer-submit"
          onClick={onSubmitClick}
          disabled={false}
        >
          <p>送出</p>
        </Button>
      )}
    </>
  )
}

export function TextAreaAsk(props: textAreaProps) {
  const useSetModal = useModalStatus()
  const reRender = useRender()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState({ title: '', content: '' })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setTitle(e.target.value)
    if (!value) {
      setErrorMessage({ ...errorMessage, title: '標題不得為空' })
    } else if (value) {
      setErrorMessage({ ...errorMessage, title: '' })
    }
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    if (!value) {
      setErrorMessage({ ...errorMessage, content: '內容不得為空' })
    } else if (value) {
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

    if (title && content) {
      questionAPI
        .postQuestion(title, content)
        .then(() => {
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
        onChange={handleInputChange}
      />
      {errorMessage.title && (
        <div className={style['title-error']}>
          <p>標題不得為空</p>
        </div>
      )}
      <textarea
        name="questionContent"
        className={`${style['textareaAsk']} ${style['scrollbar']}`}
        onChange={handleTextAreaChange}
        placeholder={props.placeholder}
        value={content}
      />
      {errorMessage.content && (
        <div className={style['content-error']}>
          <p>內容不得為空</p>
        </div>
      )}
      <Button
        type="button"
        style={
          title && content ? 'button-ask-submit' : 'button-ask-submit-disable'
        }
        onClick={onSubmitClick}
        disabled={false}
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
