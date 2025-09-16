import { useEffect, useState } from 'react'

/**
 * Custom hook that returns whether motion/animations are preferred by the user.
 *
 * @returns `false` if the user has set `prefers-reduced-motion: reduce`
 */
export function useMotionPreference(): boolean {
  const [motionPreferred, setMotionPreferred] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreferences = () => {
      setMotionPreferred(!mediaQuery.matches)
    }

    updatePreferences()
    mediaQuery.addEventListener('change', updatePreferences)
    return () => mediaQuery.removeEventListener('change', updatePreferences)
  }, [])

  return motionPreferred
}
