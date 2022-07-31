import _isEqual from 'lodash-es/isEqual';
import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessKing implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private chessBoard?: ChessBoard;
    private isMoved?: boolean;

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

    private getOnlyMovablePositions = () => {
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

    public getMovablePositions = () => {
        const result = this.getOnlyMovablePositions();
        const castlingPos = this.getCastlingPositions();
        if (castlingPos) {
            result.push(...castlingPos);
        }
        return result;
    };

    public getCatchablePositions = () => {
        return this.getOnlyMovablePositions();
    };

    private getCastlingPositions = () => {
        if (this.isMoved || !this.chessBoard || !this.isSafeSquare(this.position)) {
            return null;
        }
        const result: Array<ChessPosition> = [];
        const h = this.color === 'white' ? 1 : 8;
        const nearRook = this.chessBoard.getSquare({ v: 8, h })?.getPiece();
        const farRook = this.chessBoard.getSquare({ v: 1, h })?.getPiece();
        const nearCondition =
            nearRook &&
            nearRook.getName() === 'rook' &&
            nearRook.getColor() === this.color &&
            !nearRook.getIsMoved();
        const farCondition =
            farRook &&
            farRook.getName() === 'rook' &&
            farRook.getColor() === this.color &&
            !farRook.getIsMoved();
        if (nearCondition) {
            let condition = true;
            for (let i = 6; i <= 7; i++) {
                const square = this.chessBoard.getSquare({ v: i, h });
                if (!square) {
                    condition = false;
                    break;
                }
                if (square.hasPiece() || !this.isSafeSquare(square.getPosition())) {
                    condition = false;
                    break;
                }
            }
            if (condition) {
                result.push({ v: 7, h });
            }
        }
        if (farCondition) {
            let condition = true;
            for (let i = 4; i >= 2; i--) {
                const square = this.chessBoard.getSquare({ v: i, h });
                if (!square) {
                    condition = false;
                    break;
                }
                if (square.hasPiece() || !this.isSafeSquare(square.getPosition())) {
                    condition = false;
                    break;
                }
            }
            if (condition) {
                result.push({ v: 3, h });
            }
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

    public getIsMoved = () => {
        return this.isMoved;
    };
}

export default ChessKing;
