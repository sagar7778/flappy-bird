import React from 'react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-lg shadow-xl flex flex-col items-center justify-center text-white p-8 border-4 border-white/30">
      <h1 className="text-6xl font-bold mb-8 animate-bounce text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        Game Over!
      </h1>
      
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl mb-8 w-full max-w-sm border border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        <div className="mb-6 text-center">
          <p className="text-xl mb-2">Your Score</p>
          <p className="text-7xl font-bold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {score}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xl mb-2">High Score</p>
          <p className="text-4xl font-bold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {highScore}
          </p>
        </div>
      </div>
      
      <button 
        onClick={onRestart}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-full text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] mb-6"
      >
        Play Again
      </button>
      
      <p className="text-lg opacity-90 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
        Keep practicing to beat your high score!
      </p>
    </div>
  );
};

export default GameOver;