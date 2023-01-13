// 🐨 create and export a React context variable for the AuthContext
// 💰 using React.createContext
import { createContext, useContext } from "react";

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a Context Provider ')
  }
  return context
}
export { AuthContext, useAuth }