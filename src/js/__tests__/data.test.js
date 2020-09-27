import Data from '../data.js';

test('is data', () => {
  const expected = { dataBase: [], dataEvent: [] };
  expect(new Data([])).toEqual(expected);
});
