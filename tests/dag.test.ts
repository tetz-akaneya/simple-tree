import toposort from '../src/dig'

// const edges: [string, string][] = [
//   ['1', '2'],
//   ['3', '1'],
// ]
const edges: [string, string][] = [
  ['a', 'b'],
  ['a', 'c'],
  ['b', 'd'],
  ['c', 'e'],
  ['c', 'd'],
  ['d', 'g'],
  ['e', 'd'],
  ['e', 'f'],
  ['f', 'g'],
  ['g', 'h'],
  ['i', 'c'],
  ['j', 'e'],
];

describe.only('dag', () => {
  test('dag', () => {
    expect(toposort(edges)).toStrictEqual([
      'a',
      'i',
      'j',
      'b',
      'c',
      'e',
      'd',
      'f',
      'g',
      'h'
    ])
  })
})
