import _isEqual from 'lodash-es/isEqual';
import ChessBishop from './ChessBishop';
import ChessKing from './ChessKing';
import ChessKnight from './ChessKnight';
import ChessPawn from './ChessPawn';
import ChessQueen from './ChessQueen';
import ChessRook from './ChessRook';
import ChessSquare from './ChessSquare';
import IChessPiece from './IChessPiece';
import { ChessPosition } from './types';

class ChessBoard {
    private chessSquares: Array<ChessSquare>;

    constructor() {
        this.chessSquares = [];
        this.initSquares();
    }

    private initSquares() {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                const square = new ChessSquare({ v: j, h: i }, (i + j) % 2 ? 'black' : 'white');
                let piece: IChessPiece | undefined;
                switch (i) {
                    case 1:
                        if (j === 1 || j === 8) {
                            piece = new ChessRook('white', { v: j, h: 1 });
                        }
                        if (j === 2 || j === 7) {
                            piece = new ChessKnight('white', { v: j, h: 1 });
                        }
                        if (j === 3 || j === 6) {
                            piece = new ChessBishop('white', { v: j, h: 1 });
                        }
                        if (j === 4) {
                            piece = new ChessQueen('white', { v: 4, h: 1 });
                        }
                        if (j === 5) {
                            piece = new ChessKing('white', { v: 5, h: 1 });
                        }
                        break;
                    case 2:
                        piece = new ChessPawn('white', { v: j, h: 2 });
                        break;
                    case 7:
                        piece = new ChessPawn('black', { v: j, h: 7 });
                        break;
                    case 8:
                        if (j === 1 || j === 8) {
                            piece = new ChessRook('black', { v: j, h: 8 });
                        }
                        if (j === 2 || j === 7) {
                            piece = new ChessKnight('black', { v: j, h: 8 });
                        }
                        if (j === 3 || j === 6) {
                            piece = new ChessBishop('black', { v: j, h: 8 });
                        }
                        if (j === 4) {
                            piece = new ChessQueen('black', { v: 4, h: 8 });
                        }
                        if (j === 5) {
                            piece = new ChessKing('black', { v: 5, h: 8 });
                        }
                        break;
                }
                piece?.setChessBoard(this);
                square.setPiece(piece);
                this.chessSquares.push(square);
            }
        }
    }

    public getChessSquares() {
        return this.chessSquares;
    }

    public getSquare(_position: ChessPosition) {
        return this.chessSquares.find((s) => _isEqual(s.getPosition(), _position));
    }

    public getPieces() {
        const pieces: Array<IChessPiece> = [];
        this.chessSquares.forEach((square) => {
            const piece = square.getPiece();
            if (piece) {
                pieces.push(piece);
            }
        });
        return pieces;
    }
}

export default ChessBoard;
