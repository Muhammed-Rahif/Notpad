import './assets/css/app.css';
import './assets/css/fonts.css';
import './assets/css/themes.css';
import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
  target: document.getElementById('app')!
});

export default app;
