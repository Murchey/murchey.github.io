import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './assets/main.css'

gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
app.use(router)
app.mount('#app')