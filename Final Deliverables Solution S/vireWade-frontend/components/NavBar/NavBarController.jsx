import NavBarNotLogged from './NavBarNotLogged';
import React, { useEffect, useState } from "react";
import NavBarLogged from './NavBarLogged';

export default function NavBarController() {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(getToken());
    }, []);

    function getToken() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        if(userLocalStorage){
            return (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
        }
        return false;
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