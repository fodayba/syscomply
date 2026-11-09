import { createContext, use } from 'react'

export const DemoContext = createContext<() => void>(() => {})

/** Returns a function that opens the "Book a demo" dialog. */
export const useOpenDemo = () => use(DemoContext)
