import React from 'react';
import Button from '@shiba/Button';
import Loading from '@shiba/Loading';
import Header from '../../common/components/Header';

const menuItems = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Post',
        path: '/post',
    },
    {
        label: 'About me',
        path: 'about-me',
    },
];

const App = () => {
    return (
        <div className="test">
            <Header menuItems={menuItems} />
            <Button variant="warning">
                <span>Hello</span>
            </Button>
            <Loading />
        </div>
    );
};

export default App;
