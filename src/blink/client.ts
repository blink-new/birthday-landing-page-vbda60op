import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'birthday-landing-page-vbda60op',
  authRequired: false // For public RSVP form
})