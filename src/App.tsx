import { motion } from 'framer-motion'
import { ConfettiAnimation } from './components/ConfettiAnimation'
import { FloatingBalloons } from './components/FloatingBalloons'
import { BirthdayCake } from './components/BirthdayCake'
import { CountdownTimer } from './components/CountdownTimer'
import { PhotoGallery } from './components/PhotoGallery'
import { BirthdayWishForm } from './components/BirthdayWishForm'
import { CelebrationButtons } from './components/CelebrationButtons'

function App() {
  const birthdayPerson = "Alex" // This could be dynamic
  const age = 25 // This could be dynamic

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 relative overflow-hidden">
      {/* Background Animations */}
      <ConfettiAnimation />
      <FloatingBalloons />
      
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-dancing text-primary mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            Happy Birthday!
          </motion.h1>
          
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🎉 {birthdayPerson} turns {age} today! 🎉
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Let's celebrate this special day with joy, laughter, and lots of cake! 
            Join us in making this birthday unforgettable.
          </motion.p>
        </motion.section>

        {/* Birthday Cake Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mb-16"
        >
          <BirthdayCake age={age} />
        </motion.section>

        {/* Celebration Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <CelebrationButtons />
        </motion.section>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Countdown Timer */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <CountdownTimer />
          </motion.section>

          {/* Photo Gallery */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            <PhotoGallery />
          </motion.section>
        </div>

        {/* Birthday Wishes Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-16"
        >
          <BirthdayWishForm />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="text-center py-8 border-t border-primary/20"
        >
          <p className="text-muted-foreground">
            Made with ❤️ for an amazing birthday celebration
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {new Date().getFullYear()} • Birthday Wishes
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App