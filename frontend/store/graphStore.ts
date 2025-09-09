import { create } from "zustand"
import { type Node, addEdge, applyNodeChanges, applyEdgeChanges, type Connection } from "@xyflow/react"
import type { GraphState, NodeData, Category, CategoryKey, NodeShape, EdgeStyle, CustomEdge } from "@/types/graph"
import { PRESETS } from "@/lib/nodePresets"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/storage"

const STORAGE_KEY = "draw-stack-graph"

// Generate unique ID for nodes
const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// Initial categories from presets
const initialCategories: Record<CategoryKey, Category> = {
  frontend: PRESETS.frontend,
  backend: PRESETS.backend,
  database: PRESETS.database,
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  categories: initialCategories,
  selectedNodeId: null,
  defaultNodeShape: "rectangle" as NodeShape,
  defaultEdgeStyle: "solid" as EdgeStyle,
  isHydrated: false,

  hydrate: () => {
    if (typeof window !== "undefined" && !get().isHydrated) {
      const savedData = loadFromLocalStorage(STORAGE_KEY)
      if (savedData) {
        set((state) => ({
          ...state,
          nodes: savedData.nodes || [],
          edges: savedData.edges || [],
          categories: { ...initialCategories, ...(savedData.categories || {}) },
          defaultNodeShape: savedData.defaultNodeShape || "rectangle",
          defaultEdgeStyle: savedData.defaultEdgeStyle || "solid",
          isHydrated: true,
        }))
      } else {
        set((state) => ({ ...state, isHydrated: true }))
      }
    }
  },

  addNode: (category: CategoryKey) => {
    const id = generateId()
    const categoryInfo = get().categories[category]
    const { defaultNodeShape } = get()

    const newNode: Node<NodeData> = {
      id,
      type: "custom",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: categoryInfo?.name || "New Node",
        category,
        notes: "",
        shape: defaultNodeShape,
      },
    }

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }))

    // Auto-save after adding node
    setTimeout(() => get().save(), 100)
  },

  updateNode: (id: string, patch: Partial<NodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...patch } } : node)),
    }))

    // Auto-save after updating node
    setTimeout(() => get().save(), 100)
  },

  addCategory: (name: string, color: string): CategoryKey => {
    const key: CategoryKey = `custom:${name.toLowerCase().replace(/\s+/g, "-")}`
    const category: Category = { key, name, color }

    set((state) => ({
      categories: {
        ...state.categories,
        [key]: category,
      },
    }))

    return key
  },

  setSelectedNode: (id: string | null) => {
    set({ selectedNodeId: id })
  },

  setDefaultNodeShape: (shape: NodeShape) => {
    set({ defaultNodeShape: shape })
  },

  setDefaultEdgeStyle: (style: EdgeStyle) => {
    set({ defaultEdgeStyle: style })
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }))

    // Auto-save after node changes
    setTimeout(() => get().save(), 100)
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }))

    // Auto-save after edge changes
    setTimeout(() => get().save(), 100)
  },

  onConnect: (connection: Connection) => {
    const { defaultEdgeStyle } = get()

    const newEdge: CustomEdge = {
      ...connection,
      id: `edge_${Date.now()}`,
      edgeStyle: defaultEdgeStyle,
    }

    set((state) => ({
      edges: addEdge(newEdge, state.edges),
    }))

    // Auto-save after connecting
    setTimeout(() => get().save(), 100)
  },

  save: () => {
    const state = get()
    const dataToSave = {
      nodes: state.nodes,
      edges: state.edges,
      categories: state.categories,
      defaultNodeShape: state.defaultNodeShape,
      defaultEdgeStyle: state.defaultEdgeStyle,
    }
    saveToLocalStorage(STORAGE_KEY, dataToSave)
  },

  load: (json: string) => {
    try {
      const data = JSON.parse(json)
      set({
        nodes: data.nodes || [],
        edges: data.edges || [],
        categories: { ...initialCategories, ...(data.categories || {}) },
        selectedNodeId: null,
        defaultNodeShape: data.defaultNodeShape || "rectangle",
        defaultEdgeStyle: data.defaultEdgeStyle || "solid",
      })
    } catch (error) {
      console.error("Failed to load graph data:", error)
    }
  },

  reset: () => {
    set({
      nodes: [],
      edges: [],
      categories: initialCategories,
      selectedNodeId: null,
      defaultNodeShape: "rectangle",
      defaultEdgeStyle: "solid",
    })

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY)
  },
}))

// Auto-load from localStorage on initialization - moved to useEffect to prevent SSR issues
