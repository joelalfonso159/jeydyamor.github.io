import { Tulip } from './Tulip.js';
import { Background } from './Background.js';
import { COLORS } from '../constants.js';

export class Garden {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tulips = [];
    this.init();
  }

  init() {
    this.resize();
    this.createTulips();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createTulips();
  }

  createTulips() {
    this.tulips = [];
    // Menos tulipanes pero más grandes y detallados
    const numTulips = Math.floor(this.canvas.width / 100);
    
    for (let i = 0; i < numTulips; i++) {
      const x = (this.canvas.width / (numTulips + 1)) * (i + 1);
      const y = this.canvas.height - 50;
      // Tamaños más variados
      const size = 25 + Math.random() * 20;
      const color = COLORS.PINK_VARIANTS[Math.floor(Math.random() * COLORS.PINK_VARIANTS.length)];
      this.tulips.push(new Tulip(x, y, size, color));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    Background.drawSky(this.ctx, this.canvas.width, this.canvas.height);
    Background.drawGrass(this.ctx, this.canvas.width, this.canvas.height);
    
    // Ordenar tulipanes por tamaño para mejor efecto de profundidad
    this.tulips.sort((a, b) => b.size - a.size);
    
    this.tulips.forEach(tulip => {
      tulip.update();
      tulip.draw(this.ctx);
    });

    requestAnimationFrame(() => this.animate());
  }
}