const isRoot = (path: string) => path === '/'
const isAbsolute = (path: string) => !path.startsWith('/')
const isRelative = (path: string) => !isAbsolute(path)
const keys = (path: string) => {
  return path
    .split('/')
    .filter((key, idx) => {
      return key !== '' || idx === 0
    })
}
const join = (keys: string[]) => {
  keys.join('/')
}
const incrementalKeys = (path: string) => keys(path).map((_, idx, arr) => join(arr.slice(0, idx)))
const getLastName = (path: string) => {
  if (path === '/') return '/'
  const keyList = keys(path)
  if (keyList.length === 0) return
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
  isParentPath,
  isCurrentPath,
  trimLast,
  validate,
}
