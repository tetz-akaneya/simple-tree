import { join, keys, toRelative } from '../src/path';

describe('toRelative', () => {
  test('toRelative', () => {
    expect(toRelative('/', '/hoge')).toBe('hoge')
    expect(toRelative('/', '/hoge1/hoge2')).toBe('hoge1/hoge2')
    expect(toRelative('/hoge', '/hoge/hoge1/hoge2')).toBe('hoge1/hoge2')
  })
})

describe('keys and join', () => {
  test('keys and join', () => {
    expect(join(keys('/'))).toBe('/')
    expect(join(keys('/hoge'))).toBe('/hoge')
    expect(join(keys('/hoge/foo'))).toBe('/hoge/foo')
    expect(join(keys('hoge'))).toBe('hoge')
  })
})
