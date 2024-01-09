import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Button, Spinner, Card, Image, CardBody, Heading, Text, CardFooter, Link, CardHeader, StackDivider, Box } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import defaultImage from "../../assets/image.jpg";

function VinylDetails() {

    const lastfmURL = "https://ws.audioscrobbler.com/2.0/?";
    const apiKey = "";
    const format = "json";
    const action = "album.getinfo";

    var trackStructureData = {};
    var vinylStructureData = {};

    const { vinylName , artist } = useParams();
    const [vinylsDetails, setVinylsDetails] = useState({});

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        const res = await fetch(lastfmURL + new URLSearchParams({
            method: action,
            api_key: apiKey,
            format: format,
            artist: artist,
            album: vinylName
        }));
        res.json()
            .then(res => {
                console.log(res.album)
                setVinylsDetails(res.album);
            })
    }

    const getTrackStructuredData = (title, artist, trackUrl) => {
        trackStructureData = {
            "@context": "https://schema.org/",
            "@type": "MusicRecording",
            "name": title,
            "byArtist": {
                "@type": "Person",
                "name": artist
            },
            "url": trackUrl
        }
        return trackStructureData;
      };

      const getVinylStructuredData = (title, artist, vinylUrl, imgUrl) => {
        vinylStructureData = {
            "@context": {
                "mo": "http://purl.org/ontology/mo/",
                "dc": "http://purl.org/dc/elements/1.1/",
                "foaf": "http://xmlns.com/foaf/0.1/"
              },
              "@id": vinylUrl,
              "@type": "mo:Vinyl",
              "dc:title": title,
              "foaf:maker": {
                "@type": "mo:MusicArtist",
                "foaf:name": artist
              },
              "mo:image": imgUrl
        }
        return vinylStructureData;
      };

    return (
        <Stack className="greenBox" height={"auto"}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline' 
                mb={30}>
                {
                    vinylsDetails.image ? 
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={vinylsDetails.image.find(item => item.size === '') 
                        ? vinylsDetails.image.find(item => item.size === '')["#text"] !== '' 
                            ? vinylsDetails.image.find(item => item.size === '')["#text"]
                            : defaultImage
                        : defaultImage}
                        alt={artist + " " + vinylName}/>
                    :
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='teal.500'
                        size='xl'
                        alignSelf={'center'}/>
                }

                <Stack>
                    <CardBody>
                        <Heading size='md'>{vinylName}</Heading>
                        <Text py='2'>{artist}</Text>
                    </CardBody>

                    <CardFooter>
                    <Button variant='solid' colorScheme='teal'>
                        <Link
                            href={vinylsDetails.url}
                            textAlign={'center'}
                            isExternal
                            lineHeight="tight"
                            isTruncated>
                            Play it on Last.fm <ExternalLinkIcon m='2px' />
                        </Link>
                    </Button>
                    </CardFooter>
                </Stack>
            </Card>
            <Card mt={30}>
                <CardHeader>
                    <Heading size='md'>Track List</Heading>
                </CardHeader>

                <CardBody>
                    {
                        vinylsDetails.tracks ?
                        <Stack divider={<StackDivider />} spacing='4'>
                        {<script type="application/ld+json">
                            {JSON.stringify(getVinylStructuredData(vinylName, artist, vinylsDetails.url, vinylsDetails.image.find(item => item.size === '')["#text"] !== '' 
                            ? vinylsDetails.image.find(item => item.size === '')["#text"]
                            : defaultImage))}
                        </script>}
                        {
                            vinylsDetails.tracks.track.map(t => {
                                return (
                                <Box>
                                    <script type="application/ld+json">
                                        {JSON.stringify(getTrackStructuredData(t.name, t.artist.name, t.url))}
                                    </script>
                                    <Heading size='xs' textTransform='uppercase'>
                                    {trackStructureData.name}
                                    </Heading>
                                    <Link
                                        href={trackStructureData.url}
                                        textAlign={'center'}
                                        isExternal
                                        lineHeight="tight"
                                        pt='5' 
                                        fontSize='sm'
                                        isTruncated>
                                        Play it on Last.fm <ExternalLinkIcon m='2px' />
                                    </Link>
                                </Box>)
                            })
                        }
                        </Stack>
                        :
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='teal.500'
                            size='xl'
                            alignSelf={'center'}/>
                    }
                </CardBody>
                </Card>
        </Stack>)
}

export default VinylDetails;