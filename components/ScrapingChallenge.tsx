import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

export const ScrapingChallenge: React.FC = () => {
  const [player, setPlayer] = useState<Point>({ x: 10, y: 10 });
  const [dataPoint, setDataPoint] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null>(null);
  
  const gameLoopRef = useRef<number | null>(null);

  const generateDataPoint = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setPlayer({ x: 10, y: 10 });
    setDataPoint(generateDataPoint());
    setScore(0);
    setIsPaused(false);
    setIsGameOver(false);
    setDirection(null);
  };

  const togglePause = () => setIsPaused(!isPaused);

  const movePlayer = useCallback((dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    setPlayer(prev => {
      let newX = prev.x;
      let newY = prev.y;

      if (dir === 'UP') newY = Math.max(0, prev.y - 1);
      if (dir === 'DOWN') newY = Math.min(GRID_SIZE - 1, prev.y + 1);
      if (dir === 'LEFT') newX = Math.max(0, prev.x - 1);
      if (dir === 'RIGHT') newX = Math.min(GRID_SIZE - 1, prev.x + 1);

      return { x: newX, y: newY };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || isPaused) return;
      const key = e.key.toLowerCase();
      if (key === 'w') movePlayer('UP');
      if (key === 's') movePlayer('DOWN');
      if (key === 'a') movePlayer('LEFT');
      if (key === 'd') movePlayer('RIGHT');
      if (key === 'p') togglePause();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, isPaused, movePlayer]);

  useEffect(() => {
    if (player.x === dataPoint.x && player.y === dataPoint.y) {
      setScore(s => s + 100);
      setDataPoint(generateDataPoint());
    }
  }, [player, dataPoint, generateDataPoint]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              Scrape Arena v1.0
            </h2>
            <p className="text-slate-400 text-sm">Collect the data nodes using WASD</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Bytes Scraped</span>
              <div className="text-2xl font-mono text-emerald-400 font-bold tracking-tighter">{score.toLocaleString()}</div>
            </div>
            <button 
              onClick={togglePause}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              {isPaused ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="aspect-square w-full max-w-[500px] mx-auto bg-slate-950 rounded-xl border border-slate-800 relative shadow-inner overflow-hidden grid grid-cols-20 grid-rows-20">
          {isPaused && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-4">Paused</h3>
              <button 
                onClick={togglePause}
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all"
              >
                Resume
              </button>
            </div>
          )}

          {/* Player */}
          <div 
            className="absolute w-[5%] h-[5%] bg-indigo-500 rounded shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-75 z-20 flex items-center justify-center"
            style={{ 
              left: `${(player.x / GRID_SIZE) * 100}%`, 
              top: `${(player.y / GRID_SIZE) * 100}%` 
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full opacity-50"></div>
          </div>

          {/* Data Node */}
          <div 
            className="absolute w-[5%] h-[5%] bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10 animate-pulse"
            style={{ 
              left: `${(dataPoint.x / GRID_SIZE) * 100}%`, 
              top: `${(dataPoint.y / GRID_SIZE) * 100}%` 
            }}
          />

          {/* Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none opacity-10">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border border-slate-500/20"></div>
            ))}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-[200px] mx-auto">
          <div />
          <button 
            onClick={() => movePlayer('UP')}
            className="aspect-square bg-slate-800 active:bg-slate-700 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
          >
            W
          </button>
          <div />
          <button 
            onClick={() => movePlayer('LEFT')}
            className="aspect-square bg-slate-800 active:bg-slate-700 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
          >
            A
          </button>
          <button 
            onClick={() => movePlayer('DOWN')}
            className="aspect-square bg-slate-800 active:bg-slate-700 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
          >
            S
          </button>
          <button 
            onClick={() => movePlayer('RIGHT')}
            className="aspect-square bg-slate-800 active:bg-slate-700 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
          >
            D
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={resetGame}
            className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset Session
          </button>
        </div>
      </div>
    </div>
  );
};