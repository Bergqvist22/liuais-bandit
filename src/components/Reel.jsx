import React, { useRef, useEffect, useState } from 'react';
import './Reel.css';
import { SYMBOLS } from '../symbols';

export function Reel({ symbol, spinning }) {
    const stripRef = useRef(null);
    const [displaySymbols, setDisplaySymbols] = useState(SYMBOLS);

    useEffect(() => {
        if (spinning) {
            const shuffled = [...SYMBOLS].sort(() => Math.random() - 0.5);
            setDisplaySymbols([...shuffled, ...shuffled, symbol]);
        }
    }, [spinning, symbol]);

    return (
        <div className="reel-window">
            <div className={`reel-strip ${spinning ? 'reel-strip--spinning' : ''}`} ref={stripRef}>
                {spinning
                    ? displaySymbols.map((s, i) => (
                        <div className="reel-cell" key={i}>
                            <img src={s.img} alt={s.name} draggable={false} />
                        </div>
                    ))
                    : (
                        <div className="reel-cell reel-cell--result" style={{ '--glow': symbol.color }}>
                            <img src={symbol.img} alt={symbol.name} draggable={false} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
