import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router';
import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import './assets/styles/app.scss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#__app');
