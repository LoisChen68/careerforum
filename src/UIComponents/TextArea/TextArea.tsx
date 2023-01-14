import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import style from './TextArea.module.scss'
import questionAPI from '../../request/API/questionAPI'
import { useRender } from '../../Contexts/RenderContext'

interface textAreaProps {
  placeholder: string
  scrollHeight?: number
  questionId?: number
}

// for 回答問題 textArea
export function TextAreaAnswer(props: textAreaProps) {
  const [value, setValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const token = localStorage.getItem('token') || ""
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
    questionAPI
      .postAnswers(token, props.questionId, value)
      .then(res => {
        console.log(res)
        reRender?.handleRerender(true)
      })
      .catch(err => { console.log(err) })
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
  const [value, setValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setValue(value)
  }

  function onSubmitClick(e: React.MouseEvent) {
    e.preventDefault()
  }

  return (
    <>
      <textarea
        className={`${style['textareaAsk']} ${style['scrollbar']}`}
        onChange={handleChange}
        placeholder={props.placeholder}
        value={value}
      />
      <Button
        type="button"
        style={value ? 'button-ask-submit' : 'button-ask-submit-disable'}
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
