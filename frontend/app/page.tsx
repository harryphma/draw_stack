import Canvas from "@/components/Canvas"
import Toolbar from "@/components/Toolbar"
import Inspector from "@/components/Inspector"
import Topbar from "@/components/Topbar"

export default function DrawStack() {
  return (
    <div className="draw-stack-app">
      <Topbar />
      <div className="main-layout">
        <Toolbar />
        <Canvas />
        <Inspector />
      </div>
    </div>
  )
}
