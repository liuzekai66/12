import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const routes = [
  { path: '/weather', name: 'GetWeather', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI }
]

const router = createRouter({
  history: createWebHistory('/12/'),  // ⚠ 与 base 保持一致
  routes
})

export default router
