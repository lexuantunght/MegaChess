import React from 'react';
import ChessBoard from './components/ChessBoard';
import ChessPiece from './components/ChessPiece';

const Chess = () => {
    return (
        <div style={{ height: '32rem', width: '32rem' }}>
            <ChessBoard />
        </div>
    );
};

export default Chess;
