/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Gamepad2, Search, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const gamesList: Game[] = Array.isArray(gamesData) ? gamesData : ((gamesData as any)?.default || []);

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState<Game[]>(gamesList);

  useEffect(() => {
    const filtered = gamesList.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-xs font-medium uppercase tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors hidden md:block">
              Request Game
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Popular Games</h2>
                <p className="text-zinc-500 text-sm">Hand-picked unblocked titles for your break.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layoutId={game.id}
                    onClick={() => handleGameSelect(game)}
                    className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest bg-emerald-500 text-black px-2 py-1 rounded">Play Now</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{game.title}</h3>
                      <p className="text-zinc-500 text-sm line-clamp-2">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-zinc-500">No games found matching your search.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-4 h-[calc(100vh-12rem)]"
            >
              <div className="flex items-center justify-between gap-4">
                <button 
                  onClick={closeGame}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Back to Library</span>
                </button>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{selectedGame.title}</h2>
                  <span className="w-1 h-1 rounded-full bg-zinc-700 mx-2" />
                  <p className="text-zinc-500 text-sm hidden sm:block">{selectedGame.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                    <Maximize2 size={18} />
                  </button>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={closeGame}
                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group/player">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover/player:opacity-100 transition-opacity flex flex-col items-end gap-2">
                  <p className="text-[10px] text-zinc-500 bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm">Game not loading? Some providers block embedding.</p>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-black text-xs font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
                  >
                    <ExternalLink size={14} />
                    Open in New Tab
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs">
          <p>© 2026 Unblocked Games Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-100 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
