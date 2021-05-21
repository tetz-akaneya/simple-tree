import toposort from '../src/dag'
import * as Rx from 'rxjs'

const bigNum = 10 ** 6
const alphabetNodes = 'abcdefghij'.split('')
const alphabetEdges: [string, string][] = [
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
]

const numberNodes = (() => {
  const array: number[] = []
  for (let index = 0; index < bigNum; index++) {
    array.push(index)
  }
  return array
})()

const numberEdges: [number, number][] = numberNodes.flatMap((_, idx) => {
  const isLarger = idx > bigNum - 3
  if (!isLarger)
    return [[idx, idx + 1], [idx, idx + 2], [idx, idx + 3]]
  return []
})

const nodes = alphabetNodes
const edges = alphabetEdges

describe('dag', () => {
  test('dag success', () => {
    Rx.of(toposort({
      nodes,
      getChildren: node => edges.filter(([from, _]) => from === node).map(([_, to]) => to)
    }))
      .subscribe(result =>
        expect(edges.every(([from, to]) => result.indexOf(from) < result.indexOf(to))).toBe(true)
      )
  })

  test('dag fail', () => {
    expect(() => {
      toposort({
        nodes: [alphabetEdges, ['e', 'a']].flat(),
        getChildren: node => edges.filter(([from, _]) => from === node).map(([_, to]) => to)
      })
    }).toThrowError()
  })
})
