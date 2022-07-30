import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessRook implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private chessBoard?: ChessBoard;

    constructor(_color: ChessColor, _position: ChessPosition) {
        this.name = 'rook';
        this.color = _color;
        this.position = _position;
    }

    public getMovablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.position.h;
        const v = this.position.v;
        for (let i = h + 1; i <= 8; i++) {
            const square = this.chessBoard?.getSquare({ h: i, v });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: i, v });
                }
                break;
            }
            result.push({ h: i, v });
        }
        for (let i = h - 1; i >= 1; i--) {
            const square = this.chessBoard?.getSquare({ h: i, v });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: i, v });
                }
                break;
            }
            result.push({ h: i, v });
        }
        for (let i = v + 1; i <= 8; i++) {
            const square = this.chessBoard?.getSquare({ h, v: i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h, v: i });
                }
                break;
            }
            result.push({ h, v: i });
        }
        for (let i = v - 1; i >= 1; i--) {
            const square = this.chessBoard?.getSquare({ h, v: i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h, v: i });
                }
                break;
            }
            result.push({ h, v: i });
        }
        return result;
    };

    public getCatchablePositions = () => {
        return this.getMovablePositions();
    };

    public getName() {
        return this.name;
    }

    public getColor() {
        return this.color;
    }

    public getPosition = () => {
        return this.position;
    };

    public setPosition = (_position: ChessPosition) => {
        this.position = _position;
    };

    public setChessBoard(_chessBoard: ChessBoard) {
        this.chessBoard = _chessBoard;
    }
}

export default ChessRook;
