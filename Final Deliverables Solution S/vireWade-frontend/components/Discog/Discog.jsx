import React, { Fragment } from "react";
import { Stack, Button, Spinner } from "@chakra-ui/react";
import Elements from "../Elements/Elements";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/image.jpg";
import { useNavigate, Navigate } from "react-router-dom"

function Discog() {

    // function getToken() {
    //     const tokenString = sessionStorage.getItem('token')
    //     return tokenString
    // }
 
    const navigate = useNavigate()
    const [showVinyls, setShowVinyls] = useState(false);
    const [elements, setElements] = useState([]);
    const [discogsSecret, setDiscogsSecret] = useState('')
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [isAvailableDiscogs, setIsAvailableDiscogs] = useState(false)
    const [discogsToken, setDiscogsToken] = useState('')
    const [userIsAuth, setIsUserAuth] = useState(getToken());

    // async function getProfileData(user) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${getToken()}`
    //         },
    //         body: JSON.stringify({
    //         })
    //     }

    //     const profileURL = ``
    //     const res = await fetch(profileURL, requestOptions)
    //     res.json()
    //         .then(res => {
    //             if (res.userData.discogs_secret && res.userData.discogs_token) {

    //                 setDiscogsSecret(res.userData.discogs_secret)
    //                 setDiscogsToken(res.userData.discogs_token)
    //                 setIsAvailableDiscogs(true)
    //             }
    //         })
    //     return res
    // }

    // useEffect(() => {

    //     const user = getToken()
    //     getProfileData(user.sub)
    // }, []);

    // const fetchData = async (e) => {
    //     setRecomendationIsLoading(true)
    //     const data = await fetch(``)

    //     const vinylsJSON = await data.json()
    //     const vinyls = vinylsJSON.results

    //     const albumArt = require('album-art')

    //     for (let vinyl of vinyls) {
    //         try {
    //             const art = await albumArt(vinyl['artist'], {album: vinyl['vinyl']})
    //             vinyl['imgPath'] = art
    //         } catch (e) {
    //             vinyl.imgPath = defaultImage;
    //             console.log(e);
    //         }
    //     }

    //     setElements(vinyls)
    //     setRecomendationIsLoading(false)
    // };


    useEffect(() => {
        setIsUserAuth(getToken());
    }, []);

    function getToken() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        let result;
        if(userLocalStorage){
            result = (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
            console.log("Discog result is working: ", result)
            return result;
        }
        console.log("result not working ", result)
        return false;
    }


    return (
        <Fragment>
            { userIsAuth ? 
        <Stack>

            <Button
                mt={5}
                colorScheme='orange'
                type='submit'
                padding={'20px'}
                width='30%'
                alignSelf={'center'}
                // onClick={isAvailableDiscogs ? () => { setShowVinyls(true); fetchData() } : () => {navigate('/profile')}}
            >
               {isAvailableDiscogs ? "Get recommandations based on Discog information" : "Connect to Discogs"}
            </Button>
            {showVinyls ?
                recomendationIsLoading
                    ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='teal.500'
                        size='xl'
                        alignSelf={'center'}
                    />
                    :
                    <Elements elements={elements} />
                : null
            }
        </Stack >
         : <Navigate to="/" replace={true}/> }
        </Fragment>
    )

}

export default Discog;