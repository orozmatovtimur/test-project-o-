<template>
  <div class="login-screen">
    <div class="login-form">
    <div class="login-form_upper">
    <img style="border-radius: 50%; width: 70px" src=https://upload.wikimedia.org/wikipedia/commons/d/d8/%D0%9B%D0%BE%D0%B3%D0%BE_%D0%9E%21_%D0%9D%D0%A3%D0%A0_%D0%A2%D0%B5%D0%BB%D0%B5%D0%BA%D0%BE%D0%BC.png />
      <div class="login-form_upper_text">
        <h2 class="login-title">Вход в систему</h2>
        <p>Аналитика звонков колл-центра</p>
      </div>

    </div>
      <div class="field">
        <label for="email" class="field-label">Email</label>
        <InputText id="email" v-model="email" class="input" placeholder="example@o.kg" />
      </div>

      <div class="field">
        <label for="password" class="field-label">Пароль</label>
        <Password 
          id="password" 
          v-model="password" 
          class="input" 
          toggleMask 
          placeholder="******"
          input-class="input-inner"
        />
      </div>

      <Button label="Войти" class="login-button" @click="login" />
      <p style="font-size: 10px; text-align: center">© 2025 Мобильный оператор "O!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Неверный логин или пароль')
    }

    const data = await response.json()
    localStorage.setItem('token', data.access_token)
    alert('Успешный вход!')
    router.push('/dashboard')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
.login-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.login-form {
  background: #ffffff;
  padding: 2rem;
  width: 24rem;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.login-form_upper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form_upper_text {
  text-align: center;
  line-height: 1;
}

.login-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.field {
  margin-bottom: 1.5rem;
}

.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
}

.input-inner {
  width: 100%;
}

.login-button {
  width: 100%;
  background-color: #E2287F;
  color: white;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-align: center;
  transition: background-color 0.3s ease;
  border: none;
}

.login-button:hover {
  background-color: #2563eb;
}
</style>
