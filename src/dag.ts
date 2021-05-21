
/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

const toposort: <T = string>(arg: {
  nodes: T[],
  getChildren: (node: T) => T[]
}) => T[] = (arg) => {
  const nodes = uniqueNodes(arg.nodes)
  const { getChildren } = arg

  type T = ReturnType<typeof getChildren>[number]
  let cursor = nodes.length
  const sorted = new Array(cursor)
  const visited = sorted.map(() => false)
  const edges: [T, T][] = nodes
    .flatMap(node =>
      getChildren(node).map(child => [node, child] as [T, T])
    )
  const outgoingEdges = makeOutgoingEdges(edges)
  const nodesHash = makeNodesHash(nodes)

  // check for unknown nodes
  edges.forEach(function ([from, to]) {
    if (!nodesHash.has(from) || !nodesHash.has(to)) {
      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
    }
  })

  const visit = (node: T, idx: number, predecessors: Set<T>) => {
    if (predecessors.has(node)) {
      const result: string[] = []
      predecessors.forEach(node => {
        result.push(tryStringify(node))
      })
      result.push(tryStringify(node))
      throw new Error('Cyclic dependency: ' + result.join('\n -> '))
    }

    if (!nodesHash.has(node)) {
      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: ' + JSON.stringify(node))
    }

    if (visited[idx]) return
    visited[idx] = true

    const outgoingSet = outgoingEdges.get(node) || new Set<T>()
    const outgoingArr = Array.from(outgoingSet)

    if (outgoingArr.length) {
      predecessors.add(node)
      getChildren(node).forEach(child => {
        visit(child, nodesHash.get(child)!, predecessors)
      })
      predecessors.delete(node)
    }

    sorted[--cursor] = node
  }

  nodes.forEach((node) => {
    const currentNodeId = nodesHash.get(node)!
    if (!visited[currentNodeId]) visit(node, currentNodeId, new Set())
  })

  return sorted
}

const uniqueNodes = <T>(nodes: T[]): T[] => {
  const res = new Set<T>()
  nodes.forEach(node => {
    res.add(node)
  })

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
  const res = new Map<T, number>()
  arr.forEach((node, idx) => res.set(node, idx))
  return res
}

const tryStringify = (obj: any) => {
  try {
    return JSON.stringify(obj)
  } catch {
    return ''
  }
}

export default toposort
