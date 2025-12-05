import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'

export type CursorType = 'default' | 'hold' | 'drop'

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  setCursorType: () => {},
})

interface CursorProviderProps {
  children: ReactNode
}

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [cursorType, setCursorType] = useState<CursorType>('default')

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor doit être utilisé à l\'intérieur d\'un CursorProvider')
  }
  return context
}