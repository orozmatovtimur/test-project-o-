<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Добро пожаловать в Dashboard!</h1>
    <Button label="Выйти" class="mt-4" @click="logout" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
