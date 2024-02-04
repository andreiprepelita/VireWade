import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from 'react-router-dom'
import { Stack, Button, Spinner, Heading, Text, Center } from "@chakra-ui/react";
import Elements from "../Elements/Elements";
import ArtistsSelector from "../ArtistsSelector/ArtistsSelector";
import ArtistsDislikedSelector from "../ArtistsSelector/ArtistsDislikedSelector";
import GenreSelector from "../GenreSelector/GenreSelector";
import GenreDislikedSelector from "../GenreSelector/GenreDislikedSelector";
import defaultImage from "../../assets/image.jpg";
import YearSelector from "../YearSelector/YearSelector";
window.Buffer = window.Buffer || require("buffer").Buffer;

function MainPage() {
    const pageSize = 10;
    const preferencesURL = "https://recommendation-api-0q3l.onrender.com/recommendation/preferences";

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
    const [showArtists, setShowArtists] = useState(false);
    const location = useLocation()

    const artistsLimit = 50;

    
    const changeIndex = (newPageIndex) => {
        
        let index = newPageIndex;
        console.log("Page index is: "+ index);
        console.log(" and is: " + newPageIndex >= artistsLimit/pageSize)

        if (newPageIndex >= artistsLimit/pageSize) {
            index = (artistsLimit/pageSize) - 1
        }
        
        if (newPageIndex < 1) {
            index = 1;
        }
        
        setShowVinyls(true);
        fetchVinyls(index);
        setCurrentPage(index)
    }




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
            }
        }
    }

    useEffect(() => {
        setSpotifySessionData()
    }, [])

    useEffect(() => {
        setRecomendationIsLoading(false);
    }, [vinyls]);

    useEffect(() => {
        setCurrentPage(1)
    }, [likedArtists, dislikedArtists, likedGenres, dislikedGenres, yearRange]);

    async function fetchVinyls(index) {
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
                "pageIndex": index,
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
            <Text color={'black'}  fontSize='3xl' alignSelf='center' paddingBottom={'10px'} paddingTop={'20px'}>Please enter your preferences</Text>
            <ArtistsSelector
                setLikedArtists={setPreferencesLikedArtists} 
                setDislikedArtists={setPreferencesDislikedArtists}
                showArtists={showArtists}
                setShowArtists={setShowArtists}
                />
            <ArtistsDislikedSelector setDislikedArtists={setPreferencesDislikedArtists}/>
            <GenreSelector setLikedGenres={setPreferencesLikedGenres}  />
            <GenreDislikedSelector setDislikedGenres={setPreferencesDislikedGenres}/>
            <YearSelector setYearRange={setPreferencesYears}/>
            <Button
                m={10}
                colorScheme='orange'
                type='submit'
                padding={'20px'}
                width='30%'
                alignSelf={'center'}
                onClick={() => { setShowVinyls(true); fetchVinyls(1) }}
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
                        alignSelf={'center'}
                        justifyContent={'center'}
                        />
                    :
                    <Elements elements={vinyls} changeIndex={changeIndex} pageIndex={currentPage}/>
                : null
            }
        </Stack >
    )

}

export default MainPage;