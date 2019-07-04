import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    let date = new Date(value)
    let d, m, h, i, s, y = date.getFullYear()
    d = date.getDate()
    m = date.getMonth() + 1
    h = date.getHours()
    i = date.getMinutes()
    s = date.getSeconds()

    d = d < 10 ? ('0' + d) : d
    m = m < 10 ? ('0' + m) : m
    h = h < 10 ? ('0' + h) : h
    i = i < 10 ? ('0' + i) : i
    s = s < 10 ? ('0' + s) : s

    return d + '.' + m + '.' + y + ' ' + h + ':' + i + ':' + s;
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
