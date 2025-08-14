<!-- src/views/CountBookAPI.vue -->
<template>
  <div>
    <h1>CountBook API</h1>

    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color:red">{{ error }}</div>

    <div v-if="apiResponse" class="api-response">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 直接导入 JSON 文件
import authorsJson from '../data/authors.json'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

// 计算作者数量和总书籍数
const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)
}

// 获取数据
const getApiData = () => {
  loading.value = true
  error.value = null

  try {
    // 使用直接 import 的 JSON
    authors.value = authorsJson

    calculateStats()

    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map(author => ({
          name: author.name,
          bookCount: author.famousWorks.length,
        }))
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.api-response {
  margin-top: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: left;
}
</style>
