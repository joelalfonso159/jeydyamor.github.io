export class Leaf {
  static draw(ctx, x, y, size, color, angle) {
    ctx.save();
    ctx.translate(0, y);
    
    // Create gradient for leaf
    const gradient = ctx.createLinearGradient(0, 0, x, -size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.adjustColor(color, 20));
    
    ctx.fillStyle = gradient;
    
    // Enhanced leaf shape with curve
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      x * 0.8, -size * 0.2,
      x, -size * 0.6,
      x * 0.5, -size
    );
    ctx.bezierCurveTo(
      x * 0.2, -size * 0.8,
      0, -size * 0.2,
      0, 0
    );
    
    // Add leaf details
    ctx.fill();
    ctx.strokeStyle = this.adjustColor(color, -20);
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Add leaf vein
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(x * 0.5, -size * 0.5, x * 0.4, -size * 0.8);
    ctx.strokeStyle = this.adjustColor(color, -30);
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    ctx.restore();
  }

  static adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}