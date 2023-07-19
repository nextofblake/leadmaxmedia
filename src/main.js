import { createApp } from 'vue'
import Core from './Core.vue'
import EventService from './services/EventService'
import FadeService from './services/FadeService'
import ProfileService from './services/ProfileService'
import EmailService from './services/EmailService'

const app = createApp(Core)

app.provide('eventService', EventService)
app.provide('fadeService', FadeService)
app.provide('profileService', ProfileService)
app.provide('emailService', EmailService)

app.mount('#app')
