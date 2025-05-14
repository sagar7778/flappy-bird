import React from 'react';
import { Bird as BirdIcon } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, highScore }) => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400 rounded-lg shadow-xl flex flex-col items-center justify-center text-white p-8 border-4 border-white/30 backdrop-blur-sm">
      <div className="animate-pulse mb-4">
        <h1 className="text-6xl font-bold mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Flappy Bird
        </h1>
      </div>
      
      <div className="relative my-8 animate-bounce">
        <div className="text-yellow-300 transform hover:scale-110 transition-transform duration-200">
          <BirdIcon size={80} strokeWidth={1.5} />
        </div>
      </div>
      
      {highScore > 0 && (
        <div className="mb-6 bg-white/30 backdrop-blur-md py-3 px-8 rounded-full shadow-lg">
          <p className="text-xl">High Score: <span className="font-bold text-yellow-300">{highScore}</span></p>
        </div>
      )}
      
      <button 
        onClick={onStart}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-full text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
      >
        Play Now
      </button>
      
      <div className="mt-12 bg-white/20 backdrop-blur-md p-6 rounded-xl max-w-sm shadow-lg border border-white/30">
        <h3 className="font-bold text-xl mb-3 text-yellow-300">How to Play</h3>
        <p className="text-lg leading-relaxed">
          Tap the screen or press spacebar to make the bird flap its wings! Navigate through the pipes and aim for your highest score.
        </p>
      </div>
    </div>
  );
};

export default StartScreen;