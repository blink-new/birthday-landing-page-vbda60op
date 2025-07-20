import { motion } from 'framer-motion'
import { useState } from 'react'

interface BirthdayCakeProps {
  age?: number
}

export function BirthdayCake({ age = 25 }: BirthdayCakeProps) {
  const [candlesBlown, setCandlesBlown] = useState(false)

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    setTimeout(() => setCandlesBlown(false), 3000)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Cake Base */}
        <div className="relative">
          {/* Cake Layers */}
          <div className="w-32 h-20 bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg border-4 border-amber-400 relative">
            {/* Frosting */}
            <div className="absolute -top-2 left-2 right-2 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 left-4 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute top-4 right-6 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          {/* Candles */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {Array.from({ length: Math.min(age, 5) }).map((_, i) => (
              <div key={i} className="relative">
                {/* Candle */}
                <div className="w-1 h-6 bg-yellow-300 rounded-sm"></div>
                
                {/* Flame */}
                {!candlesBlown && (
                  <motion.div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={handleBlowCandles}
        className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🌬️ Blow the candles!
      </motion.button>

      {candlesBlown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-2xl font-dancing text-primary"
        >
          🎉 Make a wish! 🎉
        </motion.div>
      )}
    </div>
  )
}