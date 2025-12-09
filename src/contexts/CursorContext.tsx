import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'

export type CursorType = 'default' | 'hold' | 'drop'

export interface RelativeOffset {
    x: number | null;
    y: number | null;
}

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;

  selectedCharacterId: string | null;
  setSelectedCharacterId: (id: string | null) => void

  lockedRelativeOffset: RelativeOffset;
  setLockedRelativeOffset: (offset: RelativeOffset) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  setCursorType: () => {},
  selectedCharacterId: null, 
  setSelectedCharacterId: () => {},
  lockedRelativeOffset: { x: null, y: null }, 
  setLockedRelativeOffset: () => {},
})

interface CursorProviderProps {
  children: ReactNode
}

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)
  const [lockedRelativeOffset, setLockedRelativeOffset] = useState<RelativeOffset>({ x: null, y: null })

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        setCursorType,
        selectedCharacterId,
        setSelectedCharacterId,
        lockedRelativeOffset, 
        setLockedRelativeOffset
      }}
    >
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