import React from 'react';
import styles from '../chess.module.css';

type ChessBoardProps = {
    className?: string;
};

const ChessBoard = ({ className }: ChessBoardProps) => {
    const squares = React.useMemo(() => {
        const result: Array<{ v: number; h: string }> = [];
        for (let i = 97; i <= 104; i++) {
            for (let j = 1; j <= 8; j++) {
                result.push({ v: j, h: String.fromCharCode(i) });
            }
        }
        return result;
    }, []);

    return (
        <div className={className ? `${className} ${styles.board}` : styles.board}>
            {squares.map((value, index) => (
                <div
                    className={`${styles.square} ${
                        (value.h.charCodeAt(0) + value.v) % 2 ? styles.black : styles.white
                    }`}
                    key={index}
                ></div>
            ))}
        </div>
    );
};

export default ChessBoard;
