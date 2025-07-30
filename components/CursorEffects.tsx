'use client'

import { useEffect, useRef } from 'react'

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursor || !cursorDot) return

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      
      cursor.style.left = x + 'px'
      cursor.style.top = y + 'px'
      
      setTimeout(() => {
        cursorDot.style.left = x + 'px'
        cursorDot.style.top = y + 'px'
      }, 100)
    }

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'
      cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.8)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)'
    }

    document.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-blue-500/50 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400/30 rounded-full pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}