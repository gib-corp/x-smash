import { createContext, useState, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

export type CursorType = 'default' | 'hold' | 'drop'

export interface RelativeOffset {
    x: number | null;
    y: number | null;
}

export interface Coordinates { 
    x: number;
    y: number;
}

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;

  selectedCharacterId: string | null;
  setSelectedCharacterId: (id: string | null) => void

  lockedRelativeOffset: RelativeOffset;
  setLockedRelativeOffset: (offset: RelativeOffset) => void;

  clickTargetPosition: Coordinates | null; 
  setClickTargetPosition: (pos: Coordinates | null) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  setCursorType: () => {},
  selectedCharacterId: null, 
  setSelectedCharacterId: () => {},
  lockedRelativeOffset: { x: null, y: null }, 
  setLockedRelativeOffset: () => {},
  clickTargetPosition: null, 
  setClickTargetPosition: () => {}
})

interface CursorProviderProps {
  children: ReactNode
}

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)
  const [lockedRelativeOffset, setLockedRelativeOffset] = useState<RelativeOffset>({ x: null, y: null })
  const [clickTargetPosition, setClickTargetPosition] = useState<Coordinates | null>(null)

  const contextValue = useMemo(() => ({
    cursorType,
    setCursorType,
    selectedCharacterId,
    setSelectedCharacterId,
    lockedRelativeOffset, 
    setLockedRelativeOffset,
    clickTargetPosition, 
    setClickTargetPosition,
  }), [
    cursorType,
    selectedCharacterId,
    lockedRelativeOffset,
    clickTargetPosition
  ]);

  return (
    <CursorContext.Provider value={contextValue}>
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