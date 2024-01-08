import NavBarNotLogged from './NavBarNotLogged';
import React, { useEffect, useState } from "react";
import NavBarLogged from './NavBarLogged';

export default function NavBarController() {

    const [token, setToken] = useState(getToken());

    useEffect(() => {
        setToken(getToken());
    }, []);

    function getToken() {
        return sessionStorage.getItem('token')
    } 

    if (!token)
        return (
            <NavBarNotLogged></NavBarNotLogged>
        )
    else {
        return (
            <NavBarLogged></NavBarLogged>
        )
    }
}