import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  duration: number
}

export function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ['#FF6B9D', '#FFD93D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    const pieces: ConfettiPiece[] = []

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2
      })
    }

    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
          }}
          initial={{ y: -100, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}