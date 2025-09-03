"use client"

import type React from "react"

import { useCallback } from "react"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  type Node,
  type NodeTypes,
  ConnectionMode,
  type BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useGraphStore } from "@/store/graphStore"
import CustomNode from "./CustomNode"

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

export default function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNode } = useGraphStore()

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode],
  )

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      if (selectedNodes.length === 1) {
        setSelectedNode(selectedNodes[0].id)
      } else if (selectedNodes.length === 0) {
        setSelectedNode(null)
      }
    },
    [setSelectedNode],
  )

  return (
    <div className="canvas-container canvas-root">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        attributionPosition="bottom-left"
      >
        <Background variant={"dots" as BackgroundVariant} gap={20} size={1} />
        <MiniMap
          nodeStrokeColor={(node) => {
            const category = node.data?.category
            if (category === "frontend") return "#4FA3FF"
            if (category === "backend") return "#38B26F"
            if (category === "database") return "#FFA451"
            return "#6b7280"
          }}
          nodeColor={(node) => {
            const category = node.data?.category
            if (category === "frontend") return "#4FA3FF"
            if (category === "backend") return "#38B26F"
            if (category === "database") return "#FFA451"
            return "#6b7280"
          }}
          nodeBorderRadius={14}
          position="bottom-right"
        />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  )
}
