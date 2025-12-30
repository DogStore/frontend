import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'
import { useUserStore } from './stores/userStore'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import Toast from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)


const userStore = useUserStore()
userStore.initializeFromStorage()

app.mount('#app')
