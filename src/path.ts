const isRoot = (path: string) => path === '/'
const isAbsolute = (path: string) => !path.startsWith('/')
const isRelative = (path: string) => !isAbsolute(path)
const keys = (path: string) => path === '/' ? [''] : path.split('/')
const join = (keys: string[]) => {
  if (keys.length === 0) return ''
  const first = keys[0] === '' ? [''] : []
  const rmEmpty = keys.filter(key => key !== '')
  if (rmEmpty.length === 0) return '/'
  return [first, rmEmpty].flat().join('/')
}
const trimDpl = (path: string) => path.replace(/\/+/g, '/')
const incrementalKeys = (path: string) => keys(path).map((_, idx, arr) => join(arr.slice(0, idx + 1)))
const filename = (path: string) => {
  if (path === '/') return '/'
  const keyList = keys(path)
  if (keyList.length === 0) return ''
  return keyList[keyList.length - 1]
}
const basename = (path: string) => {
  const keyList = keys(path).slice()
  const index = keyList.length - 1 > 0 ? keyList.length - 1 : 1
  return join(keyList.slice(0, index))
}
const isParentPath = (path: string) => path === '..'
const isCurrentPath = (path: string) => path === '.'
const trimLast = (path: string) => path.endsWith('/') ? path.slice(0, path.length - 2) : path
const validate = (path: string): boolean => {
  const keys = path.split('/')
  if (keys.length === 0) return false
  return keys.slice(1).every(key => key !== '')
}
const toRelative = (absPathBase: string, absPathTarget: string) => {
  return join(keys(absPathTarget).slice(keys(absPathBase).length))
}

export {
  isRoot,
  isAbsolute,
  isRelative,
  keys,
  join,
  incrementalKeys,
  filename,
  basename,
  isParentPath,
  isCurrentPath,
  trimLast,
  validate,
  toRelative,
}
