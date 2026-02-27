import { useState, useCallback, useEffect, useRef } from 'react';
import { SYMBOLS } from '../symbols';
import { sounds } from '../sounds';
import jackpotSfx from '../assets/symbols/floraphonic-playful-casino-slot-machine-jackpot-3-183921.mp3';
import reelStopSfx from '../assets/symbols/freesound_community-cash-register-purchase-87313(1).mp3';

const REEL_SPIN_DURATION = [2000, 4000, 6000]; // each reel stops 2s after the previous

export function useSlotMachine() {
    const [reels, setReels] = useState([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);
    const [spinning, setSpinning] = useState([false, false, false]);
    const [winner, setWinner] = useState(null); // symbol shown in popup, null = hidden
    const [popupLocked, setPopupLocked] = useState(false); // blocks spin while popup is open
    const audioRef = useRef(null); // jackpot MP3
    const reelAudioRef = useRef(null); // per-reel stop sound

    const dismissPopup = useCallback(() => {
        setWinner(null);
        setPopupLocked(false);
    }, []);

    const spin = useCallback(() => {
        if (spinning.some(Boolean) || popupLocked) return;

        // Resume AudioContext on first gesture (browser autoplay policy)
        const ac = sounds.getCtx();
        if (ac.state === 'suspended') ac.resume();

        setWinner(null);

        // Weighted random pick — respects each symbol's `weight` in symbols.js
        const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
        let rand = Math.random() * totalWeight;
        const picked = SYMBOLS.find(s => (rand -= s.weight) < 0) ?? SYMBOLS[0];
        const finalSymbols = [picked, picked, picked];

        setSpinning([true, true, true]);

        // Schedule spinning ticks via Web Audio clock
        const now = ac.currentTime;
        REEL_SPIN_DURATION.forEach((delay, i) => {
            const stopAt = now + delay / 1000;
            const startAt = i === 0 ? now : now + REEL_SPIN_DURATION[i - 1] / 1000;
            sounds.scheduleReelTicks(startAt, stopAt);
        });

        REEL_SPIN_DURATION.forEach((delay, i) => {
            setTimeout(() => {
                sounds.playStop();
                // Play the user's spin sound on each reel stop
                if (reelAudioRef.current) {
                    reelAudioRef.current.currentTime = 0;
                    reelAudioRef.current.play().catch(() => { });
                }

                setReels(prev => {
                    const next = [...prev];
                    next[i] = finalSymbols[i];
                    return next;
                });
                setSpinning(prev => {
                    const next = [...prev];
                    next[i] = false;
                    return next;
                });

                if (i === REEL_SPIN_DURATION.length - 1) {
                    setTimeout(() => {
                        // Show popup and play MP3
                        setWinner(picked);
                        setPopupLocked(true);

                        if (audioRef.current) {
                            audioRef.current.currentTime = 0;
                            audioRef.current.play().catch(() => { });
                        }
                    }, 150);
                }
            }, delay);
        });
    }, [spinning, popupLocked]);

    // Keyboard: Space or Tab triggers spin
    useEffect(() => {
        const handleKey = (e) => {
            if (e.code === 'Space' || e.code === 'Tab') {
                e.preventDefault();
                spin();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [spin]);

    const isSpinning = spinning.some(Boolean);

    return { reels, spinning, isSpinning, winner, dismissPopup, spin, audioRef, jackpotSfx, reelAudioRef, reelStopSfx };
}
