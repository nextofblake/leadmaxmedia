import { reactive } from 'vue'
import emailjs from '@emailjs/browser'

// Initilize emailjs globally
emailjs.init('esxuXK7wePn-g6T4_')
const EmailService = reactive({
  calendlyMeetingUrl: 'https://calendly.com/leadmaxmedia/15min',
  googleFormUrl: 'https://forms.gle/XqWpT4wn9US76GFh9',
  getMeetingUrl(name, email) {
    return this.calendlyMeetingUrl + `?name=${name}&email=${email}`
  },
  sendFaker(timeout = 0) {
    return new Promise(resolve => setTimeout(resolve, timeout, {status: true, timeout}))
  },
  /**
   * No longer in use
   * 
   * @deprecated
   */
  sendSales(name, email) {
    return emailjs.send('service_lxm', 'template_050g5uk', {
      from_name: 'Blake Alan',
      to_name: name,
      to_email: email,
    })
  },
  /**
   * No longer in use
   * 
   * @deprecated
   */
  sendMeeting(name, email) {
    return emailjs.send('service_lxm', 'template_nk33u8g', {
      from_name: 'Blake Alan',
      to_name: name,
      to_email: email,
    })
  },
})

export default EmailService
