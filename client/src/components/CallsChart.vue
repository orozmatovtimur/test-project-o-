<template>
  <div class="p-6 shadow rounded bg-white">
    <Pie :data="chartData" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  chartData: Object
});
</script>
