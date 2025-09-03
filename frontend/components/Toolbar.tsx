"use client"

import { useGraphStore } from "@/store/graphStore"
import { PRESETS } from "@/lib/nodePresets"
import { useState } from "react"

export default function Toolbar() {
  const { addNode, addCategory, reset, save } = useGraphStore()
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customName, setCustomName] = useState("")
  const [customColor, setCustomColor] = useState("#6b7280")

  const handleAddCustomCategory = () => {
    if (customName.trim()) {
      const categoryKey = addCategory(customName.trim(), customColor)
      addNode(categoryKey)
      setCustomName("")
      setCustomColor("#6b7280")
      setShowCustomForm(false)
    }
  }

  return (
    <div className="toolbar">
      <h3>Add Nodes</h3>

      <div className="node-buttons">
        {Object.entries(PRESETS).map(([key, preset]) => (
          <button key={key} className="node-button" onClick={() => addNode(key as any)}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: preset.color,
              }}
            />
            {preset.name}
          </button>
        ))}

        <button className="node-button" onClick={() => setShowCustomForm(!showCustomForm)}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: "#6b7280",
            }}
          />
          Custom
        </button>
      </div>

      {showCustomForm && (
        <div style={{ marginTop: 16, padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={handleAddCustomCategory}>
              Add
            </button>
            <button className="btn" onClick={() => setShowCustomForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="file-actions">
        <h3>Project</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="btn" onClick={reset}>
            New Project
          </button>
          <button className="btn" onClick={save}>
            Save Project
          </button>
        </div>
      </div>
    </div>
  )
}
