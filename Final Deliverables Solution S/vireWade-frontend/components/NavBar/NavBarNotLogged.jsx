import React from 'react';
import NavBar from './NavBar';

export default function NavBarNotLogged() {

    const ITEMS = [
        {
            label: 'Login',
            href: '/login'
        },
        {
            label: 'Register',
            href: '/register'
        },
    ];

    return (
        <NavBar items={ITEMS}></NavBar>
    );
}