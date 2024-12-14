import { COLORS } from '../constants.js';
import { Leaf } from './Leaf.js';
import { Stem } from './Stem.js';
import { Petal } from './Petal.js';

export class Tulip {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size * 2.2; // Tulipanes más grandes
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.008 + Math.random() * 0.006; // Movimiento más suave
    this.swayAmount = 1.5 + Math.random() * 2;
    this.petalOffset = Math.random() * 0.15;
    this.growthProgress = 0;
    this.targetHeight = -this.size * 4;
    this.currentHeight = 0;
    this.bloomProgress = 0;
    this.petalCount = 6; // Número típico de pétalos de tulipán
    this.petalPhases = Array(this.petalCount).fill(0).map(() => Math.random() * Math.PI);
  }

  drawPetals(ctx) {
    ctx.translate(0, this.currentHeight);
    
    // Efecto de brillo más sutil
    const glowRadius = this.size * 1.5;
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
    glow.addColorStop(0, COLORS.GLOW.LIGHT);
    glow.addColorStop(0.6, COLORS.GLOW.MEDIUM);
    glow.addColorStop(1, 'transparent');
    
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Dibujar pétalos en forma de copa característica del tulipán
    for (let i = 0; i < this.petalCount; i++) {
      const baseAngle = (Math.PI * 2 / this.petalCount);
      const angle = baseAngle * i + Math.sin(this.angle * 0.5) * 0.05;
      const phaseOffset = Math.sin(this.angle + this.petalPhases[i]) * 0.08;
      
      // Ajustar posición para forma de copa
      ctx.save();
      ctx.translate(0, -this.size * 0.1 * Math.sin(baseAngle * i));
      
      Petal.draw(
        ctx,
        this.size,
        this.color,
        angle,
        this.petalOffset + phaseOffset,
        this.bloomProgress
      );
      
      ctx.restore();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.sin(this.angle) * 0.05); // Movimiento más natural

    Stem.draw(ctx, this.size, this.currentHeight, this.angle);
    
    // Hojas más naturales y distribuidas
    const leafHeights = [-0.2, -0.4, -0.6, -0.75, -0.9];
    leafHeights.forEach((heightPercent, index) => {
      const heightPosition = this.currentHeight * heightPercent;
      const leafSize = this.size * (0.8 - index * 0.1);
      const side = index % 2 === 0 ? 1 : -1;
      const leafAngle = this.angle * 0.5 + index * 0.2 + Math.sin(this.angle * 0.3) * 0.1;
      
      Leaf.draw(
        ctx,
        side * this.size * 0.7,
        heightPosition,
        leafSize,
        COLORS.STEM.PRIMARY,
        leafAngle
      );
    });

    this.drawPetals(ctx);
    ctx.restore();
  }

  update() {
    // Crecimiento más suave
    if (this.growthProgress < 1) {
      this.growthProgress += 0.01;
      this.currentHeight = this.targetHeight * Math.min(1, this.growthProgress);
    }

    // Florecimiento más natural
    if (this.growthProgress > 0.8 && this.bloomProgress < 1) {
      this.bloomProgress += 0.015;
    }

    // Movimiento más realista
    this.angle += this.swaySpeed;
    this.x += Math.sin(this.angle) * this.swayAmount;
    
    // Movimiento individual de pétalos más sutil
    this.petalPhases = this.petalPhases.map((phase, i) => 
      phase + 0.01 + Math.sin(this.angle + i) * 0.005
    );
  }
}