import { COLORS } from '../constants.js';
import { createGradient } from '../utils/animation.js';

export class Background {
  static drawSky(ctx, width, height) {
    // Enhanced sky gradient with three color stops
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, COLORS.SKY.TOP);
    gradient.addColorStop(0.5, COLORS.SKY.MIDDLE);
    gradient.addColorStop(1, COLORS.SKY.BOTTOM);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 5; i++) {
      const x = (width / 5) * i + Math.sin(Date.now() * 0.001 + i) * 50;
      const y = height * 0.2 + Math.cos(Date.now() * 0.001 + i) * 20;
      this.drawCloud(ctx, x, y, 80 + Math.sin(i) * 20);
    }
  }

  static drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.3, 0, Math.PI * 2);
    ctx.arc(x - size * 0.4, y - size * 0.1, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  static drawGrass(ctx, width, height) {
    const grassHeight = 140;
    const gradient = createGradient(
      ctx,
      height,
      COLORS.GRASS.LIGHT,
      COLORS.GRASS.DARK
    );
    
    // Main grass area
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height - grassHeight);
    
    // Enhanced grass curve
    for (let x = 0; x < width; x += 20) {
      const y = height - grassHeight + 
        Math.sin(x * 0.03) * 12 +
        Math.sin(x * 0.02 + Date.now() * 0.001) * 8;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height - grassHeight);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    
    // Add grass highlights
    ctx.strokeStyle = COLORS.GRASS.HIGHLIGHT;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      const baseY = height - grassHeight + Math.sin(x * 0.03) * 10;
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, baseY + 30 + Math.random() * 20);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  }
}