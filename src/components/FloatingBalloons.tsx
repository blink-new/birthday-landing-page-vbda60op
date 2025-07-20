import { motion } from 'framer-motion'

export function FloatingBalloons() {
  const balloons = [
    { color: '#FF6B9D', x: '10%', delay: 0 },
    { color: '#FFD93D', x: '20%', delay: 0.5 },
    { color: '#4ECDC4', x: '80%', delay: 1 },
    { color: '#45B7D1', x: '90%', delay: 1.5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0"
          style={{ left: balloon.x }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: -50, opacity: 1 }}
          transition={{
            duration: 2,
            delay: balloon.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Balloon */}
          <div
            className="w-16 h-20 rounded-full relative balloon"
            style={{ backgroundColor: balloon.color }}
          >
            {/* Balloon highlight */}
            <div className="absolute top-2 left-3 w-4 h-6 bg-white/30 rounded-full"></div>
            
            {/* String */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gray-400"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}