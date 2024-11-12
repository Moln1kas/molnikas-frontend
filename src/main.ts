import { createApp } from 'vue'

import Draggable from 'vue-draggable-resizable'
import App from './App.vue'
import router from './router'

createApp(App)
    .component("vue-draggable-resizable", Draggable)
    .use(router)
    .mount('#app')