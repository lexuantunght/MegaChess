import React from 'react';
import styles from '../chess.module.css';
import ChessPiece, { ChessPieceProps } from './ChessPiece';
import defaultPieces from './default-pieces';

type ChessBoardProps = {
    className?: string;
    pieces?: Array<ChessPieceProps>;
};

const ChessBoard = ({ className, pieces = defaultPieces }: ChessBoardProps) => {
    const squares = React.useMemo(() => {
        const result: Array<{ v: number; h: number }> = [];
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                result.push({ v: j, h: i });
            }
        }
        return result;
    }, []);

    return (
        <div className={className ? `${className} ${styles.board}` : styles.board}>
            {squares.map((value, index) => (
                <div
                    className={`${styles.square} ${
                        (value.h + value.v) % 2 ? styles.squareBlack : styles.squareWhite
                    }`}
                    key={index}
                />
            ))}
            {pieces.map((piece, index) => (
                <ChessPiece
                    name={piece.name}
                    color={piece.color}
                    position={piece.position}
                    key={index}
                />
            ))}
        </div>
    );
};

export default ChessBoard;
