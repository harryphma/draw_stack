"use client"

import { useGraphStore } from "@/store/graphStore"
import { useState, useEffect } from "react"

export default function Inspector() {
  const {
    nodes,
    selectedNodeId,
    updateNode,
    categories,
    defaultNodeShape,
    defaultEdgeStyle,
    setDefaultNodeShape,
    setDefaultEdgeStyle,
  } = useGraphStore()
  const [localLabel, setLocalLabel] = useState("")
  const [localNotes, setLocalNotes] = useState("")
  const [localCategory, setLocalCategory] = useState("")

  const selectedNode = nodes.find((node) => node.id === selectedNodeId)

  useEffect(() => {
    if (selectedNode) {
      setLocalLabel(selectedNode.data.label)
      setLocalNotes(selectedNode.data.notes || "")
      setLocalCategory(selectedNode.data.category)
    } else {
      setLocalLabel("")
      setLocalNotes("")
      setLocalCategory("")
    }
  }, [selectedNode])

  const handleUpdate = (field: string, value: string) => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, { [field]: value })
    }
  }

  if (!selectedNode) {
    return (
      <div className="inspector">
        <h3>Inspector</h3>

        <div className="form-group">
          <h4 style={{ marginBottom: 12, color: "var(--ds-text)" }}>Project Settings</h4>

          <label>Default Node Shape</label>
          <select value={defaultNodeShape} onChange={(e) => setDefaultNodeShape(e.target.value as any)}>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="diamond">Diamond</option>
            <option value="hexagon">Hexagon</option>
          </select>
        </div>

        <div className="form-group">
          <label>Default Connection Style</label>
          <select value={defaultEdgeStyle} onChange={(e) => setDefaultEdgeStyle(e.target.value as any)}>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        <p style={{ color: "var(--ds-text)", opacity: 0.6, marginTop: 20 }}>Select a node to edit its properties</p>
      </div>
    )
  }

  return (
    <div className="inspector">
      <h3>Inspector</h3>

      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={localLabel}
          onChange={(e) => {
            setLocalLabel(e.target.value)
            handleUpdate("label", e.target.value)
          }}
          placeholder="Node label"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={localCategory}
          onChange={(e) => {
            setLocalCategory(e.target.value)
            handleUpdate("category", e.target.value)
          }}
        >
          {Object.entries(categories).map(([key, category]) => (
            <option key={key} value={key}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Node Shape</label>
        <select
          value={selectedNode.data.shape || defaultNodeShape}
          onChange={(e) => handleUpdate("shape", e.target.value)}
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="diamond">Diamond</option>
          <option value="hexagon">Hexagon</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={localNotes}
          onChange={(e) => {
            setLocalNotes(e.target.value)
            handleUpdate("notes", e.target.value)
          }}
          placeholder="Add notes about this node..."
        />
      </div>

      <div style={{ marginTop: 20, padding: 12, background: "#f9fafb", borderRadius: 6 }}>
        <small style={{ color: "var(--ds-text)", opacity: 0.7 }}>Node ID: {selectedNode.id}</small>
      </div>
    </div>
  )
}
