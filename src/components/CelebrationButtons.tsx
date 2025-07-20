import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from './ui/button'
import { Volume2, VolumeX, Share2, Gift, Sparkles, Calendar } from 'lucide-react'
import RSVPModal from './RSVPModal'

export function CelebrationButtons() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [isRSVPOpen, setIsRSVPOpen] = useState(false)

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying)
    // In a real app, you'd control actual audio here
  }

  const triggerSurprise = () => {
    setShowSurprise(true)
    setTimeout(() => setShowSurprise(false), 3000)
  }

  const shareParty = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Birthday Celebration!',
        text: 'Join me in celebrating this special day!',
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* RSVP Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setIsRSVPOpen(true)}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg"
        >
          <Calendar className="w-4 h-4 mr-2" />
          RSVP Now
        </Button>
      </motion.div>

      {/* Music Toggle */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={toggleMusic}
          variant={musicPlaying ? "default" : "outline"}
          className={`${
            musicPlaying 
              ? 'bg-primary hover:bg-primary/90 text-white' 
              : 'border-primary text-primary hover:bg-primary hover:text-white'
          } transition-colors`}
        >
          {musicPlaying ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
          {musicPlaying ? 'Music On' : 'Play Music'}
        </Button>
      </motion.div>

      {/* Surprise Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={triggerSurprise}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white transition-colors"
        >
          <Gift className="w-4 h-4 mr-2" />
          Surprise!
        </Button>
      </motion.div>

      {/* Share Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={shareParty}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Party
        </Button>
      </motion.div>

      {/* Celebration Effect */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            // Trigger confetti or other celebration effect
            const event = new CustomEvent('celebrate')
            window.dispatchEvent(event)
          }}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Celebrate!
        </Button>
      </motion.div>

      {/* Surprise Message */}
      {showSurprise && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -50 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-primary to-accent text-white text-4xl font-dancing p-8 rounded-2xl shadow-2xl">
            🎉 SURPRISE! 🎉
            <div className="text-lg mt-2">You're amazing!</div>
          </div>
        </motion.div>
      )}

      {/* Music Playing Indicator */}
      {musicPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-40"
        >
          🎵 Party music playing...
        </motion.div>
      )}

      {/* RSVP Modal */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  )
}