import { useEffect, useRef, useCallback } from "react"
import { supabase } from "."

export function usePostgresChanges(
  callback,
  { event = "*", schema = "public", table = "*" }
) {
  const cb = useRef(callback)

  useEffect(() => {
    cb.current = callback
  }, [callback])

  const handler = useCallback((payload) => {
    cb.current(payload)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks")
      .on("postgres_changes", { event, schema, table }, handler)
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [event, schema, table])
}
