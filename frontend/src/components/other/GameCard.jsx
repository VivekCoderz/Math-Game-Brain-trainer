import React from 'react';
import { Link } from 'react-router-dom';
function GameCard() {
  return (
    <div className="group relative h-[220px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1c2e] shadow-2xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20">
      
      {/* Background Image with Zoom Effect */}
      <img
        src="src/assets/image.png"
        alt="Math Game"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Darker Gradient overlay for that "Deep Space" feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1021] via-transparent to-black/20" />

      {/* Glassmorphism Bottom Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-[24px] border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/15">
        
        <div className="flex items-center gap-3">
          {/* Icon/Emoji Container */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/40 to-purple-600/40 text-2xl shadow-inner border border-white/10">
            🔢
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight text-white">Math Game</h2>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-300/80">
              Educational • Math
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Link to="/math-game">
        <button className="relative overflow-hidden rounded-xl bg-white px-6 py-2 text-sm font-extrabold uppercase tracking-tight text-black transition-all hover:bg-purple-500 active:scale-95">
          Play
        </button>
        </Link>
      </div>
    </div>
  );
}

export default GameCard;