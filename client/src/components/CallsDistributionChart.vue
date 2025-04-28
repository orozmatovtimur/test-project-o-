<template>
  <div class="chart-container">
    <h3>Распределение звонков по часам</h3>
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps({
  data: Array
});

const chartData = computed(() => ({
  labels: props.data.map(item => `${item.hour}:00`),
  datasets: [{
    label: 'Количество звонков',
    data: props.data.map(item => item.count),
    backgroundColor: '#e2007f',
    borderColor: '#e2007f',
    borderWidth: 2,
    fill: false,
    tension: 0.4, // плавная линия
    pointBackgroundColor: '#e2007f',
    pointBorderColor: '#e2007f'
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

.chart-container canvas {
  flex-grow: 1;
}
</style>
