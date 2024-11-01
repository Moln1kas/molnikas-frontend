import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import Draggable from 'vue-draggable-resizable'
import App from './App.vue'
import router from './router'

import './styles/main.scss'

createApp(App)
    .component("vue-draggable-resizable", Draggable)
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')