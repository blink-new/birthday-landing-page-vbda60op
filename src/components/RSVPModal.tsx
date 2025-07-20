import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { blink } from '../blink/client'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send confirmation email to the guest
      const guestEmailResult = await blink.notifications.email({
        to: formData.email,
        subject: '🎉 RSVP Confirmation - Birthday Party!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #FF6B9D, #FFD93D); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎂 Birthday Party RSVP</h1>
            </div>
            <div style="background: #FFF8F0; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #FF6B9D; margin-top: 0;">Hi ${formData.name}! 👋</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for your RSVP! Here are your party details:
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFD93D;">
                <h3 style="color: #FF6B9D; margin-top: 0;">🎉 Party Details</h3>
                <p><strong>📅 Date:</strong> Saturday, July 20th, 2025</p>
                <p><strong>🕕 Time:</strong> 6:00 PM - 11:00 PM</p>
                <p><strong>📍 Location:</strong> 123 Celebration Street, Party City</p>
                <p><strong>👥 Your Response:</strong> ${formData.attendance === 'yes' ? "Yes, I'll be there! 🎉" : formData.attendance === 'no' ? "Sorry, can't make it 😢" : "Maybe, not sure yet 🤔"}</p>
                ${formData.attendance === 'yes' ? `<p><strong>🎫 Guests:</strong> ${formData.guests} ${formData.guests === 1 ? 'person' : 'people'}</p>` : ''}
                ${formData.dietaryRestrictions ? `<p><strong>🍽️ Dietary Notes:</strong> ${formData.dietaryRestrictions}</p>` : ''}
                ${formData.message ? `<p><strong>💬 Your Message:</strong> ${formData.message}</p>` : ''}
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">
                We can't wait to celebrate with you! If you need to change your RSVP or have any questions, just reply to this email.
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666; font-size: 14px;">
                  🎈 Get ready for an amazing celebration! 🎈
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Hi ${formData.name}! Thank you for your RSVP to the birthday party on Saturday, July 20th, 2025 from 6:00 PM - 11:00 PM at 123 Celebration Street, Party City. Your response: ${formData.attendance}. We can't wait to celebrate with you!`
      })

      // Send notification email to party host
      const hostEmailResult = await blink.notifications.email({
        to: 'party-host@example.com', // Replace with actual host email
        subject: `🎉 New RSVP from ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #FF6B9D; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">📝 New RSVP Received!</h1>
            </div>
            <div style="background: #FFF8F0; padding: 20px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #FF6B9D;">RSVP Details:</h2>
              <ul style="font-size: 16px; line-height: 1.8;">
                <li><strong>Name:</strong> ${formData.name}</li>
                <li><strong>Email:</strong> ${formData.email}</li>
                <li><strong>Attendance:</strong> ${formData.attendance === 'yes' ? "✅ Yes, attending" : formData.attendance === 'no' ? "❌ Not attending" : "❓ Maybe"}</li>
                ${formData.attendance === 'yes' ? `<li><strong>Guests:</strong> ${formData.guests} ${formData.guests === 1 ? 'person' : 'people'}</li>` : ''}
                ${formData.dietaryRestrictions ? `<li><strong>Dietary Restrictions:</strong> ${formData.dietaryRestrictions}</li>` : ''}
                ${formData.message ? `<li><strong>Message:</strong> ${formData.message}</li>` : ''}
              </ul>
            </div>
          </div>
        `,
        text: `New RSVP from ${formData.name} (${formData.email}). Attendance: ${formData.attendance}. ${formData.guests ? `Guests: ${formData.guests}. ` : ''}${formData.message ? `Message: ${formData.message}` : ''}`
      })

      console.log('RSVP emails sent:', { guestEmailResult, hostEmailResult })
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
      }, 3000)
      
    } catch (error) {
      console.error('Failed to send RSVP emails:', error)
      alert('Sorry, there was an error sending your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending RSVP... 📧' : 'Send RSVP 🎊'}
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
                  Thank you for responding! A confirmation email has been sent to your inbox. We can't wait to celebrate with you! 📧
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}