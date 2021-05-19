import { filename, incrementalKeys, isAbsolute, isRelative, isRoot, join, keys, toRelative } from "./path"

export const genTree = <SimpleNode>(arg: {
  nodes: SimpleNode[]
  isRoot: (node: SimpleNode) => boolean
  getPathFromNode: (node: SimpleNode) => string
}) => {
  const root = arg.nodes.find(n => arg.isRoot(n))
  arg.nodes
    .filter(n => !arg.isRoot(n))
    .forEach(node => {
      setNodeByPath({
        parent: root,
        path: toRelative('/', arg.getPathFromNode(node)),
        value: node,
      })
    })

  return root
}

export const splitPath = (path: string) => {
  return path.split('/').slice(1)
}

export const getNodeName = (path: string) => {
  const keys = path.split('/').slice(1)
  return keys.length === 0 ? '/' : keys[keys.length - 1]
}

export const getDirectChildByKey = (parent: any, key: string) => {
  return parent.children.find((child: any) => getNodeName(child.path) === key)
}

export const getDirectChildIndexByKey = (parent: any, key: string) => {
  return parent.children.findIndex((item: any) => item === getDirectChildByKey(parent, key))
}

export const setDirectChildByKey = (parent: any, key: string, value: any) => {
  const index = getDirectChildIndexByKey(parent, key)
  if (index !== -1) {
    parent.children.splice(index, 1, value)
  } else {
    parent.children.push(value)
  }
}

export const getNodeByPath = (parent: any, path: string, value: any) => {
  const increasingKeys = incrementalKeys(path)
  increasingKeys.reduce((acc, incrementalKey, idx) => {
    const item = getDirectChildByKey(acc, incrementalKey)
    if (item) return item
    const nextChild = (() => {
      if (idx !== increasingKeys.length - 1) {
        return {
          path: join([...keys(parent.path), ...keys(incrementalKey)]),
          children: [],
        }
      } else {
        value.path = join([...keys(parent.path), ...keys(incrementalKey)])
        return value
      }
    })()
    setDirectChildByKey(acc, filename(incrementalKey), nextChild)
    return nextChild
  }, parent)
}

export const setNodeByPath = (arg: {
  parent: any
  path: string
  value: any
}) => {
  const path = ((path: string) => {
    if (isAbsolute(path)) {
      if (!isRoot(arg.parent)) {
        console.log('unable to set without supplying root node at absolute path')
      }
      return toRelative('/', path)
    }
    return path
  })(arg.path)
  const increasingKeys = incrementalKeys(path)
  increasingKeys.reduce((acc, incrementalKey, idx) => {
    const item = getDirectChildByKey(acc, incrementalKey)
    if (item) return item
    const nextChild = (() => {
      if (idx !== increasingKeys.length - 1) {
        return {
          path: join([...keys(arg.parent.path), ...keys(incrementalKey)]),
          children: [],
        }
      } else {
        arg.value.path = join([...keys(arg.parent.path), ...keys(incrementalKey)])
        return arg.value
      }
    })()
    setDirectChildByKey(acc, filename(incrementalKey), nextChild)
    return nextChild
  }, arg.parent)
}
