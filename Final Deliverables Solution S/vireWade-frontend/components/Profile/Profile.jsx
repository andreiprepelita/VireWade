import { Flex } from '@chakra-ui/react';
import '../Login/LoginForm.css'
import React, { useState, useEffect } from 'react';
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Heading, Text, Link, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import './Profile.css'

function Profile() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isDisabledDiscogs, setIsDisablesDicsogs] = useState(false)
    const [hasError, setErrors] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    const navigate = useNavigate()

    function getToken() {
        const tokenString = sessionStorage.getItem('token')
        return tokenString
    }

    useEffect(() => {
    //     const fetchData = async () => {
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `${getToken()}`
    //             }
    //         }

    //         const access_token_url = ``
    //         const res = await fetch(access_token_url, requestOptions)
    //         return res
    //     }

    //     const oauth_verifier = searchParams.get("oauth_verifier")

    //     const getStatus = async () => {
    //         if (oauth_verifier) {
    //             const res = await fetchData()

    //             res.json().then(res => {
    //                 if (res) {
    //                     setShowAlert(true)

    //                     setTimeout(() => {
    //                         setShowAlert(false);
    //                       }, 3000);
    //                 }
    //             })
    //                 .catch(console.error);
    //         }
    //     }

    //     getStatus()
    //     navigate('/profile')
    }, []);

    async function getProfileData(user) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
            })
        }

        // const profileURL = ``
        // const res = await fetch(profileURL, requestOptions)
        // res.json()
        //     .then(res => {
        //         if (res.userData.discogs_secret) {

        //             setIsDisablesDicsogs(true)
        //         }
        //     })
        // return res
    }

    useEffect(() => {

        const user = getToken()
        getProfileData(user.sub)
    }, []);

    const onSubmitDiscogs = async (e) => {

        // const res = await fetch('')
        // const token = await res.json()
        // window.location.replace(token.authorizationUrl);
    }

    const handleLogout = () => {
    
        sessionStorage.removeItem('token')
        navigate('/')
        window.location.reload();
    }

    const backToProfile = () => {
        setErrors(false)
    }

    if (hasError) {

        return (<Text fontSize='2xl' color='tomato'>An error has occured, please <Link onClick={backToProfile} color='red' fontWeight={'extrabold'}> try again</Link></Text>)
    }




    return (
        <Flex className='authForm' gap='4' justify='space-between' margin={'40vh'}>
            {showAlert && (
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>Connected</AlertTitle>
                    <AlertDescription>Connected to Discogs</AlertDescription>
                </Alert>
            )}
            <Flex className='titleForm'>
                <Heading as='h3' size='lg' className='darkBlueText'>
                    Profile
                </Heading>
            </Flex>

            <Button
                disabled={isDisabledDiscogs}
                className='submitButton full'
                type='submit'
                onClick={onSubmitDiscogs}
                colorScheme='teal'>
                Associate account with Discogs
            </Button>

            <Button
                className='submitButton full'
                type='submit'
                colorScheme='teal'>
                Associate account with Last.fm
            </Button>

            <Button
                className='submitButton'
                colorScheme={'red'}
                onClick={handleLogout}
                type='submit'>
                Logout
            </Button>

        </Flex>
    )
}

export default Profile;