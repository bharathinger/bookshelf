import { server, rest } from 'test/server'
import { client } from '../api-client'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.restoreHandlers())
const apiURL = process.env.REACT_APP_API_URL


test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }
  server.use(rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
    return res(ctx.json(mockResult))
  }))
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const endpoint = 'test-endpoint'
  const token = 'FAKE_TOKEN';
  const mockResult = { mockValue: 'VALUE' }
  let request
  server.use(rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
    request = req;
    return res(ctx.json(mockResult))
  }))
  await client(endpoint, { token })
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)

})
// 🐨 create a fake token (it can be set to any string you want)
// 🐨 create a "request" variable with let
// 🐨 create a server handler to handle a test request you'll be making
// 🐨 inside the server handler, assign "request" to "req" so we can use that
//     to assert things later.
//     💰 so, something like...
//       async (req, res, ctx) => {
//         request = req
//         ... etc...
//
// 🐨 call the client with the token (note that it's async)
// 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)

test('allows for config overrides', () => { })
// 🐨 do a very similar setup to the previous test
// 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
// 🐨 call the client with the endpoint and the custom config
// 🐨 verify the request had the correct properties

test(
  'when data is provided, it is stringified and the method defaults to POST', () => { }
)
// 🐨 create a mock data object
// 🐨 create a server handler very similar to the previous ones to handle the post request
//    💰 Use rest.post instead of rest.get like we've been doing so far
// 🐨 call client with an endpoint and an object with the data
//    💰 client(endpoint, {data})
// 🐨 verify the request.body is equal to the mock data object you passed
