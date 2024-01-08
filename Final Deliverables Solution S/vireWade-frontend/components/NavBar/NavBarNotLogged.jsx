import React from 'react';
import NavBar from './NavBar';

export default function NavBarNotLogged() {

    const ITEMS = [
        {
            label: 'Register',
            href: '/register'
        },
        {
            label: 'Login',
            href: '/login'
        },
    ];

    return (
        <NavBar items={ITEMS}></NavBar>
    );
}