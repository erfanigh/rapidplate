import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiThreeDotsVertical, FaRegularTrashAlt, FaTrash, HiPlusSm, IoClose, MdModeeditOutlined, MdRefresh } from "oh-vue-icons/icons"
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/tailwind.css'
import store from './store'

addIcons(FaRegularTrashAlt, FaTrash, MdRefresh, MdModeeditOutlined, IoClose, HiPlusSm, BiThreeDotsVertical);

createApp(App)
    .component("v-icon", OhVueIcon)
    .use(store)
    .mount('#app')
