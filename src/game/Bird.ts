export class Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = 0;
  }
  
  update(gravity: number): void {
    this.velocity += gravity;
    this.y += this.velocity;
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    // Bird body
    ctx.fillStyle = '#FFC107';
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width / 2, 
      this.y + this.height / 2, 
      this.width / 2, 
      this.height / 2, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
      this.x + this.width * 0.7, 
      this.y + this.height * 0.3, 
      this.width * 0.15, 
      0, Math.PI * 2
    );
    ctx.fill();
    
    // Pupil
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.x + this.width * 0.75, 
      this.y + this.height * 0.3, 
      this.width * 0.05, 
      0, Math.PI * 2
    );
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#FF5722';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2 - 5);
    ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2 + 5);
    ctx.closePath();
    ctx.fill();
    
    // Wing
    ctx.fillStyle = '#FFA000';
    
    // Animate wing based on velocity
    const wingOffset = Math.sin(Date.now() / 100) * 5;
    
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width * 0.3, 
      this.y + this.height * 0.6 + wingOffset, 
      this.width * 0.25, 
      this.height * 0.15, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
  }
}