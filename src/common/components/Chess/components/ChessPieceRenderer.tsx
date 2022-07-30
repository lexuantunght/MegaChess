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
import { ChessColor, ChessName, ChessPosition } from './types';

export type ChessPieceRendererProps = {
    name: ChessName;
    color: ChessColor;
    position: ChessPosition;
    onClick?: () => void;
    isFocused?: boolean;
};

const ChessPieceRenderer = ({
    name,
    color,
    position,
    onClick,
    isFocused,
}: ChessPieceRendererProps) => {
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

    return (
        <div
            ref={pieceRef}
            className={isFocused ? `${styles.piece} ${styles.pieceFocused}` : styles.piece}
            style={{ bottom: `${(position.h - 1) * 12.5}%`, left: `${(position.v - 1) * 12.5}%` }}
            onClick={onClick}
        >
            {renderChessIcon(
                `${styles.pieceIcon} ${color === 'white' ? styles.pieceWhite : styles.pieceBlack}`
            )}
        </div>
    );
};

export default ChessPieceRenderer;
