import { Box, Flex } from '@chakra-ui/react';
import '../Login/LoginForm.css'
import React, { useState, useEffect, Fragment } from 'react';
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Heading, Text, Link, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import {Navigate } from 'react-router-dom';
import './Profile.css'

function Profile() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isDisabledDiscogs, setIsDisablesDicsogs] = useState(false)
    const [discogsToken, setDiscogsToken] = useState("");
    const [isLastFmDisabled, setIsDisabledLastFm] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [userIsAuth, setIsUserAuth] = useState(getToken());

    const navigate = useNavigate()

    useEffect(() => {

        setIsUserAuth(getToken());

        if(searchParams.get("oauth_verifier") && searchParams.get("oauth_token")) {

        
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `${searchParams.get("oauth_token")}`
                }
            }

            const access_token_url = `https://recommendation-api-0q3l.onrender.com/discogs/access_token?verifier=${searchParams.get("oauth_verifier")}`
            const res = await fetch(access_token_url, requestOptions)
            console.log("CHECK discogs")
            return res
        }

        const oauth_verifier = searchParams.get("oauth_verifier")

        const getStatus = async () => {
            if (oauth_verifier) {
                const res = await fetchData()

                res.json().then(res => {
                    if (res) {
                        console.log("RES is ", res)
                        sessionStorage.setItem("discog_token", JSON.stringify({'userToken': res.userToken, 'userTokenSecret': res.userTokenSecret}))
                        setShowAlert(true)

                        setTimeout(() => {
                            setShowAlert(false);
                          }, 3000);
                    }
                })
                    .catch(console.error);
            }
        }

        getStatus()
        navigate('/')
    }
    }, []);

    const onSubmitDiscogs = async (e) => {

        if(!sessionStorage.getItem('discog_token')) {
            const res = await fetch('https://recommendation-api-0q3l.onrender.com/discogs/request_token')
            const token = await res.json()
            window.location.replace(token.authorizationURL);
        } else {
            sessionStorage.removeItem('discog_token')
            window.location.reload('/')
        }
        
    }

    const onSpotifySubmit = () => {
        if(!sessionStorage.getItem('spotify_token')) {
            window.location.replace("http://localhost:8888/spotify/login");
        } else {
            sessionStorage.removeItem('spotify_token')
            window.location.reload()
        }
    }

    const backToProfile = () => {
        setErrors(false)
    }

    if (hasError) {

        return (<Text color='tomato' fontSize='2xl' >We have encountered an error, please <Link fontWeight={'extrabold'} onClick={backToProfile} color='red' >try again</Link></Text>)
    }

    const handleLogout = () => {
    
        sessionStorage.removeItem('discog-token')
        sessionStorage.removeItem('spotify-token');
        window.location.reload();
    }


    function getToken() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        if(userLocalStorage){
            return (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
        }
        return false;
    }


    return (
        <Fragment>
            { userIsAuth? 
        <Flex className='authForm' gap='4' justify='space-between' margin={'20vh'} width={'fit-content'}>
            {showAlert && (
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>Connected</AlertTitle>
                    <AlertDescription>Connected to Discogs</AlertDescription>
                </Alert>
            )}
            <Flex className='titleForm'>
                <Heading size='lg' as='h3' className='profile_title'>
                    Profile
                </Heading>
            </Flex>

            <Box width={'500px'}>
                    <Button
                        type='submit'
                        className='full submitButton'
                        colorScheme={sessionStorage.getItem('spotify_token') ? 'red' : 'orange'}
                        onClick={onSpotifySubmit}
                        >
                            {sessionStorage.getItem('spotify_token') ? 'Disconnect from Spotify' : 'Associate account with Spotify'}
                        
                    </Button>
                
            </Box>
            <Box width={'500px'}>
                <Button
                    disabled={isDisabledDiscogs}
                    className='submitButton full'
                    type='submit'
                    width='fit-content'
                    onClick={onSubmitDiscogs}
                    colorScheme={sessionStorage.getItem('discog_token') ? 'red' : 'orange'}>
                    {sessionStorage.getItem('discog_token') ? 'Disconnect from Discogs' : 'Associate account with Discogs'}
                </Button>
            </Box>

            <Box width={'250px'}>
                <Button
                    disabled={isDisabledDiscogs}
                    className='full submitButton'
                    width='fit-content'
                    onClick={handleLogout}
                    type='submit'
                    colorScheme='red'>
                    Logout out of all accounts
                </Button>
            </Box>

        </Flex>
        : <Navigate to="/" replace={true}/> }
        </Fragment>
    )
}

export default Profile;