import { createContext, useContext } from 'react'

export const ThemeContext = createContext(true) // true = dark mode
export const useTheme = () => useContext(ThemeContext)
