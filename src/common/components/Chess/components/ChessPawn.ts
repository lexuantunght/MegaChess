import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessPawn implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private isMoved?: boolean;
    private chessBoard?: ChessBoard;

    constructor(_color: ChessColor, _position: ChessPosition) {
        this.name = 'pawn';
        this.color = _color;
        this.position = _position;
        this.isMoved = false;
    }

    public getMovablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.position.h + (this.color === 'white' ? 1 : -1);
        const v = this.position.v;
        if (this.chessBoard?.getSquare({ h, v })?.hasPiece()) {
            return null;
        }
        if (!this.isMoved) {
            result.push({ h: h + (this.color === 'white' ? 1 : -1), v });
        }
        result.push({ h, v });
        return result;
    };

    private isCatchablePos(_position: ChessPosition) {
        const piece = this.chessBoard?.getSquare(_position)?.getPiece();
        return piece && piece.getColor() !== this.color;
    }

    public getCatchablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.position.h + (this.color === 'white' ? 1 : -1);
        const v = this.position.v;

        if (this.isCatchablePos({ h, v: v + 1 })) {
            result.push({ h, v: v + 1 });
        }
        if (this.isCatchablePos({ h, v: v - 1 })) {
            result.push({ h, v: v - 1 });
        }
        return result;
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
        this.isMoved = true;
    };

    public setChessBoard(_chessBoard: ChessBoard) {
        this.chessBoard = _chessBoard;
    }
}

export default ChessPawn;
