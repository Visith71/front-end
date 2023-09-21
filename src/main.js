import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'
import 'animate.css'
import PrimeVue from 'primevue/config'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index.js'
import DKToast from 'vue-dk-toast'
import ConfirmationService from 'primevue/confirmationservice'
import VCalendar from 'v-calendar';
import Particles from 'particles.vue3';
import ToastService from 'primevue/toastservice';
import GAuth from 'vue3-google-oauth2'
import { toastStyles } from './composable/getToast'
import { toastMethod } from './composable/mixins/toastMethod'
import moment from 'moment'

import ClubAutoComplete from './components/main-component/clubAutoComplete.vue'

const gAuthOptions = {
  clientId: '182665777548-2gdd6sv7kroi1tsm52dpout4oeoi79df.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/main.css'

// setup global axios config
axios.defaults.baseURL = 'http://localhost:3000/api/'
let authorizedToken = localStorage.getItem('accessToken');
if (authorizedToken) { 
  axios.defaults.headers.common['x-access-token'] = authorizedToken;
}

const app = createApp(App)

// register global function
app.config.globalProperties.$toastStyles = toastStyles
app.config.globalProperties.$moment = moment

// register global mixins
app.mixin(toastMethod)

// register global component
app.component('ClubAutoComplete', ClubAutoComplete)

app.use(router)
app.use(PrimeVue)
app.use(PrimeVue, {ripple: true})
app.use(ConfirmationService)
app.use(VueAxios, axios)
app.use(store)
app.use(Particles)
app.use(ToastService)
app.use(DKToast, {
  styles: {
    borderRadius: '0px',
    color: 'var(--white)',
    borderColor: 'var(--black)',
    boxShadow: '-5px 5px 0px rgba(0,0,0,0.1)',
    border: '3px solid var(--black)'
  },
  class: 'local-class',
  positionX: 'center',
  positionY: 'top',
  disableClick: false
})
app.use(VCalendar, {})
app.use(GAuth, gAuthOptions)

app.mount('#app')
