/**
 * 404页面组件
 * 当用户访问不存在的页面时显示
 */
<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-code">404</h1>
      <h2 class="not-found-title">页面不存在</h2>
      <p class="not-found-description">抱歉，您访问的页面不存在或已被删除</p>
      <n-button type="primary" @click="goHome">返回首页</n-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()

/**
 * 返回首页
 */
function goHome() {
  router.push('/dashboard/console')
}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.not-found-content {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.not-found-code {
  font-size: 80px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 20px;
  line-height: 1;
}

.not-found-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.not-found-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 30px;
    margin: 0 20px;
  }
  
  .not-found-code {
    font-size: 60px;
  }
  
  .not-found-title {
    font-size: 20px;
  }
}
</style>