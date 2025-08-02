import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '../store/useAppStore';

export const Home = () => {
  const { actions } = useAppStore();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (name.trim()) {
      actions.changePlayerName(name);
      navigate('/game');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-8">Jogo da Velha</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          aria-label="Digite seu nome de jogador"
          className="px-4 py-2 mb-4 text-lg text-gray-800 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleStartGame}
          className="px-8 py-4 text-xl font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          disabled={!name.trim()}
        >
          Iniciar Jogo
        </button>
      </div>
    </main>
  );
};