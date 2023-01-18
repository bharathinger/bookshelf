import { formatDate } from "utils/misc";


test('formats date to look nice', () => {
  expect(formatDate(new Date('January 24, 2023'))).toBe('January 23')
})
