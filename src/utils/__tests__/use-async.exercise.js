
import { renderHook, act } from '@testing-library/react'
import { useAsync } from '../hooks'


function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  })
  return { promise, resolve, reject }
}


test('calling run with a promise which resolves', async () => {
  const { promise, resolve } = deferred()
  const { result } = renderHook(() => useAsync())
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function)
  })
  let p
  act(() => { p = result.current.run(promise) })
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'pending',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function)
  })
  const resolvedValue = Symbol('resolved value')
  await act(async () => {
    resolve(resolvedValue)
    await p
  })


  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: resolvedValue,
    run: expect.any(Function),
    reset: expect.any(Function)
  })
})
// 🐨 get a promise and resolve function from the deferred utility

// 🐨 use renderHook with useAsync to get the result
// 🐨 assert the result.current is the correct default state

// 🐨 call `run`, passing the promise
//    (💰 this updates state so it needs to be done in an `act` callback)
// 🐨 assert that result.current is the correct pending state

// 🐨 call resolve and wait for the promise to be resolved
//    (💰 this updates state too and you'll need it to be an async `act` call so you can await the promise)
// 🐨 assert the resolved state

// 🐨 call `reset` (💰 this will update state, so...)
// 🐨 assert the result.current has actually been reset

test.todo('calling run with a promise which rejects')
// 🐨 this will be very similar to the previous test, except you'll reject the
// promise instead and assert on the error state.
// 💰 to avoid the promise actually failing your test, you can catch
//    the promise returned from `run` with `.catch(() => {})`

test.todo('can specify an initial state')
// 💰 useAsync(customInitialState)

test.todo('can set the data')
// 💰 result.current.setData('whatever you want')

test.todo('can set the error')
// 💰 result.current.setError('whatever you want')

test.todo('No state updates happen if the component is unmounted while pending')
// 💰 const {result, unmount} = renderHook(...)
// 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)

test.todo('calling "run" without a promise results in an early error')
