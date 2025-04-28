import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmationService from "primevue/confirmationservice"; 

const app = createApp(App)
app.use(ToastService);
app.component('Toast', Toast);
app.use(ConfirmationService);
app.use(router)
app.use(PrimeVue)

app.mount('#app')
