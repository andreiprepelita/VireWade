import React, { useEffect, useState } from "react";
import NavBar from './NavBar';

export default function NavBarLogged() {



    function getUser() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        
        return userLocalStorage.payload;
    } 


    const ITEMS = [
        {
            label: 'Playlist Recommandation',
            href: '/playlists/file'
        },
        {
            label: 'Playlists',
            href: `/playlists/${getUser()}`,
        },
        {
            label: 'Last Purchases',
            href: '/purchases'
        },
        {
            label: 'Profile',
            href: `/profile/${getUser()}`
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