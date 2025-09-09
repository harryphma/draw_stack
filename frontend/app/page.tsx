"use client";

import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import Inspector from "@/components/Inspector";
import Topbar from "@/components/Topbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useHydration } from "@/lib/useHydration";

export default function DrawStack() {
  // Initialize store with localStorage data after hydration
  useHydration();

  return (
    <ErrorBoundary>
      <div className="draw-stack-app">
        <Topbar />
        <div className="main-layout">
          <Toolbar />
          <Canvas />
          <Inspector />
        </div>
      </div>
    </ErrorBoundary>
  );
}
