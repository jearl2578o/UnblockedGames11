import React, { useState, useEffect } from 'react';
import { Search, Gamepad2, X, Maximize2 } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const list = Array.isArray(gamesData) ? gamesData : (gamesData.default || []);
    setGames(list);
  }, []);

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20">
            <Gamepad2 className="w-6 h-6 text-zinc-950" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Unblocked Hub</h1>
        </div>

        <div className="relative max-w-md w-full mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div 
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-100">{game.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Unblocked</p>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>No games found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 p-4 md:p-10">
          <div className="relative w-full h-full max-w-6xl bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold">{selectedGame.title}</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open(selectedGame.url, '_blank')}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                  title="Open in new tab"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Game Iframe */}
            <div className="flex-1 bg-black">
              <iframe
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-10 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>© 2026 Unblocked Hub. All games are property of their respective owners.</p>
      </footer>
    </div>
  );
}
