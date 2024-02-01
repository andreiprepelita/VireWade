import React, { useEffect } from 'react';
import { Button, Box, Flex, Text, Link, Spinner, Center} from "@chakra-ui/react";
import { useState } from "react";
import "./PlaylistCard.css";
import '../Elements/ElementsLibrary.css'
import Elements from "../Elements/Elements";
import defaultImage from "../../assets/image.jpg";
import TrackCard from "../TrackCard/TrackCard";

const PlaylistCard = ({ element, artists, artistsNames }) => {
    
    const [showVinyls, setShowVinyls] = useState(false);
    const [showTracks, setShowTracks] = useState(false)
    const [vinyls, setVinyls] = useState([]);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [pageIndex, setPageIndex] = useState();

    const pageSize = 4;
    const artistsLimit = 50;


const onHideTracksClicked = () => {
    console.log(showTracks)
    console.log("Tracks hidden")
    setShowTracks(false)
}
const onShowTracksClicked = () => {
        console.log(showTracks)
        console.log("Tracks visible")
        setShowTracks(true)
    }
    
    const changeIndex = (newPageIndex) => {
        
        let index = newPageIndex;

        if (newPageIndex >= artistsLimit/pageSize) {
            index = (artistsLimit/pageSize) - 1
        }
        
        if (newPageIndex < 1) {
            index = 1;
        }
        
        getRecommendation(index);
        setPageIndex(index)
        
    }

    const Tracks = () => {
        return (
            <div className = 'tracks'>
                {
                    element.tracks.map((track, i) => {
                        let x = track.track;
                        let y = x.artists[0].name;
                        let image = x.album.images[1].url
                        console.log("My track is ", x)
                        return (
                            <Box className="margin2 elementsBox" key={String(element.id) + i + track.title} mr="4">
                                <TrackCard className="css-uqsj0l chakra-heading"
                                 key={track.track.name + i + track.track.artists[0]} trackName={x.name} trackAuthor={y} trackImage={image}/>
                            </Box>
                        )})
                }
            </div>
        )
    }


    const getGenres = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
            }
        }
          console.log('GET GEnres')
          const res = await fetch(`https://api.spotify.com/v1/artists?ids=${artists}`, requestOptions);

          if (!res.ok) {
            sessionStorage.removeItem('spotify_token')
            window.location.reload()
          }
    
          const JsonRes = await res.json();

          let genres = [];

          for(let i = 0; i < JsonRes.artists.length; i ++) {
            genres.push(...JsonRes.artists[i].genres);
          }

         let uniqueArray = [...new Set(genres)];
         console.log("GENRES ", uniqueArray)

         return uniqueArray;
    }

    const preferencesURL = "https://recommendation-api-0q3l.onrender.com/recommendation/preferences";

    async function getRecommendation(pageIndex) {

        let genres = await getGenres();
        console.log("My genres are", genres)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                "favoriteGenres": genres,
                "favoriteArtists": artistsNames,
                "pageSize": 4,
                "limit": 100,
                "pageIndex": pageIndex
            })
        }

        setRecomendationIsLoading(true);
        const res = await fetch(preferencesURL, requestOptions);

        res.json()
        .then(res => {
            console.log(res)
            loadVinyls(res.records)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("Apare de: ", artists)
        console.log("Numele artistilor sunt", artistsNames)
    }, [])

    async function loadVinyls(fetchData) {
        const vinyls = fetchData
        const albumArt = require('album-art')

        setRecomendationIsLoading(false)

        for (let vinyl of vinyls) {
            try {
                const art = await albumArt(vinyl.artist, {album: vinyl.vinyl})
                vinyl.imgPath = art;
            } catch (e) {
                vinyl.imgPath = defaultImage;
                console.log(e);
            }

        }
        setVinyls(vinyls)
    }

    return (
        <>
        <Flex className="playlistCardFlex ">

            <img className='playlistImage' src={element.image.url} />

            <Box display="flex" flexDirection="column" p="4" alignItems={'flex-start'} justifyContent={'space-between'}>

                <Text
                    mt="1"
                    textAlign={'center'}
                    fontWeight={'bold'}
                    lineHeight="tight"
                    as="h4"
                    isTruncated
                >
                    {element.title}
                </Text>
                
                <Box display="flex" flexDirection="row" alignItems={'flex-start'} justifyContent={'space-between'}>
                    <Button
                        mt={5}
                        colorScheme='orange'
                        padding={'20px'}
                        type='submit'
                        alignSelf={'center'}
                        justifySelf={'flex-start'}
                        onClick={ () => {
                            setShowVinyls(true)
                            getRecommendation(1);
                            setPageIndex(1)
                        }}
                    >
                        Get recommandations based on this playlist
                    </Button>
                    <Link
                        type='submit'
                        paddingLeft={'20px'}
                        textAlign={'end'}
                        onClick={
                            showTracks ? onHideTracksClicked : onShowTracksClicked
                        }
                    >
                {showTracks ? (<Button
                        mt={5}
                        colorScheme='orange'
                        padding={'20px'}
                        type='submit'
                        alignSelf={'center'}
                        justifySelf={'flex-start'}  
                    >
                        Hide Tracklist
                    </Button>): (<Button
                        mt={5}
                        colorScheme='orange'
                        padding={'20px'}
                        type='submit'
                        alignSelf={'center'}
                        justifySelf={'flex-start'}
                    >
                        See tracklist
                    </Button>)}
            </Link>
                </Box>

            </Box>
            
            
        </Flex>
        {
            showTracks ? <Tracks/> : null
        }
        <Center>
        {showVinyls ?
                recomendationIsLoading
                    ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        color='teal.500'
                        emptyColor='gray.200'
                        size='xl'
                        alignSelf={'center'}/>
                    :
                    <Elements elements={vinyls} changeIndex={changeIndex} pageIndex={pageIndex}/>
                : null
            }
        </Center>
        </>
    );
}

export default PlaylistCard;