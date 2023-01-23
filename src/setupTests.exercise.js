// 🐨 enable jest-dom by importing `@testing-library/jest-dom`
import { server } from 'test/server'
import '@testing-library/jest-dom'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
