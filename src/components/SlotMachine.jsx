import React from 'react';
import { Reel } from './Reel';
import { JackpotPopup } from './JackpotPopup';
import logo from '../assets/symbols/AI Society (LiU) White.png';
import './SlotMachine.css';

export function SlotMachine({ reels, spinning, isSpinning, winner, dismissPopup, onSpin, audioRef, jackpotSfx, reelAudioRef, reelStopSfx }) {
    return (
        <>
            {/* Hidden audio elements */}
            <audio ref={audioRef} src={jackpotSfx} preload="auto" />
            <audio ref={reelAudioRef} src={reelStopSfx} preload="auto" />

            {/* Jackpot popup overlay */}
            {winner && <JackpotPopup symbol={winner} onDone={dismissPopup} />}

            <div className="machine-wrapper">
                {/* Left logo */}
                <div className="logo-panel logo-panel--left">
                    <img src={logo} alt="AI Society LiU" className="logo-img" />
                </div>

                {/* Main machine body */}
                <div className={`machine ${winner ? 'machine--jackpot' : ''}`}>
                    {/* Header */}
                    <div className="machine-header">
                        <span className="neon-text neon-text--gold">★</span>
                        <h1 className="neon-text neon-text--purple">LiU AI Society</h1>
                        <span className="neon-text neon-text--gold">★</span>
                    </div>

                    {/* Reels */}
                    <div className="reels-row">
                        {reels.map((symbol, i) => (
                            <Reel key={i} symbol={symbol} spinning={spinning[i]} />
                        ))}
                    </div>

                    {/* Spin button */}
                    <div className="spin-btn-wrap">
                        <button
                            className={`spin-btn ${isSpinning ? 'spin-btn--disabled' : ''}`}
                            onClick={onSpin}
                            disabled={isSpinning}
                            id="spin-button"
                        >
                            {isSpinning ? 'SPINNING...' : 'SPIN'}
                        </button>
                        <p className="key-hint">SPACE / TAB</p>
                    </div>

                    {/* Decorative corner screws */}
                    <div className="screws">
                        <div className="screw" /><div className="screw" />
                        <div className="screw" /><div className="screw" />
                    </div>
                </div>

                {/* Right logo */}
                <div className="logo-panel logo-panel--right">
                    <img src={logo} alt="AI Society LiU" className="logo-img" />
                </div>
            </div>
        </>
    );
}
