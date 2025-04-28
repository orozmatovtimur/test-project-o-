<template>
  <div class="dashboard-container">
    <Header />
    <SideBar />

    <main class="main-content">
      <div class="filters-section">
        <FilterPanel :categories="categories" :statuses="statuses" @filter="applyFilters" />
      </div>

      <div class="stats-section">
        <StatsCards :stats="stats" />
      </div>

      <div class="charts-section">
        <CallsDistributionChart :data="hourlyDistribution" />
        <CallStatusChart :data="statusDistribution" />
      </div>

      <div class="duration-chart-section">
        <DurationByCategoryChart :data="durationByCategory" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Header from "../components/Header.vue";
import SideBar from "../components/SideBar.vue";
import FilterPanel from "../components/FilterPanel.vue";
import StatsCards from "../components/StaticCards.vue";
import CallsDistributionChart from "../components/CallsDistributionChart.vue";
import CallStatusChart from "../components/CallsStatusChart.vue";
import DurationByCategoryChart from "../components/DurationByCategoryChart.vue";
import {
  calculateTotalCalls,
  calculateAverageCallDuration,
  formatDuration,
  calculateMissedCallPercentage,
  getCallsDistributionByHour,
  getCallStatusDistribution,
  getAverageDurationByCategory,
} from "../utils/callsAnalytics";

const calls = ref([]);
const filteredCalls = ref([]);

const categories = ["billing", "technical", "general"];
const statuses = ["completed", "missed", "rejected"];

const stats = computed(() => ({
  total: calculateTotalCalls(filteredCalls.value),
  averageDuration: formatDuration(calculateAverageCallDuration(filteredCalls.value)),
  missedPercentage: calculateMissedCallPercentage(filteredCalls.value).toFixed(0) + "%",
}));

const hourlyDistribution = computed(() => getCallsDistributionByHour(filteredCalls.value));
const statusDistribution = computed(() => getCallStatusDistribution(filteredCalls.value));
const durationByCategory = computed(() => getAverageDurationByCategory(filteredCalls.value));

const fetchCalls = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    calls.value = response.data;
    filteredCalls.value = response.data;
  } catch (error) {
    console.error("Failed to fetch calls:", error);
  }
};

const applyFilters = (filters) => {
  filteredCalls.value = calls.value.filter((call) => {
    return (
      (!filters.category || filters.category.includes(call.category)) &&
      (!filters.status || call.status === filters.status)
    );
  });
};

onMounted(() => {
  fetchCalls();
});
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

.main-content {
  grid-area: main;
  background-color: #f5f6fa;
  padding: 20px;
}

.filters-section {
  background: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.stats-section {
  display: grid;
  grid-template-columns: 1fr 1fr fr;
  gap: 20px;
  margin-bottom: 20px;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.duration-chart-section {
  background: white;
  border-radius: 5px;
  padding: 20px;
}
</style>
