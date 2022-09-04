import { createApp } from 'vue'
import App from './App.vue'
import $ from 'jquery';
import anime from 'animejs';

const app = createApp(App);
app.use($);
app.use(anime)
app.mount('#app');

