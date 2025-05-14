import React, { useEffect, useState } from 'react';
import Game from './Game';
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import { useGameState } from '../hooks/useGameState';
import { useSound } from '../hooks/useSound';

const FlappyBird: React.FC = () => {
  const { 
    gameState, 
    score, 
    startGame, 
    endGame, 
    increaseScore, 
    resetGame 
  } = useGameState();
  
  const [highScore, setHighScore] = useState<number>(() => {
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  const { 
    playJumpSound, 
    playScoreSound, 
    playHitSound 
  } = useSound();

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="w-full max-w-md relative">
      <div className="relative">
        {gameState === 'playing' && (
          <div className="absolute top-5 right-5 z-10 bg-yellow-400 px-4 py-2 rounded-full font-bold text-xl shadow-md">
            {score}
          </div>
        )}
        
        {gameState === 'start' && (
          <StartScreen onStart={startGame} highScore={highScore} />
        )}
        
        {gameState === 'playing' && (
          <Game 
            onGameOver={endGame} 
            onScore={increaseScore}
            playJumpSound={playJumpSound}
            playScoreSound={playScoreSound}
            playHitSound={playHitSound}
          />
        )}
        
        {gameState === 'gameOver' && (
          <GameOver 
            score={score} 
            highScore={highScore} 
            onRestart={resetGame} 
          />
        )}
      </div>
    </div>
  );
};

export default FlappyBird;