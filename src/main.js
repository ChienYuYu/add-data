import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './scss/style.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { VueSpinnersPlugin } from 'vue3-spinners'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSpinnersPlugin)

app.mount('#app')
