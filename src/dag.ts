
/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

const toposort: <T = string>(
  nodes: T[],
  edges: [T, T][],
) => T[] = (nodes, edges) => {
  type T = typeof nodes[0]
  let cursor = nodes.length
  let currentNodeId = cursor
  const sorted = new Array(cursor)
  const visited: { [index: number]: boolean } = {}
  const outgoingEdges = makeOutgoingEdges(edges)
  const nodesHash = makeNodesHash(nodes)

  // check for unknown nodes
  edges.forEach(function (edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
    }
  })

  const visit = (node: T, idx: number, predecessors: Set<T>) => {
    if (predecessors.has(node)) {
      throw new Error('Cyclic dependency' + tryStringify(node))
    }

    if (!nodesHash.has(node)) {
      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: ' + JSON.stringify(node))
    }

    if (visited[idx]) return;
    visited[idx] = true

    const outgoingSet = outgoingEdges.get(node) || new Set<T>()
    const outgoingArr = Array.from(outgoingSet)

    if (idx = outgoingArr.length) {
      predecessors.add(node)
      do {
        var child = outgoingArr[--idx]
        visit(child, nodesHash.get(child)!, predecessors)
      } while (idx)
      predecessors.delete(node)
    }

    sorted[--cursor] = node
  }

  while (currentNodeId--) {
    if (!visited[currentNodeId]) visit(nodes[currentNodeId], currentNodeId, new Set())
  }

  return sorted
}

const uniqueNodes = <T>(arr: [T, T][]): T[] => {
  var res = new Set<T>()
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    res.add(edge[0])
    res.add(edge[1])
  }

  return Array.from(res)
}

const makeOutgoingEdges = <T>(edgeList: [T, T][]): Map<T, Set<T>> => {
  const edgeMap = new Map<T, Set<T>>()
  edgeList.forEach((edge) => {
    if (!edgeMap.has(edge[0])) edgeMap.set(edge[0], new Set<T>())
    if (!edgeMap.has(edge[1])) edgeMap.set(edge[1], new Set<T>())

    edgeMap.get(edge[0])!.add(edge[1])
  })
  return edgeMap
}

const makeNodesHash = <T>(arr: T[]): Map<T, number> => {
  const res = new Map()
  arr.forEach((node, idx) => res.set(node, idx))
  return res
}

const defaultExport: <T = string>(edges: [T, T][]) => T[] = edges => {
  return toposort(uniqueNodes(edges), edges)
}

const tryStringify = (obj: any) => {
  try {
    return JSON.stringify(obj)
  } catch {
    return ''
  }
}

export default defaultExport
