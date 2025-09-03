import type { Category } from "@/types/graph"

export const PRESETS: Record<string, Category> = {
  frontend: { key: "frontend", name: "Frontend", color: "var(--ds-blue)" },
  backend: { key: "backend", name: "Backend", color: "var(--ds-green)" },
  database: { key: "database", name: "Database", color: "var(--ds-orange)" },
}

export const getNodeStyle = (category: string) => {
  const preset = PRESETS[category]
  if (preset) {
    return {
      background: preset.color,
      color: category === "database" ? "#231F18" : "white",
    }
  }
  return {
    background: "#6b7280",
    color: "white",
  }
}
