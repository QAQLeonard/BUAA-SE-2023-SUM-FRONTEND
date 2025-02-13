import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from './service'

// import 'leaflet/dist/leaflet.css'
// import * as L from 'leaflet'
// import 'leaflet.pm'
// import 'leaflet.pm/dist/leaflet.pm.css'

Vue.use(ElementUI);

// Vue.use(L);
Vue.config.productionTip = false
Vue.prototype.service = service
// Vue.L = Vue.prototype.$L = L
// /* leaflet icon */
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// })


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
