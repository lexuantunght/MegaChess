import React from 'react';
import styles from './avatar.module.css';

type AvatarProps = {
    src?: string;
    className?: string;
};

const Avatar = ({ src, className = '' }: AvatarProps) => {
    return <img src={src} className={`${styles.avatar} ${className}`} />;
};

export default Avatar;
