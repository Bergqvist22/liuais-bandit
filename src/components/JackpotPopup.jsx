import React, { useEffect } from 'react';
import './JackpotPopup.css';

export function JackpotPopup({ symbol, onDone }) {
    // Auto-dismiss after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onDone, 3000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div className="popup-overlay" onClick={onDone}>
            <div className="popup-card" onClick={e => e.stopPropagation()}>
                <div className="popup-stars">★ ★ ★</div>
                <h2 className="popup-title">JACKPOT!</h2>
                <div className="popup-img-wrap">
                    <img src={symbol.img} alt={symbol.name} className="popup-img" />
                </div>
                <p className="popup-label">{symbol.name}</p>
                <div className="popup-progress">
                    <div className="popup-progress-bar" />
                </div>
            </div>
        </div>
    );
}
