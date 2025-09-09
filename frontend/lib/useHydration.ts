import { useEffect } from "react"
import { useGraphStore } from "@/store/graphStore"

export const useHydration = () => {
  const hydrate = useGraphStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])
}
