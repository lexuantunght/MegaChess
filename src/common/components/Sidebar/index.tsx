import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoSettings, IoSettingsOutline } from 'react-icons/io5';
import Avatar from '@common/ui/Avatar';
import styles from './sidebar.module.css';

type SidebarProps = {
    items?: Array<{
        name: string;
        path: string;
        title: string;
        icon: JSX.Element;
        outlineIcon: JSX.Element;
    }>;
};

const Sidebar = ({ items = [] }: SidebarProps) => {
    const [focusedItem, setFocusedItem] = React.useState(-1);
    const location = useLocation();

    React.useEffect(() => {
        const focused = items.findIndex((item) => item.path === location.pathname);
        if (focused >= 0) {
            setFocusedItem(focused);
        }
    }, []);

    return (
        <div className={styles.container}>
            <Avatar src="https://picsum.photos/200" className={styles.avatar} />
            <div className={styles.tabs}>
                {items.map((item, index) => (
                    <Link
                        className={
                            focusedItem === index ? `${styles.tab} ${styles.focused}` : styles.tab
                        }
                        key={index}
                        to={item.path}
                        onClick={() => {
                            if (focusedItem !== index) {
                                setFocusedItem(index);
                            }
                        }}
                    >
                        {focusedItem === index ? item.icon : item.outlineIcon}
                    </Link>
                ))}
            </div>
            <button className={`${styles.tab} ${styles.setting}`}>
                <IoSettings size={30} className={styles.settingFocused} />
                <IoSettingsOutline size={30} className={styles.settingUnfocused} />
            </button>
        </div>
    );
};

export default Sidebar;
