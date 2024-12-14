export class Tulip {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.angle = 0;
    this.swaySpeed = 0.02 + Math.random() * 0.02;
    this.swayAmount = 5 + Math.random() * 5;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.sin(this.angle) * 0.1);

    // Stem
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -this.size * 2);
    ctx.strokeStyle = '#2D5A27';
    ctx.lineWidth = this.size / 10;
    ctx.stroke();

    // Leaves
    this.drawLeaf(ctx, -this.size * 0.8, -this.size * 0.7, this.size * 0.5);
    this.drawLeaf(ctx, this.size * 0.8, -this.size, this.size * 0.5);

    // Flower petals
    ctx.translate(0, -this.size * 2);
    
    // Draw tulip petals
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 3);
      ctx.fillStyle = this.color;
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        this.size * 0.5,
        -this.size * 0.5,
        0,
        -this.size
      );
      ctx.quadraticCurveTo(
        -this.size * 0.5,
        -this.size * 0.5,
        0,
        0
      );
      ctx.fill();
    }

    ctx.restore();
  }

  drawLeaf(ctx, x, y, size) {
    ctx.beginPath();
    ctx.fillStyle = '#2D5A27';
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(
      x,
      y - size / 2,
      x / 2,
      y - size
    );
    ctx.quadraticCurveTo(
      0,
      y - size / 2,
      0,
      y
    );
    ctx.fill();
  }

  update() {
    this.angle += this.swaySpeed;
    this.x += Math.sin(this.angle) * this.swayAmount;
  }
}