import { Button, Box, Flex, Text, Link, Spinner, Center} from "@chakra-ui/react";
import { useState } from "react";
import "./PlaylistCard.css";
import Elements from "../Elements/Elements";
import defaultImage from "../../assets/image.jpg";
import TrackCard from "../TrackCard/TrackCard";

const PlaylistCard = ({ element }) => {

    const [showTracks, setShowTracks] = useState(false)
    const [showVinyls, setShowVinyls] = useState(false);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [vinyls, setVinyls] = useState([]);

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



    const onShowTracksClicked = () => {
        console.log(showTracks)
        console.log("pressed on show tracks")
        setShowTracks(true)
    }
    const onHideTracksClicked = () => {
        console.log(showTracks)
        console.log("pressed on hide tracks")
        setShowTracks(false)
    }

    const Tracks = () => {
        console.log(element)
        return (
            <div className = 'tracks'>
                {
                    element['tracks'].map((track) => (
                            <Box className="elementsBox margin2" key={String(element.id) + track.title} mr="4">
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
                "favoriteArtists": authors,
                "favoriteGenres": genres,
                "limit": 100,
                "pageSize": 5,
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

            <Box display="flex" flexDirection="column" p="4" alignItems={'flex-start'}>

                <Text
                    textAlign={'center'}
                    mt="1"
                    fontWeight={'bold'}
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {element.title}
                </Text>
                <Button
                    mt={5}
                    colorScheme='teal'
                    type='submit'
                    padding={'20px'}
                    alignSelf={'center'}
                    onClick={getRecommendation}
                >
                    Get Recommendation based on this playlist
                </Button>

            </Box>
            <Link
                mt={5}
                type='submit'
                padding={'20px'}
                alignSelf={'flex-end'}
                onClick={
                    showTracks ? onHideTracksClicked : onShowTracksClicked
                }
            >
                {showTracks ? "Hide Tracks": "See tracks"}
            </Link>
            
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
                        emptyColor='gray.200'
                        color='teal.500'
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