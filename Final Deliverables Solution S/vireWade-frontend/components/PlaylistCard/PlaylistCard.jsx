import React from 'react';
import { Button, Box, Flex, Text, Link, Spinner, Center} from "@chakra-ui/react";
import { useState } from "react";
import "./PlaylistCard.css";
import '../Elements/ElementsLibrary.css'
import Elements from "../Elements/Elements";
import defaultImage from "../../assets/image.jpg";
import TrackCard from "../TrackCard/TrackCard";

const PlaylistCard = ({ element }) => {

    console.log("Playlist image is ", element.image)

    const [showVinyls, setShowVinyls] = useState(false);
    const [showTracks, setShowTracks] = useState(false)
    const [vinyls, setVinyls] = useState([]);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);

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
                                 key={track.track.name + i + track.track.artists[0]} trackName={x.name} trackAuthor={y} trackGenre={"newGenre"} trackImage={image}/>
                            </Box>
                        )})
                }
            </div>
        )
    }

    const preferencesURL = "http://127.0.0.1:8081/recommendation/preferences";

    async function getRecommendation() {

        setShowVinyls(true)

        let genres = []
        let authors = []

        console.log('tracks: ' + element['tracks'])

        for(let index = 0; index < element['tracks'].length; index++) {

            let track = element['tracks'][index]

            if (!genres.includes(track['genre'])) {
                genres.push(track['genre'])
            }

            if (!authors.includes(track['creator'])) {
                authors.push(track['creator'])
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                "favoriteGenres": genres,
                "favoriteArtists": authors,
                "pageSize": 5,
                "limit": 100,
                "pageIndex": Math.floor(Math.random() * 3)
            })
        }

        setRecomendationIsLoading(true);
        const res = await fetch(preferencesURL, requestOptions);
        res.json()
        .then(res => {
            console.log(res)
            loadVinyls(res.results)
        })
        .catch(err => console.log(err))
    }

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
                        onClick={getRecommendation}
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
                    <Elements elements={vinyls} />
                : null
            }
        </Center>
        </>
    );
}

export default PlaylistCard;