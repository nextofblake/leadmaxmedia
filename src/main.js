import { createApp } from 'vue'
import Core from './Core.vue'
import EmailService from './services/EmailService'
import EventService from './services/EventService'
import FadeService from './services/FadeService'
import ProfileService from './services/ProfileService'
import VideoService from './services/VideoService'

const app = createApp(Core)

app.provide('emailService', EmailService)
app.provide('eventService', EventService)
app.provide('fadeService', FadeService)
app.provide('profileService', ProfileService)
app.provide('videoService', VideoService)

app.mount('#app')
