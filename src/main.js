import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Core from './Core.vue';
import DevService from './services/DevService';
import EmailService from './services/EmailService';
import EventService from './services/EventService';
import ImageService from './services/ImageService';
import NetworkService from './services/NetworkService';
import ProfileService from './services/ProfileService';
import ScrollService from './services/ScrollService';
import VideoService from './services/VideoService';

/**
 * Create Vue app
 */
const app = createApp(Core)


/**
 * Vue Router
 * - typically serves different components,
 *   currently just allows for Core to serve different content
 */
const routes = [
    {
        path: '/',
        component: Core
    },
    {
        path: '/intro',
        component: Core
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router)

/**
 * Service Provider
 * - allows singleton global reactivity
 */
app.provide('devService', DevService)
app.provide('emailService', EmailService)
app.provide('eventService', EventService)
app.provide('imageService', ImageService)
app.provide('networkService', NetworkService)
app.provide('profileService', ProfileService)
app.provide('scrollService', ScrollService)
app.provide('videoService', VideoService)

app.mount('#app')
