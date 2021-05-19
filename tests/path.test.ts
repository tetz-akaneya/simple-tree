import { basename, filename, incrementalKeys, join, keys, toRelative } from '../src/path';

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

  test('multiple keys and join', () => {
    expect(join([keys('/'), keys('bar')].flat())).toBe('/bar')
    expect(join([keys('/hoge'), keys('bar')].flat())).toBe('/hoge/bar')
    expect(join([keys('/hoge/foo'), keys('bar')].flat())).toBe('/hoge/foo/bar')
    expect(join([keys('hoge'), keys('bar')].flat())).toBe('hoge/bar')
  })
})

describe('basename', () => {
  test('basename', () => {
    expect(basename('/hoge/foo')).toBe('/hoge')
    expect(basename('/hoge')).toBe('/')
    expect(basename('/')).toBe('/')
    expect(basename('')).toBe('')
    expect(basename('  ')).toBe('')
  })
})

describe('filename', () => {
  test('filename', () => {
    expect(filename('/hoge/foo')).toBe('foo')
    expect(filename('/hoge')).toBe('hoge')
    expect(filename('/')).toBe('/')
    expect(filename('')).toBe('')
    expect(filename('  ')).toBe('')
  })
})

describe('incrementalKeys', () => {
  test('incrementalKeys', () => {
    expect(incrementalKeys('/hoge/foo')).toStrictEqual(['/', '/hoge', '/hoge/foo'])
    expect(incrementalKeys('/hoge')).toStrictEqual(['/', '/hoge'])
    expect(incrementalKeys('/')).toStrictEqual(['/'])
    expect(incrementalKeys('')).toStrictEqual([])
    expect(incrementalKeys('  ')).toStrictEqual([])
  })
})
