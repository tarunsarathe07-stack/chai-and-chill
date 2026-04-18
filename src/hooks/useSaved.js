import { useState } from 'react'

export function useSaved() {
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem('chai-chill-saved')
    return stored ? JSON.parse(stored) : []
  })

  const toggleSaved = (spotId) => {
    setSaved((prev) => {
      const next = prev.includes(spotId)
        ? prev.filter((id) => id !== spotId)
        : [...prev, spotId]
      localStorage.setItem('chai-chill-saved', JSON.stringify(next))
      return next
    })
  }

  const isSaved = (spotId) => saved.includes(spotId)

  return { saved, toggleSaved, isSaved }
}
