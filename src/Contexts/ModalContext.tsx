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

  useEffect(() => {
    if (modalStatus !== 'initial') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalStatus]);

  function handleSetModal(modal: string) {
    setModalStatus(modal)
  }

  const modalContextData: modalContextData = {
    handleSetModal,
    modalStatus: modalStatus,
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
