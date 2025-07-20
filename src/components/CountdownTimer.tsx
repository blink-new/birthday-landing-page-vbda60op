import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  targetDate?: Date
  title?: string
}

export function CountdownTimer({ 
  targetDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
  title = "Next Birthday"
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-dancing text-primary">{title}</h3>
      <div className="flex justify-center space-x-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-2 border-accent/30 min-w-[80px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <motion.div
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-primary"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-sm text-muted-foreground font-medium">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}