import { createContext, useContext, useState } from 'react'

interface RenderContextData {
  isRender: boolean
  handleRerender: (value: boolean) => void
}

const RenderContext = createContext<RenderContextData | undefined>(undefined)

export default function RenderContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isRender, setIsRender] = useState(false)

  const handleRerender = (value: boolean) => {
    setIsRender(value)
  }

  const RenderContextData: RenderContextData = {
    isRender,
    handleRerender,
  }

  return (
    <RenderContext.Provider value={RenderContextData}>
      {children}
    </RenderContext.Provider>
  )
}

export function useRender() {
  return useContext(RenderContext)
}
