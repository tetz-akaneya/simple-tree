import { parse, stringify } from 'flatted';
import { genTree, getDirectChildByKey, setDirectChildByKey, splitPath } from "../src/index"

const input = () => [
  {
    path: '/',
    content: {},
    children: [],
  },
  {
    path: '/foo1',
    content: {},
    children: [],
  },
  {
    path: '/foo2',
    content: {},
    children: [],
  },
  {
    path: '/foo1/bar2',
    content: {},
    children: [],
  },
]

const connChildren = (parent: any, children: any[]) => {
  parent.children = children
  children.forEach(child => {
    child.parent = parent
  })
  return parent
}

const output = () => {
  const data = JSON.parse(JSON.stringify(input()))
  const [
    root,
    foo1,
    foo2,
    foo1foo2,
  ] = data
  return connChildren(root, [
    connChildren(foo1, [
      connChildren(foo1foo2, []),
    ]),
    connChildren(foo2, []),
  ])
}

describe('splitPath', () => {
  it('splitPath', () => {
    expect(splitPath('/')).toStrictEqual([''])
    expect(splitPath('/hoge')).toStrictEqual(['hoge'])
    expect(splitPath('/hoge/hoge')).toStrictEqual(['hoge', 'hoge'])
  })
})

describe('getDirectChildByKey', () => {
  describe('on root', () => {
    it('found', () => {
      const root = {
        path: '/',
      }
      const hoge1 = {
        path: '/hoge1'
      }
      const input = connChildren(root, [connChildren(hoge1, [])])
      expect(getDirectChildByKey(
        input,
        'hoge1'
      )).toStrictEqual(input.children[0])
    })
  })

  describe('on nested', () => {
    it('found', () => {
      const hoge1 = {
        path: '/hoge1',
      }
      const hoge2 = {
        path: '/hoge1/hoge2'
      }
      const input = connChildren(hoge1, [connChildren(hoge2, [])])
      expect(getDirectChildByKey(
        input,
        'hoge2'
      )).toStrictEqual(input.children[0])
    })

    it('not found', () => {
      const hoge1 = {
        path: '/hoge1',
      }
      const hoge2 = {
        path: '/hoge1/hoge2'
      }
      const input = connChildren(hoge1, [connChildren(hoge2, [])])
      expect(getDirectChildByKey(
        input,
        'hoge1'
      )).toBeUndefined()
    })
  })
})

describe('setDirectChildByKey', () => {
  it('setDirectChildByKey', () => {
    const data = output()
    const value = { path: '/hoge3', children: [] }
    setDirectChildByKey(data, 'hoge3', value)
    expect(getDirectChildByKey(data, 'hoge3')).toBe(value)
  })
})
