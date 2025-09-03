"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import type { NodeData } from "@/types/graph"
import { useGraphStore } from "@/store/graphStore"

function CustomNode({ id, data, selected }: NodeProps) {
  const { categories } = useGraphStore()
  const nodeData = data as NodeData
  const category = categories[nodeData.category]

  const getNodeClassName = () => {
    let className = "react-flow__node-custom"
    if (selected) className += " selected"

    // Add category-specific class for styling
    if (nodeData.category === "frontend") className += " node-frontend"
    else if (nodeData.category === "backend") className += " node-backend"
    else if (nodeData.category === "database") className += " node-database"

    className += ` node-shape-${nodeData.shape || "rectangle"}`

    return className
  }

  const getNodeStyle = () => {
    const baseStyle = {
      background: category?.color || "#6b7280",
      color: nodeData.category === "database" ? "#231F18" : "white",
    }

    const shape = nodeData.shape || "rectangle"

    switch (shape) {
      case "circle":
        return {
          ...baseStyle,
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      case "diamond":
        return {
          ...baseStyle,
          transform: "rotate(45deg)",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      case "hexagon":
        return {
          ...baseStyle,
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          width: "80px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      default: // rectangle
        return {
          ...baseStyle,
          borderRadius: "8px",
        }
    }
  }

  const getLabelStyle = () => {
    const shape = nodeData.shape || "rectangle"

    if (shape === "diamond") {
      return {
        transform: "rotate(-45deg)",
        fontSize: "12px",
        textAlign: "center" as const,
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "40px",
      }
    }

    if (shape === "circle") {
      return {
        fontSize: "11px",
        textAlign: "center" as const,
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "60px",
      }
    }

    return {}
  }

  return (
    <div className={getNodeClassName()} style={getNodeStyle()}>
      <Handle type="target" position={Position.Top} style={{ background: "rgba(255,255,255,0.8)" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "rgba(255,255,255,0.8)" }} />
      <Handle type="target" position={Position.Left} style={{ background: "rgba(255,255,255,0.8)" }} />
      <Handle type="source" position={Position.Right} style={{ background: "rgba(255,255,255,0.8)" }} />

      <div className="node-label" style={getLabelStyle()}>
        {nodeData.label}
      </div>
    </div>
  )
}

export default memo(CustomNode)
