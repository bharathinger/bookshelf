/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client'

const getUser = async () => {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  const [user, setUser] = React.useState(null)
  const login = form => auth.login(form).then(userData => setUser(userData))
  const register = form =>
    auth.register(form).then(userData => setUser(userData))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  React.useEffect(() => {
    getUser().then(userData => setUser(userData))
  }, [])

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
