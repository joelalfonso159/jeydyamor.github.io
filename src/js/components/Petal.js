import { createRadialGradient } from '../utils/animation.js';
import { adjustColor } from '../utils/colorUtils.js';

export class Petal {
  static draw(ctx, size, color, angle, petalOffset, growthProgress) {
    ctx.save();
    ctx.rotate(angle + petalOffset + Math.sin(angle * 2) * 0.1);
    
    // Colores más realistas para los pétalos
    const innerColor = adjustColor(color, 30);
    const midColor = color;
    const outerColor = adjustColor(color, -20);
    const highlightColor = adjustColor(color, 50);
    
    // Forma más realista del pétalo de tulipán
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    // Curvas mejoradas para forma de gota característica del tulipán
    const petalLength = -size * (1.8 + Math.sin(angle) * 0.2);
    const petalWidth = size * (0.9 + Math.cos(angle) * 0.1);
    
    // Forma más puntiaguda característica del tulipán
    ctx.bezierCurveTo(
      petalWidth * 0.8, petalLength * 0.2,
      petalWidth * 0.6, petalLength * 0.6,
      0, petalLength
    );
    ctx.bezierCurveTo(
      -petalWidth * 0.6, petalLength * 0.6,
      -petalWidth * 0.8, petalLength * 0.2,
      0, 0
    );
    
    // Gradiente más suave y realista
    const gradient = ctx.createRadialGradient(
      0, petalLength * 0.3, size * 0.1,
      0, petalLength * 0.5, size * 1.2
    );
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(0.3, midColor);
    gradient.addColorStop(0.7, midColor);
    gradient.addColorStop(1, outerColor);
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Venas del pétalo más sutiles
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, petalLength);
    ctx.strokeStyle = outerColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Detalles y textura más realista
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-petalWidth * 0.3, petalLength * (0.2 + i * 0.2));
      ctx.quadraticCurveTo(
        0, petalLength * (0.3 + i * 0.2),
        petalWidth * 0.3, petalLength * (0.2 + i * 0.2)
      );
      ctx.strokeStyle = adjustColor(color, -10);
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    // Brillo en los bordes
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(
      petalWidth * 0.4, petalLength * 0.5,
      0, petalLength
    );
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
  }
}