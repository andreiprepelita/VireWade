import React, { useState, useEffect } from "react";
import { Spinner, FormControl, FormLabel, Checkbox,Image, FormHelperText, Text, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import defaultImage from "../../assets/image.jpg";


const ArtistsForm = ({setChecked, labelText, helperText, colorScheme}) => {
    const pageSize = 5;
    const artistsLimit = 50;
    const countURL = "http://127.0.0.1:8081/recommendation/top";
    var artistStructureData = {};

    const [hasError, setErrors] = useState(false);

    const [artists, setArtists] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedArtists, setCheckedArtists] = useState([]);

    useEffect(() => {
        fetchArtists(pageIndex);

        if (pageIndex*pageSize >= artistsLimit) {
            setShowRightArrow(false);
        } else if (showRightArrow === false) {
            setShowRightArrow(true);
        }

        if (pageIndex <= 1) {
            setShowLeftArrow(false);
        } else if (showLeftArrow === false) {
            setShowLeftArrow(true);
        }

    }, [pageIndex]);

    useEffect(() => {
        setChecked(checkedArtists);
    }, [checkedArtists])

    const getRightArrows = () => {
        return ( 
            <IoIosArrowForward
                className="leftArrowSimple"
                size="20px"
                color={"teal"}
                onClick={async () => {setPageIndex(pageIndex + 1);}}
            />
        )
    }

    const getLeftArrows = () => {
        return (
            <IoIosArrowBack
                className="leftArrowSimple"
                size="20px"
                color={"teal"}
                onClick={() => {setPageIndex(pageIndex - 1);}}
            />
        )
    }

    const fetchArtists = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fieldToRankBy": "artist",
                "limitQuery": artistsLimit,
                
            })
        };

        setIsLoading(true);
        const res = await fetch(countURL, requestOptions);
        res.json()
            .then(res => {
                console.log(res)
                if(res.error) {
                    setErrors(true)
                } else {
                    loadArtistsImages(res.records)
                    setErrors(false);
                }})
            .then(res => setIsLoading(false))
            .catch(err => setErrors(true));

    }

    async function loadArtistsImages(fetchData) {
        const artists = fetchData
        const albumArt = require('album-art')

        for (let artist of artists) {
            try {
                const art = await albumArt(artist.artistLabel)
                artist.imgPath = art;
            } catch (e) {
                artist.imgPath = defaultImage;
                console.log(e);
            }

        }
        setArtists(artists)
    }

    const updateCheckedArtists = (isChecked, value) => {
        let artistList = [...checkedArtists];
        if (isChecked) {
            artistList.push(value);
        } else {
            const index = artistList.indexOf(value);
            artistList.splice(index, 1);
        }
        setCheckedArtists(artistList);
    }

    const getArtistStructuredData = (artistName, imgUrl) => {
        artistStructureData = {
            "@context": {
                "mo": "http://purl.org/ontology/mo/",
                "dc": "http://purl.org/dc/elements/1.1/",
                "foaf": "http://xmlns.com/foaf/0.1/"
              },
              "@type": "mo:MusicArtist",
              "mo:image": imgUrl,
              "foaf:name": artistName,
        }
        return artistStructureData;
      };


    if (hasError) {
        return (<Text fontSize='2xl' color='tomato'>An error has occured, please try again.</Text>)
    }

    return (     
    <FormControl as='fieldset' style={{textAlign:"center"}} mt={5}>
        <FormLabel as='legend' style={{textAlign:"center"}}>{labelText}</FormLabel>
        <FormHelperText mb={10}>{helperText}</FormHelperText>
        <div style={{display: "inline"}}>
        {showLeftArrow ? getLeftArrows() : null}
        <SimpleGrid columns={5} spacing={5}>
        {isLoading ?
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal.500'
                size='xl'
            />
        : artists.map(artist => {
                return (            
                <Card variant='outline' key={artist.artistLabel} >
                    <script type="application/ld+json">
                        {JSON.stringify(getArtistStructuredData(artist.artistLabel, artist.imgPath))}
                    </script>
                    <CardHeader>
                        <Heading size='md'>{artistStructureData["foaf:name"]}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Image
                            m={0}
                            objectFit='cover'
                            maxW={{ base: '100%' }}
                            src={artistStructureData["mo:image"]}
                            alt={artistStructureData["foaf:name"]}
                            alignSelf={'center'}/>
                    </CardBody>
                    <CardFooter>
                        <Button
                            mb={5}
                            cvariant='solid' colorScheme={colorScheme}
                            type='submit'
                            p={'20px'}
                            width='100%'
                            alignSelf={'center'}>
                                <Checkbox 
                                colorScheme={colorScheme} 
                                ml={1}
                                value={artistStructureData["foaf:name"]}
                                onChange={(event) => {updateCheckedArtists(event.target.checked, event.target.value)}}>
                                    Select
                                </Checkbox>
                        </Button>
                    </CardFooter>
                </Card>)
            })}
        </SimpleGrid>
        {showRightArrow ? getRightArrows() : null}
        </div>
        
    </FormControl> 
)
}

export default ArtistsForm;