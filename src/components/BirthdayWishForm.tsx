import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Heart, Send } from 'lucide-react'

interface Wish {
  id: number
  name: string
  message: string
  timestamp: Date
}

export function BirthdayWishForm() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newWish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date()
    }

    setWishes(prev => [newWish, ...prev])
    setName('')
    setMessage('')
    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Wish Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-dancing text-center text-primary flex items-center justify-center gap-2">
            <Heart className="w-6 h-6" />
            Leave a Birthday Wish
            <Heart className="w-6 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <Textarea
                placeholder="Write your birthday wish here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="border-primary/30 focus:border-primary resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Wish
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Wishes Display */}
      {wishes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-dancing text-center text-primary">
            Birthday Wishes 🎉
          </h3>
          <div className="space-y-3">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/60 backdrop-blur-sm border border-accent/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-primary">{wish.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {wish.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{wish.message}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}