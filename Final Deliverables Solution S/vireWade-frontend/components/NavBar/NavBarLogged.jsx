import React, { useEffect, useState } from "react";
import NavBar from './NavBar';

export default function NavBarLogged() {

    const ITEMS = [
        {
            label: 'Recommendation',
            href: '/'
        },
        {
            label: 'Playlist',
            href: '/playlist',
        },
        {
            label: 'Last Purchases',
            href: '/purchases'
        },
        {
            label: 'Profile',
            href: '/profile'
        },
        {
            label: 'Logout',
            href: '/login'
        }
    ];

    return (
        <NavBar items={ITEMS}></NavBar>
    );
}