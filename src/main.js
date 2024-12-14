import { Garden } from './js/components/Garden.js';
import './styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('garden');
  const garden = new Garden(canvas);
  garden.animate();
});