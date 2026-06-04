import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with the public key from environment variables
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
	emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
}

const app = createApp(App)
app.use(router)
app.mount('#app')
