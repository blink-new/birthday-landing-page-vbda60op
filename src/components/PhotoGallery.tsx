import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { Button } from './ui/button'

export function PhotoGallery() {
  // Sample photos - in a real app, these would come from props or API
  const photos = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  if (photos.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-dancing text-primary">Memory Lane 📸</h3>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border-2 border-accent/30">
          <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No photos yet. Add some memories!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-dancing text-primary">Memory Lane 📸</h3>
      
      <div className="relative max-w-md mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-lg border-4 border-white shadow-lg"
        >
          <img
            src={photos[currentIndex]}
            alt={`Memory ${currentIndex + 1}`}
            className="w-full h-64 object-cover"
          />
          
          {/* Navigation buttons */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-primary"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </motion.div>

        {/* Photo indicators */}
        {photos.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-2">
          {currentIndex + 1} of {photos.length}
        </p>
      </div>
    </div>
  )
}