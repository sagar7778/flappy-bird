import { useState } from 'react';

type GameState = 'start' | 'playing' | 'gameOver';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState<number>(0);
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };
  
  const endGame = () => {
    setGameState('gameOver');
  };
  
  const resetGame = () => {
    setGameState('start');
  };
  
  const increaseScore = () => {
    setScore(prevScore => prevScore + 1);
  };
  
  return {
    gameState,
    score,
    startGame,
    endGame,
    resetGame,
    increaseScore
  };
};