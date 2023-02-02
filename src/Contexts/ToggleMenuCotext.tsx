import React, { createContext, useContext, useState } from 'react'

interface menuContextData {
  toggleMenu: string | null
  handleToggleMenu: (id: string | null) => void
}

const ToggleMenuContext = createContext<menuContextData | undefined>(undefined)

export default function ToggleMenuContextProvider({ children }: {
  children: React.ReactNode
}) {
  const [toggleMenu, setToggleMenu] = useState<string | null>(null)

  function handleToggleMenu(id: string | null) {
    setToggleMenu(id)
  }

  const menuContextData = {
    toggleMenu,
    handleToggleMenu,
  }

  return (
    <ToggleMenuContext.Provider value={menuContextData}>
      {children}
    </ToggleMenuContext.Provider>
  )
}

export function useMenuStatus() {
  return useContext(ToggleMenuContext)
}