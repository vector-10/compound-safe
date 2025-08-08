'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function CursorEffects() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const shouldDisable = pathname?.startsWith('/dashboard')
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (shouldDisable) {
      document.body.setAttribute('data-dashboard', 'true')
    } else {
      document.body.removeAttribute('data-dashboard')
    }

    if (shouldDisable) {
      return () => {
        window.removeEventListener('resize', checkMobile)
      }
    }

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const glow = glowRef.current
    
    if (!cursor || !cursorDot || !glow || isMobile) {
      return () => {
        window.removeEventListener('resize', checkMobile)
      }
    }

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      
      cursor.style.left = x + 'px'
      cursor.style.top = y + 'px'
      
      setTimeout(() => {
        cursorDot.style.left = x + 'px'
        cursorDot.style.top = y + 'px'
      }, 100)

      glow.style.left = x + 'px'
      glow.style.top = y + 'px'
    }

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)'
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.8)'
      cursor.style.backgroundColor = 'transparent'
      glow.style.transform = 'translate(-50%, -50%) scale(1.2)'
      glow.style.opacity = '0.8'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)'
      cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)'
      glow.style.transform = 'translate(-50%, -50%) scale(1)'
      glow.style.opacity = '0.6'
    }

    document.addEventListener('mousemove', moveCursor)
    
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('resize', checkMobile)
      document.body.removeAttribute('data-dashboard')
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [shouldDisable, isMobile])

  if (shouldDisable || isMobile) {
    return null
  }

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-30 transition-all duration-200 ease-out opacity-80"
        style={{
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 40%, rgba(59, 130, 246, 0.1) 70%, transparent 100%)',
            filter: 'blur(25px)',
        }}
        />

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
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