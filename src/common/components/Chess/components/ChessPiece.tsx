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

type ChessPieceProps = {
    name: 'queen' | 'king' | 'knight' | 'pawn' | 'rook' | 'bishop';
    color: 'black' | 'white';
    position?: { v: number; h: string };
};

const ChessPiece = ({ name, color }: ChessPieceProps) => {
    const renderChessIcon = () => {
        switch (name) {
            case 'king':
                return <GiChessKing />;
            case 'queen':
                return <GiChessQueen />;
            case 'bishop':
                return <GiChessBishop />;
            case 'knight':
                return <GiChessKnight />;
            case 'pawn':
                return <GiChessPawn />;
            case 'rook':
                return <GiChessRook />;
        }
    };

    return <div className={styles.piece}>{renderChessIcon()}</div>;
};

export default ChessPiece;
