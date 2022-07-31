import ChessBoard from './ChessBoard';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessName, ChessPosition } from './types';

class ChessKnight implements IChessPiece {
    private name: ChessName;
    private color: ChessColor;
    private position: ChessPosition;
    private chessBoard?: ChessBoard;
    private isMoved?: boolean;

    constructor(_color: ChessColor, _position: ChessPosition) {
        this.name = 'knight';
        this.color = _color;
        this.position = _position;
    }

    public getMovablePositions = () => {
        const result: Array<ChessPosition> = [];
        const h = this.getPosition().h;
        const v = this.getPosition().v;
        [
            [1, 2],
            [2, 1],
            [2, -1],
            [-1, 2],
            [-2, 1],
            [1, -2],
            [-1, -2],
            [-2, -1],
        ].forEach((pair) => {
            const mH = h + pair[0];
            const mV = v + pair[1];
            let condition = mH >= 1 && mH <= 8 && mV >= 1 && mV <= 8;
            if (this.chessBoard) {
                const piece = this.chessBoard.getSquare({ h: mH, v: mV })?.getPiece();
                condition = condition && (!piece || piece.getColor() !== this.color);
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
        this.isMoved = true;
    };

    public setChessBoard(_chessBoard: ChessBoard) {
        this.chessBoard = _chessBoard;
    }

    public getIsMoved = () => {
        return this.isMoved;
    };
}

export default ChessKnight;
