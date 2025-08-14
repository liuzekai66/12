<!-- src/views/WeatherView.vue -->
<template>
<h1>这是新的天气页面</h1>

  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <!-- 输入城市 -->
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <!-- 点击搜索 -->
        <button @click="searchByCity" class="search-button">
          Search
        </button>
      </div>
    </div>

    <!-- main 区域显示天气信息 -->
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 城市输入绑定
const city = ref('')

// API 返回数据
const weatherData = ref(null)

// 点击搜索
const searchByCity = async () => {
  if (!city.value) {
    alert('Please enter a city name')
    return
  }

  try {
    const apiKey = 'fce88738039367fe726472b7e39dfbf3' // 替换成你的 OpenWeatherMap API Key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
    )
    const data = await response.json()

    if (data.cod !== 200) {
      alert(data.message || 'Failed to fetch weather data')
      return
    }

    weatherData.value = data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    alert('Failed to fetch weather data')
  }
}

// 计算温度
const temperature = computed(() => {
  return weatherData.value ? weatherData.value.main.temp : ''
})

// 天气图标 URL
const iconUrl = computed(() => {
  if (!weatherData.value) return ''
  const icon = weatherData.value.weather[0].icon
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
})
</script>

<style scoped>
.container {
  padding: 24px;
  text-align: center;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 16px;
}

.search-bar {
  display: inline-block;
  text-align: left;
}

.search-input {
  padding: 6px 10px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 6px 12px;
  border: none;
  background-color: #42b883;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #369870;
}

main {
  margin-top: 24px;
}

main img {
  width: 80px;
  height: 80px;
}

main h2 {
  margin-bottom: 8px;
}

main p {
  font-size: 1.2em;
  margin: 4px 0;
}

main span {
  display: block;
  font-style: italic;
  margin-top: 4px;
}
</style>
