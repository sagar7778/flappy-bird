import { CANVAS_HEIGHT } from '../utils/constants';

export class Pipe {
  id: number;
  x: number;
  y: number;
  width: number;
  gap: number;
  
  static idCounter = 0;
  
  constructor(x: number, y: number, width: number, gap: number) {
    this.id = Pipe.idCounter++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.gap = gap;
  }
  
  update(speed: number): void {
    this.x -= speed;
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    // Upper pipe
    this.drawPipe(ctx, 0, this.y);
    
    // Lower pipe
    this.drawPipe(ctx, this.y + this.gap, CANVAS_HEIGHT - (this.y + this.gap));
  }
  
  private drawPipe(ctx: CanvasRenderingContext2D, y: number, height: number): void {
    // Main pipe body
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
    gradient.addColorStop(0, '#43a047');
    gradient.addColorStop(0.5, '#66bb6a');
    gradient.addColorStop(1, '#43a047');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, y, this.width, height);
    
    // Pipe border
    ctx.strokeStyle = '#2e7d32';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, y, this.width, height);
    
    // Pipe end cap (top/bottom depending on which pipe)
    const capHeight = 20;
    const isUpperPipe = y === 0;
    const capY = isUpperPipe ? this.y - capHeight : this.y + this.gap;
    
    ctx.fillStyle = '#2e7d32';
    ctx.fillRect(this.x - 5, capY, this.width + 10, capHeight);
    
    // Highlight on the pipe
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(this.x + 5, y + 5, 3, height - 10);
  }
  
  // Get the collision rectangles for this pipe (upper and lower)
  getCollisionRects(): { x: number, y: number, width: number, height: number }[] {
    return [
      { x: this.x, y: 0, width: this.width, height: this.y },  // Upper pipe
      { x: this.x, y: this.y + this.gap, width: this.width, height: CANVAS_HEIGHT - (this.y + this.gap) }  // Lower pipe
    ];
  }
}