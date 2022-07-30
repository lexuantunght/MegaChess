import React from 'react';
import IChessPiece from './IChessPiece';
import { ChessColor, ChessPosition } from './types';

class ChessSquare {
    private position: ChessPosition;
    private color: ChessColor;
    private piece?: IChessPiece;

    constructor(_position: ChessPosition, _color: ChessColor) {
        this.position = _position;
        this.color = _color;
    }

    public getPosition() {
        return this.position;
    }

    public getPiece() {
        return this.piece;
    }

    public getColor() {
        return this.color;
    }

    public setPiece(_piece?: IChessPiece) {
        this.piece = _piece;
    }

    public hasPiece() {
        return this.piece !== undefined;
    }
}

export default ChessSquare;
