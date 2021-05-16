import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import icon from "@/components/icon.vue";
import tagListModel from "@/models/tagListModel";

Vue.config.productionTip = false

window.tagList = tagListModel.fetch()

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
