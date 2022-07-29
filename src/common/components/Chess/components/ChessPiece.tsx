import React from 'react';
import {
    GiChessQueen,
    GiChessKing,
    GiChessBishop,
    GiChessRook,
    GiChessPawn,
    GiChessKnight,
} from 'react-icons/gi';
import styles from '../chess.module.css';

export type ChessPieceProps = {
    name: 'queen' | 'king' | 'knight' | 'pawn' | 'rook' | 'bishop';
    color: 'black' | 'white';
    position?: { v: number; h: number };
};

const ChessPiece = ({ name, color, position }: ChessPieceProps) => {
    const pieceRef = React.useRef<HTMLDivElement>(null);
    const renderChessIcon = (className?: string) => {
        switch (name) {
            case 'king':
                return <GiChessKing className={className} />;
            case 'queen':
                return <GiChessQueen className={className} />;
            case 'bishop':
                return <GiChessBishop className={className} />;
            case 'knight':
                return <GiChessKnight className={className} />;
            case 'pawn':
                return <GiChessPawn className={className} />;
            case 'rook':
                return <GiChessRook className={className} />;
        }
    };

    const getMovableSquares = () => {};

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        if (pieceRef.current) {
            pieceRef.current.style.top = e.clientY.toString();
            pieceRef.current.style.left = e.clientX.toString();
        }
    };

    if (!position) {
        return null;
    }

    return (
        <div
            ref={pieceRef}
            className={styles.piece}
            style={{ bottom: `${(position.h - 1) * 12.5}%`, left: `${(position.v - 1) * 12.5}%` }}
            onDrag={handleDrag}
        >
            {renderChessIcon(
                `${styles.pieceIcon} ${color === 'white' ? styles.pieceWhite : styles.pieceBlack}`
            )}
        </div>
    );
};

export default ChessPiece;
