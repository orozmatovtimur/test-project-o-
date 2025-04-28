<template>
  <div class="filters-panel">
    <input type="date" v-model="filters.startDate" placeholder="Дата начала" />
    <input type="date" v-model="filters.endDate" placeholder="Дата конца" />

    <select v-model="filters.statuses" multiple>
      <option v-for="status in statusesOptions" :key="status" :value="status">{{ status }}</option>
    </select>

    <select v-model="filters.categories" multiple>
      <option v-for="category in categoriesOptions" :key="category" :value="category">{{ category }}</option>
    </select>

    <input type="text" v-model="filters.agentId" placeholder="ID Оператора" />

    <button @click="emitFilters">Применить фильтры</button>
    <button @click="resetFilters">Сбросить</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  initialFilters: Object,
});

const emits = defineEmits(['update:filters']);

const filters = reactive({ ...props.initialFilters });

const statusesOptions = ['completed', 'missed', 'failed']; // можно заменить на API запрос если надо
const categoriesOptions = ['sales', 'support', 'other'];

function emitFilters() {
  emits('update:filters', { ...filters });
}

function resetFilters() {
  filters.startDate = '';
  filters.endDate = '';
  filters.statuses = [];
  filters.categories = [];
  filters.agentId = '';
  emitFilters();
}
</script>

<style scoped>
.filters-panel {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filters-panel input,
.filters-panel select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.filters-panel button {
  background-color: #e2007f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.filters-panel button:hover {
  opacity: 0.8;
}
</style>
