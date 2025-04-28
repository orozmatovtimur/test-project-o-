<template>
  <div class="chart-container">
    <h3>Статусы звонков</h3>
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  data: Array
});

const chartData = computed(() => ({
  labels: props.data.map(item => item.status),
  datasets: [{
    data: props.data.map(item => item.percentage),
    backgroundColor: ['#e2007f', '#f76ebf', '#cccccc'],
    borderWidth: 1
  }]
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
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