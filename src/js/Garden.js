import { Tulip } from './Tulip.js';

export class Garden {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tulips = [];
    this.colors = ['#FF69B4', '#FF1493', '#FF007F', '#FF69B4'];
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
    const numTulips = Math.floor(this.canvas.width / 50);
    
    for (let i = 0; i < numTulips; i++) {
      const x = (this.canvas.width / (numTulips + 1)) * (i + 1);
      const y = this.canvas.height - 50;
      const size = 15 + Math.random() * 10;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.tulips.push(new Tulip(x, y, size, color));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grass
    const gradient = this.ctx.createLinearGradient(0, this.canvas.height - 100, 0, this.canvas.height);
    gradient.addColorStop(0, '#90EE90');
    gradient.addColorStop(1, '#228B22');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

    // Update and draw tulips
    this.tulips.forEach(tulip => {
      tulip.update();
      tulip.draw(this.ctx);
    });

    requestAnimationFrame(() => this.animate());
  }
}