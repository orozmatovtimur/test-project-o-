<!-- SideBar.vue -->
<template>
  <aside class="sidebar">
    <div class="menu-title">МЕНЮ</div>
    <router-link to="/dashboard" class="menu-item active">Дашборд</router-link>
    <router-link to="/analytics" class="menu-item">Детализация</router-link>
    <router-link to="/settings" class="menu-item">Настройки</router-link>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  background: white;
  padding: 20px;
  grid-area: sidebar;
}

.menu-title {
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 14px;
}

.menu-item {
  display: block;
  padding: 10px;
  color: #666;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 14px;
}

.menu-item.active {
  background: #e2007f;
  color: white;
  border-radius: 4px;
}
</style>