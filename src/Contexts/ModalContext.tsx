import React, { createContext, useContext, useState } from "react"


interface modalContextData {
  handleSetModal: (modal: string) => void
  modalStatus: string
}

const modalContext = createContext<modalContextData | undefined>(undefined)

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [modalStatus, setModalStatus] = useState('')

  function handleSetModal(modal: string) {
    setModalStatus(modal)
  }

  const modalContextData: modalContextData = {
    handleSetModal,
    modalStatus: modalStatus
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