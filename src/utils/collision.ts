import { Bird } from '../game/Bird';
import { Pipe } from '../game/Pipe';

export function checkCollision(bird: Bird, pipe: Pipe): boolean {
  const pipeRects = pipe.getCollisionRects();
  
  for (const rect of pipeRects) {
    if (
      bird.x < rect.x + rect.width &&
      bird.x + bird.width > rect.x &&
      bird.y < rect.y + rect.height &&
      bird.y + bird.height > rect.y
    ) {
      return true;
    }
  }
  
  return false;
}