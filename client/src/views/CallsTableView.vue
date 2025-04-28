<template>
  <div class="calls-table">
    <Header />
    <SideBar />
    <main class="main-content">
    <div class="filters-section">
        <FilterPanel 
          :categories="categories" 
          :statuses="statuses" 
          @filter="applyFilters"
        />
    </div>
    <table>
      <thead>
        <tr>
          <th @click="changeSort('id')">ID</th>
          <th @click="changeSort('caller_number')">Номер звонящего</th>
          <th @click="changeSort('start_time')">Начало</th>
          <th>Длительность</th>
          <th @click="changeSort('status')">Статус</th>
          <th @click="changeSort('category')">Категория</th>
          <th @click="changeSort('agent_id')">ID Оператора</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="call in calls" :key="call.id">
          <td>{{ call.id }}</td>
          <td>{{ call.caller_number }}</td>
          <td>{{ formatDate(call.start_time) }}</td>
          <td>{{ calculateCallDuration(call) }}</td>
          <td>{{ call.status }}</td>
          <td>{{ call.category }}</td>
          <td>{{ call.agent_id }}</td>
        </tr>
      </tbody>
    </table>

    </main>
    <div class="pagination">
      <button :disabled="page <= 1" @click="changePage(page - 1)">Назад</button>
      <span>Стр {{ page }}</span>
      <button :disabled="!hasMore" @click="changePage(page + 1)">Вперёд</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
import { formatDuration } from '../utils/formatDuration';
import Header from '../components/Header.vue';
import SideBar from '../components/SideBar.vue';
import FilterPanel from '../components/FilterPanel.vue';

const props = defineProps({
  filters: Object, // фильтры приходят от родителя
});

const calls = ref([]);
const total = ref(0);
const page = ref(1);
const limit = 20;
const sortField = ref('start_time');
const sortDirection = ref('DESC');

async function fetchCalls() {
  try {
    const token = localStorage.getItem('token');

    const params = {
      ...props.filters,
      page: page.value,
      limit: limit,
      sortField: sortField.value,
      sortDirection: sortDirection.value,
    };

    const response = await axios.get('/api/calls', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    calls.value = response.data.data;
    total.value = response.data.total;
  } catch (error) {
    console.error('Ошибка загрузки звонков:', error);
  }
}

const totalPages = computed(() => {
  return Math.ceil(total.value / limit);
});

function changeSort(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortDirection.value = 'ASC';
  }
  fetchCalls();
}

function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchCalls();
  }
}

function formatDate(dateStr) {
  return format(new Date(dateStr), 'dd.MM.yyyy HH:mm');
}

function calculateCallDuration(call) {
  if (call.status !== 'completed' || !call.end_time) return '-';
  const start = new Date(call.start_time);
  const end = new Date(call.end_time);
  const seconds = (end - start) / 1000;
  return formatDuration(seconds);
}

onMounted(() => {
  fetchCalls();
});

// если фильтры меняются — надо перезапрашивать с первой страницы
watch(() => props.filters, () => {
  page.value = 1;
  fetchCalls();
}, { deep: true });
</script>

<style scoped>
.calls-table {
  background: white;
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

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  background: #f9f9f9;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}

td {
  padding: 10px;
  border-top: 1px solid #eee;
}

.pagination {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
