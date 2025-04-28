<template>
  <div class="chart-container">
    <h3>Средняя длительность разговора по категориям</h3>
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  data: Array
});

const chartData = computed(() => ({
  labels: props.data.map(item => item.category),
  datasets: [{
    label: 'Средняя длительность (сек)',
    data: props.data.map(item => item.averageDuration),
    backgroundColor: '#e2007f',
    borderColor: '#e2007f',
    borderWidth: 1
  }]
}));

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
</script>

<style scoped>
.chart-container {
  background: white;
  border-radius: 5px;
  padding: 20px;
  height: 400px;
  display: flex;
  flex-direction: column;
}
</style>    