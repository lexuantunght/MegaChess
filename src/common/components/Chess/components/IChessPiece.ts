import ChessBoard from './ChessBoard';
import { ChessColor, ChessName, ChessPosition } from './types';

interface IChessPiece {
    getMovablePositions: () => Array<ChessPosition> | null;
    getCatchablePositions: (canMove?: boolean) => Array<ChessPosition> | null;
    getName: () => ChessName;
    getColor: () => ChessColor;
    getPosition: () => ChessPosition;
    setPosition: (_position: ChessPosition) => void;
    setChessBoard: (_chessBoard: ChessBoard) => void;
}

export default IChessPiece;
