// Sound engine using the Web Audio API — no external files needed
let ctx = null;

function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
}

// Mechanical "tick" click — mimics a reel notch passing
function playTick(time, volume = 0.18) {
    const ac = getCtx();
    const buf = ac.createBuffer(1, ac.sampleRate * 0.04, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.008));
    }
    const src = ac.createBufferSource();
    src.buffer = buf;
    const gain = ac.createGain();
    gain.gain.value = volume;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start(time);
}

// Schedule rapid ticks for one reel over [startTime, stopTime]
function scheduleReelTicks(startTime, stopTime) {
    const ac = getCtx();
    const duration = stopTime - startTime;
    // Start fast (every 60ms) and slow down toward stop
    for (let t = 0; t < duration; t++) {
        // Exponential slowdown: density decreases toward end
        const progress = t / duration;
        const interval = 0.06 + progress * 0.22; // 60ms → 280ms
        const tickTime = startTime + t * interval * 0.1;
        if (tickTime < stopTime) playTick(tickTime);
    }
}

// Fanfare: short ascending arpeggio on jackpot
function playJackpot() {
    const ac = getCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ac.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.3, ac.currentTime + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(ac.currentTime + i * 0.12);
        osc.stop(ac.currentTime + i * 0.12 + 0.5);
    });

    // Coin shimmer layer
    const shimmerOsc = ac.createOscillator();
    const shimmerGain = ac.createGain();
    shimmerOsc.type = 'triangle';
    shimmerOsc.frequency.setValueAtTime(1200, ac.currentTime + 0.3);
    shimmerOsc.frequency.linearRampToValueAtTime(400, ac.currentTime + 0.9);
    shimmerGain.gain.setValueAtTime(0.15, ac.currentTime + 0.3);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.9);
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ac.destination);
    shimmerOsc.start(ac.currentTime + 0.3);
    shimmerOsc.stop(ac.currentTime + 1.0);
}

// Reel stop "thunk"
function playStop() {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.15);
}

export const sounds = { scheduleReelTicks, playJackpot, playStop, getCtx };
