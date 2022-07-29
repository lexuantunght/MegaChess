import { ChessPieceProps } from './ChessPiece';

const defaultWhitePieces: Array<ChessPieceProps> = [
    {
        name: 'king',
        color: 'white',
        position: { v: 5, h: 1 },
    },
    {
        name: 'rook',
        color: 'white',
        position: { v: 1, h: 1 },
    },
    {
        name: 'rook',
        color: 'white',
        position: { v: 8, h: 1 },
    },
    {
        name: 'queen',
        color: 'white',
        position: { v: 4, h: 1 },
    },
    {
        name: 'knight',
        color: 'white',
        position: { v: 2, h: 1 },
    },
    {
        name: 'knight',
        color: 'white',
        position: { v: 7, h: 1 },
    },
    {
        name: 'bishop',
        color: 'white',
        position: { v: 3, h: 1 },
    },
    {
        name: 'bishop',
        color: 'white',
        position: { v: 6, h: 1 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 1, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 2, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 3, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 4, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 5, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 6, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 7, h: 2 },
    },
    {
        name: 'pawn',
        color: 'white',
        position: { v: 8, h: 2 },
    },
];

const defaultBlackPieces: Array<ChessPieceProps> = defaultWhitePieces.map((piece) => ({
    ...piece,
    color: 'black',
    position: piece.position ? { v: piece.position.v, h: 9 - piece.position.h } : undefined,
}));

const defaultPieces = [...defaultWhitePieces, ...defaultBlackPieces];

export default defaultPieces;
