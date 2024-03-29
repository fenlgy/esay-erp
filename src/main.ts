import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
import App from './App.vue'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App);
registerPlugins(app)
app.mount('#app')
  .$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})