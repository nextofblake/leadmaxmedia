import { reactive } from 'vue'
import emailjs from '@emailjs/browser'

// Initilize emailjs globally
emailjs.init('esxuXK7wePn-g6T4_')
const EmailService = reactive({
  sendSales(name, email) {
    return emailjs.send('service_lxm', 'template_050g5uk', {
      from_name: 'Blake Alan',
      to_name: name,
      to_email: email,
    })
  },
  sendMeeting(name, email) {
    return emailjs.send('service_lxm', 'template_nk33u8g', {
      from_name: 'Blake Alan',
      to_name: name,
      to_email: email,
    })
  },
  sendFaker(...args) {
    return new Promise(resolve => setTimeout(resolve, 1, {status: true, args}))
  }
})

export default EmailService
