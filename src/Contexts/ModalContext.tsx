import React, { createContext, useContext, useEffect, useState } from 'react'

interface modalContextData {
  handleSetModal: (modal: string) => void
  modalStatus: string
}

const modalContext = createContext<modalContextData | undefined>(undefined)

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalStatus, setModalStatus] = useState('initial')
  const [currentScroll, setCurrentScroll] = useState(0)

  useEffect(() => {
    if (modalStatus !== 'initial') {
      setCurrentScroll(window.pageYOffset)
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = ''
      window.scrollTo(0, currentScroll)
    }
  }, [modalStatus])

  function handleSetModal(modal: string) {
    setModalStatus(modal)
  }

  const modalContextData: modalContextData = {
    handleSetModal,
    modalStatus,
  }

  return (
    <modalContext.Provider value={modalContextData}>
      {children}
    </modalContext.Provider>
  )
}

export function useModalStatus() {
  return useContext(modalContext)
}
