export type CategoryKey = "frontend" | "backend" | "database" | `custom:${string}`

export type NodeShape = "rectangle" | "circle" | "diamond" | "hexagon"
export type EdgeStyle = "solid" | "dashed" | "dotted"

export interface Category {
  key: CategoryKey
  name: string
  color: string // hex or CSS var
}

export interface NodeData {
  label: string
  category: CategoryKey
  notes?: string
  shape?: NodeShape
  [key: string]: unknown // Allow additional properties
}

import type { Edge } from "@xyflow/react"
export interface CustomEdge extends Edge {
  edgeStyle?: EdgeStyle // Use a different property name to avoid conflict
}

export interface GraphState {
  nodes: import("@xyflow/react").Node<NodeData>[]
  edges: CustomEdge[]
  categories: Record<CategoryKey, Category>
  selectedNodeId: string | null
  defaultNodeShape: NodeShape
  defaultEdgeStyle: EdgeStyle
  addNode: (cat: CategoryKey) => void
  updateNode: (id: string, patch: Partial<NodeData>) => void
  addCategory: (name: string, color: string) => CategoryKey
  setSelectedNode: (id: string | null) => void
  setDefaultNodeShape: (shape: NodeShape) => void
  setDefaultEdgeStyle: (style: EdgeStyle) => void
  onNodesChange: (changes: any[]) => void
  onEdgesChange: (changes: any[]) => void
  onConnect: (connection: any) => void
  // load/save
  save: () => void
  load: (json: string) => void
  reset: () => void
}
