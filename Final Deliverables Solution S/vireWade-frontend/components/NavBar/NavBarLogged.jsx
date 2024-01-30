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
            href: '/playlists/1',
        },
        {
            label: 'Last Purchases',
            href: '/purchases'
        },
        {
            label: 'Profile',
            href: '/profile/1'
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