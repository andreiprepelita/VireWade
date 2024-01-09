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

    // const preferencesURL = "preferences";

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
                "likedArtists": authors,
                "likedGenres": genres,
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