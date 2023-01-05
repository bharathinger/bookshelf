/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'

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
  const {
    data: user,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    setData,
    error,
    run,
  } = useAsync()
  const login = form => auth.login(form).then(userData => setData(userData))
  const register = form =>
    auth.register(form).then(userData => setData(userData))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  React.useEffect(() => {
    run(getUser())
  }, [run])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div>
        <p>Oh No. Looks like an error.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
