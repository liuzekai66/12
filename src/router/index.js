// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const routes = [
  {
    path: '/',
    redirect: '/weather'  // 根路径自动重定向到 /weather
  },
  {
    path: '/weather',
    name: 'GetWeather',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
]

const router = createRouter({
  history: createWebHashHistory('/12/'), // hash 模式，保证 GitHub Pages 不 404
  routes
})

export default router
