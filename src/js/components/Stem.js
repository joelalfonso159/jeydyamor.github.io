import { createGradient } from '../utils/animation.js';
import { COLORS } from '../constants.js';

export class Stem {
  static draw(ctx, size, currentHeight, angle) {
    const stemGradient = createGradient(
      ctx,
      currentHeight,
      COLORS.STEM.HIGHLIGHT,
      COLORS.STEM.PRIMARY
    );

    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    ctx.bezierCurveTo(
      size * 0.2 * Math.sin(angle * 0.5),
      currentHeight * 0.5,
      size * 0.1 * Math.sin(angle * 0.5),
      currentHeight * 0.8,
      0,
      currentHeight
    );
    
    ctx.strokeStyle = stemGradient;
    ctx.lineWidth = size / 8;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}