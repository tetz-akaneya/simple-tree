const isRoot = (path: string) => path === '/'
const isAbsolute = (path: string) => !path.startsWith('/')
const isRelative = (path: string) => !isAbsolute(path)
const keys = (path: string) => path.split('/')
const join = (keys: string[]) => trimDpl(keys.join('/'))
const trimDpl = (path: string) => path.replace(/\/+/g, '/')
const incrementalKeys = (path: string) => keys(path).map((_, idx, arr) => join(arr.slice(0, idx + 1)))
const getLastName = (path: string) => {
  if (path === '/') return '/'
  const keyList = keys(path)
  if (keyList.length === 0) return ''
  return keyList[keyList.length - 1]
}
const isParentPath = (path: string) => path === '..'
const isCurrentPath = (path: string) => path === '.'
const trimLast = (path: string) => path.endsWith('/') ? path.slice(0, path.length - 2) : path
const validate = (path: string): boolean => {
  const keys = path.split('/')
  if (keys.length === 0) return false
  return keys.slice(1).every(key => key !== '')
}

export {
  isRoot,
  isAbsolute,
  isRelative,
  keys,
  join,
  incrementalKeys,
  getLastName,
  isParentPath,
  isCurrentPath,
  trimLast,
  validate,
}
