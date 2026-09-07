'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'

interface AdminSidebarContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
  close: () => void
  open: () => void
}

const AdminSidebarContext = createContext<AdminSidebarContextValue | undefined>(undefined)

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback(() => setIsOpen(true), [])

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggle,
      close,
      open,
    }),
    [isOpen, toggle, close, open]
  )

  return (
    <AdminSidebarContext.Provider value={value}>
      {children}
    </AdminSidebarContext.Provider>
  )
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext)
  if (!context) {
    return {
      isOpen: false,
      setIsOpen: () => {},
      toggle: () => {},
      close: () => {},
      open: () => {},
    }
  }
  return context
}

