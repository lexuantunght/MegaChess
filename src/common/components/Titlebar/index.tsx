import React from 'react';
import styles from './titlebar.module.css';

type TitlebarProps = {
    title?: string;
};

const Titlebar = ({ title = 'MegaChess' }: TitlebarProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
        </div>
    );
};

export default Titlebar;
