import redBull from './assets/symbols/output-onlinepngtools.png';
import daim from './assets/symbols/output-onlinepngtools(2).png';
import bar from './assets/symbols/bar.png';
import kinder from './assets/symbols/kinder.png';

// ── Probabilities ─────────────────────────────────────────────────────────
// Set each symbol's probability as a decimal. Values MUST sum to 1.0.
// e.g. 0.5 = 50% chance, 0.3 = 30%, 0.2 = 20%
// ──────────────────────────────────────────────────────────────────────────
export const SYMBOLS = [
    { id: 'redbull', name: 'Daim', img: redBull, color: '#ffffffd4', weight: 0.25 },
    { id: 'daim', name: 'Red Bull', img: daim, color: '#ffffffd4', weight: 0.25 },
    { id: 'bar', name: 'Bar', img: bar, color: '#ffffffd4', weight: 0.25 },
    { id: 'kinder', name: 'Kinder', img: kinder, color: '#ffffffd4', weight: 0.25 },
];
