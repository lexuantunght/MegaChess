import React from 'react';
import styles from './input.module.css';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    invalid?: boolean;
    inputType?: 'text' | 'number';
}

class Input extends React.Component<InputProps> {
    render() {
        const { inputType, disabled, invalid, className = '', ...rest } = this.props;
        return (
            <input
                {...rest}
                type="text"
                className={`${styles.textinput} ${disabled ? styles.disabled : ''} ${
                    invalid ? styles.invalid : ''
                } ${className}`}
            />
        );
    }
}

export default Input;
