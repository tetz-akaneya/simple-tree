import { incrementalKeys, isRoot, keys } from "./path"

export const genTree = <SimpleNode>(arg: {
  nodes: SimpleNode[]
  getPathFromNode: (node: SimpleNode) => string
}) => {
  const result = {}
  arg.nodes.forEach(node => {
    setDirectChildByKey(result, arg.getPathFromNode(node), node)
  })
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

export const setChildByRelativePath = (parent: any, path: string, value: any) => {
  if (isRoot(path)) return
  incrementalKeys(path).reduce((acc, incrementalKey) => {
    const item = getDirectChildByKey(acc, key)
    if (item) return item
    setDirectChildByKey(acc, key, {
      path: path
    })
  }, parent)
}
