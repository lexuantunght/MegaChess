import React from 'react';
import styles from './header.module.css';
import Button from '@shiba/Button';
import Input from '@shiba/Input';
import { FaBars } from 'react-icons/fa';
import Drawer from '@shiba/Drawer';

type HeaderProps = {
    menuItems?: Array<{ label: string; path: string }>;
};

const Header = ({ menuItems = [] }: HeaderProps) => {
    const [showMenu, setShowMenu] = React.useState(false);
    return (
        <div className={`${styles.header} responsive`}>
            <span className={styles.brand}>Shibaer</span>
            <div className={styles.menu}>
                {menuItems.map((item, index) => (
                    <Button key={index} mode="text" className={styles.menubutton}>
                        {item.label}
                    </Button>
                ))}
            </div>
            <form className={styles.searchbox}>
                <Input placeholder="Search..." className={styles.searchinput} />
                <Button className={styles.searchbutton}>Search</Button>
            </form>
            <div className={styles.toggle}>
                <Button onClick={() => setShowMenu(true)}>
                    <FaBars />
                </Button>
            </div>
            <Drawer show={showMenu} onClose={() => setShowMenu(false)} />
        </div>
    );
};

export default Header;
