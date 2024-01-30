import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from 'react-router-dom'
import { Stack, Button, Spinner, Heading, Text } from "@chakra-ui/react";
import Elements from "../Elements/Elements";
import ArtistsSelector from "../ArtistsSelector/ArtistsSelector";
import GenreSelector from "../GenreSelector/GenreSelector";
import defaultImage from "../../assets/image.jpg";
import YearSelector from "../YearSelector/YearSelector";
window.Buffer = window.Buffer || require("buffer").Buffer;

function MainPage() {
    const pageSize = 10;
    const preferencesURL = "http://127.0.0.1:8081/recommendation/preferences";

    const [hasError, setErrors] = useState(false);
    const [vinyls, setVinyls] = useState([]);
    const [showVinyls, setShowVinyls] = useState(false);
    const [likedArtists, setLikedArtists] = useState([]);
    const [dislikedArtists, setDislikedArtists] = useState([]);
    const [likedGenres, setLikedGenres] = useState([]);
    const [dislikedGenres, setDislikedGenres] = useState([]);
    const [yearRange, setYearRange] = useState([]);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams()
    const [accesToken, setAccessToken] = useState("");
    const [showArtists, setShowArtists] = useState(false);
    const location = useLocation()

    


    // async function redirectToken(){
    //     let code = searchParams.get('code');
    //     let state = searchParams.get('state');
    //     const clientId = process.env.REACT_APP_CLIENT_ID;
    //     const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    //     const redirectURI = process.env.REACT_APP_REDIRECT_URI;

    //     const response = await fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials&code=${code}&redirect_uri=${redirectURI}&client_id=${clientId}&client_secret=${clientSecret}&state=${state}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    //     },
    //   });
    //   console.log("Auth m: ", response.json())
    //   response.json()
    //     .then(response => {
    //         if (!response.ok) {
    //             console.error('error response', response);
    //             response.json().then(json => {
    //                 console.error('error body json', json);
    //                 throw new Error('HTTP status ' + response.status + ': ' + json.error + ":" + json.error_description);
    //             });
    //           throw new Error('HTTP status ' + response.status);
    //         }
    //       return response.json();
    //     })
    //     .then(data => {
    //         console.log("data is: ", data)
    //       localStorage.setItem('access-token', data.access_token);
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    //   };


    const setSpotifySessionData = () => {
        if(window.location.href.includes("#")) {

        
            const windowHref = window.location.href.split("#")[1];
            const spotifyPairs = windowHref.split("&");
            let accessToken="";
            let expiresIn="";
            for(let pair of spotifyPairs) {
                console.log("pair: ", pair)
                console.log("pair[0]: ", pair.split("=")[0] + pair.split("=")[0].length)
                if(pair.split("=")[0] === "access_token"){
                    accessToken=pair.split("=")[1];
                }
                if(pair.split("=")[0] === "expires_in") {
                    expiresIn = pair.split("=")[1];

                }
            }
            console.log("accessToken: " + accessToken + "  expiresIn: " + expiresIn)
            if(accessToken && expiresIn) {
                sessionStorage.setItem('spotify_token', JSON.stringify({'access_token': accessToken, 'expires_in': expiresIn, 'creation_date': new Date()}))
                // redirectToken()
            }
        }
    }

    useEffect(() => {
        setSpotifySessionData()
    }, [])

    useEffect(() => {
        setRecomendationIsLoading(false);
        if ( currentPage * pageSize >= totalCount ) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage + 1);
        }
    }, [vinyls]);

    useEffect(() => {
        setCurrentPage(1)
    }, [likedArtists, dislikedArtists, likedGenres, dislikedGenres, yearRange]);

    async function fetchVinyls() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "favoriteArtists": likedArtists,
                "leastFavoriteArtists": dislikedArtists,
                "favoriteGenres": likedGenres,
                "leastFavoriteGenres": dislikedGenres,
                "yearRangeStart": yearRange[0],
                "yearRangeEnd": yearRange[1],
                "pageSize": pageSize,
                "pageIndex": currentPage,
                "shuffle": true
            })
        };

        setRecomendationIsLoading(true);
        const res = await fetch(preferencesURL, requestOptions);
        res.json()
            .then(res => {
                console.log(res)
                if(res.error) {
                    setErrors(true)
                } else {
                    setTotalCount(res.totalRecords)
                    loadVinyls(res.records)
                    setErrors(false);
                }
            })
            .catch(err => setErrors(true));
    }

    async function loadVinyls(fetchData) {
        const vinyls = fetchData
        const albumArt = require('album-art')

        for (let vinyl of vinyls) {
            try {
                const art = await albumArt(vinyl.artistLabel, {album: vinyl.vinylLabel})
                vinyl.imgPath = art;
            } catch (e) {
                vinyl.imgPath = defaultImage;
                console.log(e);
            }

        }
        setVinyls(vinyls)
    }

    const setPreferencesLikedArtists = (checkedLikedArtists) => {
        setLikedArtists(checkedLikedArtists);
    }

    const setPreferencesDislikedArtists = (checkedDislikedArtists) => {
        setDislikedArtists(checkedDislikedArtists);
    }

    const setPreferencesLikedGenres = (checkedLikedGenres) => {
        setLikedGenres(checkedLikedGenres);
    }

    const setPreferencesDislikedGenres = (checkedDislikedGenres) => {
        setDislikedGenres(checkedDislikedGenres);
    }

    const setPreferencesYears = (yearRange) => {
        setYearRange(yearRange);
    }

    if (hasError) {
        return (<Text fontSize='2xl' color='tomato'>An error has occured, please try again.</Text>)
    }

    return (
        <Stack height={"auto"} as='flex'>
            <Heading as='h1' color={'black'} alignSelf='center' paddingBottom={'10px'}>Welcome to ViReWade,</Heading>
            <Text color={'black'}  size='lg' alignSelf='center' paddingBottom={'10px'}>Please enter your preferences</Text>
            <ArtistsSelector
                setLikedArtists={setPreferencesLikedArtists} 
                setDislikedArtists={setPreferencesDislikedArtists}
                showArtists={showArtists}
                setShowArtists={setShowArtists}
                />
            <GenreSelector
                setLikedGenres={setPreferencesLikedGenres} 
                setDislikedGenres={setPreferencesDislikedGenres}/>
            <YearSelector setYearRange={setPreferencesYears}/>
            <Button
                m={10}
                colorScheme='orange'
                type='submit'
                padding={'20px'}
                width='30%'
                alignSelf={'center'}
                onClick={() => { setShowVinyls(true); fetchVinyls() }}
            >
                Get Recommendation based on my preferences
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
                        alignSelf={'center'}/>
                    :
                    <Elements elements={vinyls} />
                : null
            }
        </Stack >
    )

}

export default MainPage;