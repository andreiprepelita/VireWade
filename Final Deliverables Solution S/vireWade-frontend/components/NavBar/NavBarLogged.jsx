import NavBar from './NavBar';
import {TbVinyl } from "react-icons/tb";

export default function NavBarLogged() {

    const ITEMS = [
        {
            label: 'Recommendation',
            href: '/recommendation'
        },
        {
            label: 'Profile',
            href: '/profile'
        },
        {
            label: 'Last Purchases',
            href: '/purchases'
        },
        {
            label: 'Playlist',
            href: '/playlist',
        },
        
    ];

    return (
        <NavBar items={ITEMS}></NavBar>
    );
}