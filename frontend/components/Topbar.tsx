"use client"

import { useGraphStore } from "@/store/graphStore"

export default function Topbar() {
  const { save, reset } = useGraphStore()

  const handleExport = () => {
    const state = useGraphStore.getState()
    const exportData = {
      nodes: state.nodes,
      edges: state.edges,
      categories: state.categories,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "draw-stack-graph.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            useGraphStore.getState().load(JSON.stringify(data))
          } catch (error) {
            alert("Invalid JSON file")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="topbar">
      <h1>Draw Stack</h1>
      <div className="topbar-actions">
        <button className="btn" onClick={reset}>
          New
        </button>
        <button className="btn" onClick={save}>
          Save
        </button>
        <button className="btn" onClick={handleImport}>
          Import
        </button>
        <button className="btn" onClick={handleExport}>
          Export
        </button>
      </div>
    </div>
  )
}
