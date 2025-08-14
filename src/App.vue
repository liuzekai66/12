<script setup>
// 移除 HelloWorld（不需要固定内容），引入头部组件
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div>
    <!-- 头部导航 -->
    <BHeader />

    <!-- 路由出口，显示当前匹配的页面 -->
    <RouterView />
  </div>
</template>

<style scoped>
/* 这里的样式可以保留或按需修改 */
</style>
