import React from 'react';
import { SlotMachine } from './components/SlotMachine';
import { useSlotMachine } from './hooks/useSlotMachine';
import './App.css';

export default function App() {
  const { reels, spinning, isSpinning, winner, dismissPopup, spin, audioRef, jackpotSfx, reelAudioRef, reelStopSfx } = useSlotMachine();

  return (
    <div className="app-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <main className="app-center">
        <SlotMachine
          reels={reels}
          spinning={spinning}
          isSpinning={isSpinning}
          winner={winner}
          dismissPopup={dismissPopup}
          onSpin={spin}
          audioRef={audioRef}
          jackpotSfx={jackpotSfx}
          reelAudioRef={reelAudioRef}
          reelStopSfx={reelStopSfx}
        />
      </main>
    </div>
  );
}
