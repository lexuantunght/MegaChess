import _isEqual from 'lodash-es/isEqual';
import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessKing implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private chessBoard?: ChessBoard;

    constructor(_color: ChessColor, _position: ChessPosition) {
        this.name = 'king';
        this.color = _color;
        this.position = _position;
    }

    private getNearPositions(_position: ChessPosition) {
        const nearPos: Array<ChessPosition> = [];
        [
            [1, 1],
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1],
            [-1, -1],
            [-1, 1],
            [1, -1],
        ].forEach((pair) => {
            const mH = _position.h + pair[0];
            const mV = _position.v + pair[1];
            if (mH >= 1 && mH <= 8 && mV >= 1 && mV <= 8) {
                nearPos.push({ h: mH, v: mV });
            }
        });
        return nearPos;
    }

    private isSafeSquare(_position: ChessPosition) {
        if (!this.chessBoard) {
            return true;
        }
        const pieces = this.chessBoard
            .getPieces()
            .filter((piece) => piece.getColor() !== this.color);
        let isSafe = true;
        for (const piece of pieces) {
            let catchablePos: Array<ChessPosition> | null;
            if (piece.getName() === 'king') {
                catchablePos = this.getNearPositions(piece.getPosition());
            } else {
                catchablePos = piece.getCatchablePositions();
            }
            if (catchablePos && catchablePos.some((pos) => _isEqual(pos, _position))) {
                isSafe = false;
                break;
            }
        }
        return isSafe;
    }

    public getMovablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.position.h;
        const v = this.position.v;
        [
            [1, 1],
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1],
            [-1, -1],
            [-1, 1],
            [1, -1],
        ].forEach((pair) => {
            const mH = h + pair[0];
            const mV = v + pair[1];
            let condition = mH >= 1 && mH <= 8 && mV >= 1 && mV <= 8;
            if (this.chessBoard) {
                const piece = this.chessBoard.getSquare({ h: mH, v: mV })?.getPiece();
                condition =
                    condition &&
                    (!piece || piece.getColor() !== this.color) &&
                    this.isSafeSquare({ h: mH, v: mV });
            }
            if (condition) {
                result.push({ h: mH, v: mV });
            }
        });
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

export default ChessKing;
