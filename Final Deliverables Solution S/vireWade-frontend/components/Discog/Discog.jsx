import React, { Fragment } from "react";
import { Stack, Button, Spinner } from "@chakra-ui/react";
import Elements from "../Elements/Elements";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/image.jpg";
import { useNavigate, Navigate } from "react-router-dom"

function Discog() {

    
 
    const navigate = useNavigate()
    const [showVinyls, setShowVinyls] = useState(false);
    const [elements, setElements] = useState([]);
    const [discogsSecret, setDiscogsSecret] = useState('')
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [isAvailableDiscogs, setIsAvailableDiscogs] = useState(false)
    const [discogsToken, setDiscogsToken] = useState('')
    const [userIsAuth, setIsUserAuth] = useState(getToken());

    const fetchData = async (e) => {
        setRecomendationIsLoading(true)

        const discogToken = JSON.parse(sessionStorage.getItem('discog_token'));

        const requestOptions = {
            method: 'POST',
            
        }

        const data = await fetch(`http://127.0.0.1:8081/recommendation/discogs?discogsToken=${discogToken.userToken}&discogsTokenSecret=${discogToken.userTokenSecret}&pageNumber=1&numberOfItemsPerPage=5`,requestOptions)

        const vinylsJSON = await data.json()
        console.log('vinyls discog: ', vinylsJSON)
        const vinyls = vinylsJSON.records

        const albumArt = require('album-art')

        for (let vinyl of vinyls) {
            try {
                const art = await albumArt(vinyl['artist'], {album: vinyl['vinyl']})
                vinyl['imgPath'] = art
            } catch (e) {
                vinyl.imgPath = defaultImage;
                console.log(e);
            }
        }

        setElements(vinyls)
        setRecomendationIsLoading(false)
    };


    useEffect(() => {
        setIsUserAuth(getToken());

        if(sessionStorage.getItem('discog_token')) {
            setIsAvailableDiscogs(true);
        }
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
                onClick={isAvailableDiscogs ? () => { setShowVinyls(true); fetchData() } : () => {navigate('/profile')}}
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