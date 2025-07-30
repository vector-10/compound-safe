'use client'

import { useEffect, useRef } from 'react'

export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
      
      grid.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(156, 163, 175, 0.3) 0%, transparent 30%),
        linear-gradient(rgba(156, 163, 175, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(156, 163, 175, 0.15) 1px, transparent 1px)
        `
        grid.style.backgroundSize = `100% 100%, 8px 8px, 8px 8px`
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-30"
      style={{
        background: `
          linear-gradient(rgba(156, 163, 175, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(156, 163, 175, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '8px 8px',  
      }}
    />
  )
}