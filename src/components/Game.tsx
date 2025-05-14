import React, { useEffect, useRef, useState } from 'react';
import { Bird } from '../game/Bird';
import { Pipe } from '../game/Pipe';
import { checkCollision } from '../utils/collision';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY, JUMP_FORCE, PIPE_GAP, PIPE_SPEED, PIPE_WIDTH } from '../utils/constants';

interface GameProps {
  onGameOver: () => void;
  onScore: () => void;
  playJumpSound: () => void;
  playScoreSound: () => void;
  playHitSound: () => void;
}

const Game: React.FC<GameProps> = ({ 
  onGameOver, 
  onScore,
  playJumpSound,
  playScoreSound,
  playHitSound
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bird, setBird] = useState<Bird>(new Bird(50, 200, 30, 30));
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [lastPipeTime, setLastPipeTime] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const animationRef = useRef<number>(0);
  const scoreCheckRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleClick = () => {
      if (isGameActive) {
        bird.velocity = -JUMP_FORCE;
        playJumpSound();
      }
    };

    canvas.addEventListener('click', handleClick);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && isGameActive) {
        bird.velocity = -JUMP_FORCE;
        playJumpSound();
      }
    });

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isGameActive) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced background with gradient and clouds
      drawBackground(ctx);
      drawClouds(ctx, time);

      bird.update(GRAVITY);
      bird.draw(ctx);

      if (time - lastPipeTime > 2000) { // Increased time between pipes
        const pipeY = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
        pipes.push(new Pipe(canvas.width, pipeY, PIPE_WIDTH, PIPE_GAP));
        setLastPipeTime(time);
        setPipes([...pipes]);
      }

      const updatedPipes = [];
      for (const pipe of pipes) {
        pipe.update(PIPE_SPEED);
        pipe.draw(ctx);

        if (!scoreCheckRef.current.has(pipe.id) && bird.x > pipe.x + pipe.width) {
          onScore();
          playScoreSound();
          scoreCheckRef.current.add(pipe.id);
        }

        if (pipe.x + pipe.width > 0) {
          updatedPipes.push(pipe);
        }
      }
      setPipes(updatedPipes);

      if (
        bird.y <= 0 || 
        bird.y + bird.height >= canvas.height ||
        pipes.some(pipe => checkCollision(bird, pipe))
      ) {
        setIsGameActive(false);
        playHitSound();
        onGameOver();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [bird, pipes, isGameActive, lastPipeTime, onGameOver, onScore, playJumpSound, playScoreSound, playHitSound]);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Enhanced sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a91ff');
    gradient.addColorStop(0.5, '#64b5f6');
    gradient.addColorStop(1, '#bbdefb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Enhanced ground with multiple layers
    const groundHeight = 40;
    
    // Back layer (darker)
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(0, CANVAS_HEIGHT - groundHeight, CANVAS_WIDTH, groundHeight);
    
    // Middle layer
    ctx.fillStyle = '#795548';
    ctx.fillRect(0, CANVAS_HEIGHT - groundHeight + 10, CANVAS_WIDTH, 20);
    
    // Top layer (grass)
    ctx.fillStyle = '#8BC34A';
    ctx.fillRect(0, CANVAS_HEIGHT - groundHeight - 5, CANVAS_WIDTH, 15);
    
    // Grass detail
    ctx.fillStyle = '#9CCC65';
    for (let i = 0; i < CANVAS_WIDTH; i += 15) {
      const height = Math.random() * 5 + 5;
      ctx.fillRect(i, CANVAS_HEIGHT - groundHeight - 5, 2, -height);
    }
  };

  const drawClouds = (ctx: CanvasRenderingContext2D, time: number) => {
    const cloudPositions = [
      { x: (time * 0.02) % (CANVAS_WIDTH + 200) - 100, y: 50 },
      { x: ((time * 0.015) + 200) % (CANVAS_WIDTH + 200) - 100, y: 120 },
      { x: ((time * 0.025) + 400) % (CANVAS_WIDTH + 200) - 100, y: 180 }
    ];

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    cloudPositions.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.arc(x + 15, y - 10, 15, 0, Math.PI * 2);
      ctx.arc(x + 25, y + 5, 18, 0, Math.PI * 2);
      ctx.arc(x + 40, y, 15, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  return (
    <canvas 
      ref={canvasRef} 
      width={CANVAS_WIDTH} 
      height={CANVAS_HEIGHT}
      className="border-4 border-white/30 rounded-lg shadow-2xl bg-sky-300"
    />
  );
};

export default Game;