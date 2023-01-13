// 🐨 create and export a React context variable for the AuthContext
// 💰 using React.createContext
import React, { createContext, useContext } from "react";
import * as auth from 'auth-provider'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/hooks'
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib'
import { queryCache } from 'react-query'

const AuthContext = createContext();

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', { token })
    user = data.user
  }

  return user
}

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const value = { user, login, register, logout }
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a Auth Provider ')
  }
  return context
}
export { AuthProvider, useAuth }