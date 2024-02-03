import NavBarNotLogged from './NavBarNotLogged';
import React, { useEffect, useState } from "react";
import NavBarLogged from './NavBarLogged';

export default function NavBarController({navbar}) {

    const [token, setToken] = useState(getToken());

    function getToken() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        if(userLocalStorage){
            return (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
        }
        return false;
    }
    
    useEffect(() => {
        setToken(getToken())
    }, [navbar])

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