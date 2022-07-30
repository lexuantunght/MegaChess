import React from 'react';
import _isEqual from 'lodash-es/isEqual';
import _isEmpty from 'lodash-es/isEmpty';
import styles from '../chess.module.css';
import ChessBoard from './ChessBoard';
import ChessPieceRenderer from './ChessPieceRenderer';
import ChessSquare from './ChessSquare';
import IChessPiece from './IChessPiece';
import { ChessPosition } from './types';

type ChessGameProps = {};

type ChessGameStates = {
    focused?: string;
    movablePositions: Array<ChessPosition> | null;
    catched: Array<IChessPiece>;
};

class ChessGame extends React.Component<ChessGameProps, ChessGameStates> {
    chessBoard: ChessBoard;

    constructor(props: ChessGameProps) {
        super(props);
        this.chessBoard = new ChessBoard();
        this.state = {
            focused: undefined,
            movablePositions: null,
            catched: [],
        };
    }

    generatePieceId(piece?: IChessPiece) {
        return (
            piece &&
            `${piece.getName()}_${piece.getColor()}_${piece.getPosition().v}_${
                piece.getPosition().h
            }`
        );
    }

    handleClickPiece(piece: IChessPiece) {
        const pieceId = this.generatePieceId(piece);
        // deselect if re-click
        if (pieceId === this.state.focused) {
            this.setState({
                focused: undefined,
                movablePositions: null,
            });
            return;
        }
        // catch enemy
        if (this.state.movablePositions?.some((pos) => _isEqual(pos, piece.getPosition()))) {
            this.setState({
                catched: [...this.state.catched, piece],
            });
            const square = this.chessBoard.getSquare(piece.getPosition());
            if (square) {
                square.setPiece();
                this.handlePieceMoving(square);
            }
            return;
        }
        // click piece
        const movablePos = piece.getMovablePositions() || [];
        const catchablePos = piece.getCatchablePositions?.() || [];
        if (_isEmpty(movablePos) && _isEmpty(catchablePos)) {
            this.setState({
                focused: pieceId,
                movablePositions: null,
            });
            return;
        }
        this.setState({
            focused: pieceId,
            movablePositions: [...movablePos, ...catchablePos],
        });
    }

    isMovableSquare(square: ChessSquare) {
        const { movablePositions } = this.state;
        if (!movablePositions || movablePositions.length === 0) {
            return false;
        }
        return movablePositions.some((pos) => _isEqual(pos, square.getPosition()));
    }

    handlePieceMoving(square: ChessSquare) {
        const currentSquare = this.chessBoard
            .getChessSquares()
            .find((square) => this.generatePieceId(square.getPiece()) === this.state.focused);
        if (currentSquare) {
            const piece = currentSquare.getPiece();
            piece?.setPosition(square.getPosition());
            this.setState({ focused: undefined, movablePositions: null }, () => {
                square.setPiece(piece);
                currentSquare.setPiece();
            });
        }
    }

    handleClickSquare(square: ChessSquare, isMove?: boolean) {
        if (isMove) {
            this.handlePieceMoving(square);
        }
    }

    render() {
        const { focused } = this.state;

        return (
            <div className={styles.board}>
                {this.chessBoard.getChessSquares().map((square, index) => {
                    const piece: IChessPiece | undefined = square.getPiece();
                    const isMovableSquare = this.isMovableSquare(square);
                    return (
                        <React.Fragment key={index}>
                            <div
                                className={`${styles.square} ${
                                    square.getColor() === 'black'
                                        ? styles.squareBlack
                                        : styles.squareWhite
                                } ${isMovableSquare ? styles.movable : styles.unmovable}`}
                                style={{
                                    gridColumn: square.getPosition().v,
                                    gridRow: 9 - square.getPosition().h,
                                }}
                                onClick={() => this.handleClickSquare(square, isMovableSquare)}
                            />
                            {piece && (
                                <ChessPieceRenderer
                                    name={piece.getName()}
                                    position={piece.getPosition()}
                                    color={piece.getColor()}
                                    onClick={() => this.handleClickPiece(piece)}
                                    isFocused={this.generatePieceId(piece) === focused}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
}

export default ChessGame;
