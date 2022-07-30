import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessBishop implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private chessBoard?: ChessBoard;

    constructor(_color: ChessColor, _position: ChessPosition) {
        this.name = 'bishop';
        this.color = _color;
        this.position = _position;
    }

    public getMovablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.position.h;
        const v = this.position.v;
        let i = 1;
        while (h + i <= 8 && v + i <= 8) {
            const square = this.chessBoard?.getSquare({ h: h + i, v: v + i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: h + i, v: v + i });
                }
                break;
            }
            result.push({ h: h + i, v: v + i });
            i++;
        }
        i = 1;
        while (h - i >= 1 && v - i >= 1) {
            const square = this.chessBoard?.getSquare({ h: h - i, v: v - i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: h - i, v: v - i });
                }
                break;
            }
            result.push({ h: h - i, v: v - i });
            i++;
        }
        i = 1;
        while (h + i <= 8 && v - i >= 1) {
            const square = this.chessBoard?.getSquare({ h: h + i, v: v - i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: h + i, v: v - i });
                }
                break;
            }
            result.push({ h: h + i, v: v - i });
            i++;
        }
        i = 1;
        while (h - i >= 1 && v + i <= 8) {
            const square = this.chessBoard?.getSquare({ h: h - i, v: v + i });
            if (square?.hasPiece()) {
                if (square.getPiece()?.getColor() !== this.color) {
                    result.push({ h: h - i, v: v + i });
                }
                break;
            }
            result.push({ h: h - i, v: v + i });
            i++;
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

export default ChessBishop;
