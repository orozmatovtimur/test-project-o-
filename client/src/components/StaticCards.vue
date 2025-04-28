<template>
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-label">Всего звонков</div>
      <div class="stat-value">{{ stats.total }}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Среднее время разговора</div>
      <div class="stat-value">{{ stats.averageDuration }}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Пропущенные звонки</div>
      <div class="stat-value">{{ stats.missedPercentage }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: Object
});
</script>

<style scoped>
.stats-cards  {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 120px; 
}

.stat-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}

.stat-value {
  color: #333;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}
</style>