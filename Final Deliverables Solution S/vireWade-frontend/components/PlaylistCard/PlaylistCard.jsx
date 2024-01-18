import React from 'react';
import { Button, Box, Flex, Text, Link, Spinner, Center} from "@chakra-ui/react";
import { useState } from "react";
import "./PlaylistCard.css";
import '../Elements/ElementsLibrary.css'
import Elements from "../Elements/Elements";
import defaultImage from "../../assets/image.jpg";
import TrackCard from "../TrackCard/TrackCard";

const PlaylistCard = ({ element }) => {

    const [showVinyls, setShowVinyls] = useState(false);
    const [showTracks, setShowTracks] = useState(false)
    const [vinyls, setVinyls] = useState([]);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);

//     You can now sign your web service calls with a method signature, provided along with the session key you received  and your API key.
//  You will need to include all three as parameters in subsequent calls in order to be able to access services that require authentication.
//  You can visit individual method call pages to find out if they require authentication. Your three authentication parameters are defined as:

// sk (Required) : The session key returned by auth.getSession service.
// api_key (Required) : Your 32-character API key.
// api_sig (Required) : Your API method signature, constructed as explained in Section 6

// Sign your calls
// Construct your api method signatures by first ordering all the parameters sent in your call alphabetically
//  by parameter name and concatenating them into one string using a <name><value> scheme. So for a call to auth.getSession you may have:

// **api_key**xxxxxxxx**method**auth.getSession**token**xxxxxxx
// Ensure your parameters are utf8 encoded. Now append your secret to this string. Finally, generate an md5 hash of the resulting string
//  For example, for an account with a secret equal to 'mysecret', your api signature will be:

// api signature = md5("api_keyxxxxxxxxmethodauth.getSessiontokenxxxxxxxmysecret")
// Where md5() is an md5 hashing operation and its argument is the string to be hashed. The hashing operation should return a 32-character hexadecimal md5 hash.



const onHideTracksClicked = () => {
    console.log(showTracks)
    console.log("pressed on hide tracks")
    setShowTracks(false)
}
const onShowTracksClicked = () => {
        console.log(showTracks)
        console.log("pressed on show tracks")
        setShowTracks(true)
    }

    const Tracks = () => {
        console.log(element)
        return (
            <div className = 'tracks'>
                {
                    element['tracks'].map((track) => (
                            <Box className="margin2 elementsBox" key={String(element.id) + track.title} mr="4">
                                <TrackCard className="chakra-heading css-uqsj0l"
                                 key={track.title + track.creator} track={track} />
                            </Box>
                        ))
                }
            </div>
        )
    }

    const preferencesURL = "http://127.0.0.1:8081/recommendation/preferences";

    async function getRecommendation() {

        setShowVinyls(true)

        let genres = []
        let authors = []

        console.log('track-uri: ' + element['tracks'])

        for(let index = 0; index < element['tracks'].length; index++) {

            let track = element['tracks'][index]

            console.log('H-am luat ' + track)

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

            <Box className='playlistImage' style={{ backgroundImage: 'url(' + element.image + ')' }}></Box>

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
                        mt={5}
                        type='submit'
                        padding={'20px'}
                        textAlign={'end'}
                        onClick={
                            showTracks ? onHideTracksClicked : onShowTracksClicked
                        }
                    >
                {showTracks ? "Hide Tracklist": "See tracklist"}
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