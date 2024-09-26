import './app.css';
import App from './App.svelte';
import { init } from '@neutralinojs/lib';

if (isNeutralino) init();
const app = new App({
  target: document.getElementById('app')!
});

export default app;
