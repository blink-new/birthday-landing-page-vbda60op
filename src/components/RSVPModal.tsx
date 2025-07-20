import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react'

interface RSVPModalProps {
  isOpen: boolean
  onClose: () => void
}

interface RSVPFormData {
  name: string
  email: string
  attendance: 'yes' | 'no' | 'maybe'
  guests: number
  dietaryRestrictions: string
  message: string
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    attendance: 'yes',
    guests: 1,
    dietaryRestrictions: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the RSVP data to your backend
    console.log('RSVP submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: '',
        email: '',
        attendance: 'yes',
        guests: 1,
        dietaryRestrictions: '',
        message: ''
      })
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary font-dancing">RSVP to the Party!</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Party Details */}
                <div className="bg-cream p-4 rounded-xl mb-6">
                  <h3 className="font-semibold text-primary mb-3">Party Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      <span>Saturday, July 20th, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <span>6:00 PM - 11:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      <span>123 Celebration Street, Party City</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Will you attend? *</label>
                    <select
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="yes">Yes, I'll be there! 🎉</option>
                      <option value="no">Sorry, can't make it 😢</option>
                      <option value="maybe">Maybe, not sure yet 🤔</option>
                    </select>
                  </div>

                  {formData.attendance === 'yes' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Number of Guests</label>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-accent" />
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleInputChange}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'person' : 'people'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Dietary Restrictions</label>
                        <input
                          type="text"
                          name="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Any allergies or dietary needs?"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Any special message or questions?"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Send RSVP 🎊
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-primary font-dancing mb-2">
                  RSVP Received!
                </h3>
                <p className="text-gray-600">
                  Thank you for responding! We can't wait to celebrate with you.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}