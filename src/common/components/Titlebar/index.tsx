import React from 'react';
import { BiMinus, BiWindows, BiWindow } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './titlebar.module.css';
import './window-behavior.css';

type TitlebarProps = {
    title?: string;
};

const Titlebar = ({ title = 'MegaChess' }: TitlebarProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.dragable}>
                <span className={styles.title}>{title}</span>
            </div>
            <div className="window-button-controls" id="window-group-controls">
                <div className="window-buttons" id="window-button-min">
                    <BiMinus size={20} />
                </div>
                <div className="window-buttons" id="window-button-restore">
                    <BiWindows size={16} />
                </div>
                <div className="window-buttons" id="window-button-max">
                    <BiWindow size={16} />
                </div>
                <div className="window-buttons" id="window-button-close">
                    <IoCloseSharp size={20} />
                </div>
            </div>
        </div>
    );
};

export default Titlebar;
