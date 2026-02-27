import redBull from './assets/symbols/output-onlinepngtools.png';
import daim from './assets/symbols/output-onlinepngtools(2).png';
import snickers from './assets/symbols/output-onlinepngtools(3).png';

// ── Probabilities ─────────────────────────────────────────────────────────
// Set each symbol's probability as a decimal. Values MUST sum to 1.0.
// e.g. 0.5 = 50% chance, 0.3 = 30%, 0.2 = 20%
// ──────────────────────────────────────────────────────────────────────────
export const SYMBOLS = [
    { id: 'redbull', name: 'Daim', img: redBull, color: '#ffffffd4', weight: 0.2 },
    { id: 'daim', name: 'Red Bull', img: daim, color: '#ffffffd4', weight: 0.4 },
    { id: 'snickers', name: 'Snickers', img: snickers, color: '#ffffffd4', weight: 0.4 },
];
