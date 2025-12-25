import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'
import { useUserStore } from './stores/userStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const userStore = useUserStore()
userStore.initializeFromStorage()

app.mount('#app')
