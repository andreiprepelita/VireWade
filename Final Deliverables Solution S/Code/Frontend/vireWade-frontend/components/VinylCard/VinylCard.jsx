import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import "./VinylCard.css";

const VinylCard = ({ element }) => {

    var vinylStructureData = {};

    const getVinylStructuredData = (title, artist, imgUrl, genre, releaseDate, idVinyl, idArtist, idGenre) => {
        vinylStructureData = {
            "@context": {
                "mo": "http://purl.org/ontology/mo/",
                "dc": "http://purl.org/dc/elements/1.1/",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "foaf": "http://xmlns.com/foaf/0.1/",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
              },
              "@type": "mo:Vinyl",
              "dc:title": title,
              "@id": idVinyl,
              "foaf:maker": {
                "@type": "mo:MusicArtist",
                "foaf:name": artist,
                "@id": idArtist
              },
              "mo:image": imgUrl,
              "mo:genre": {
                "rdfs:label":genre,
                "@id": idGenre
                },
              "dc:date": {
                "@value": releaseDate,
                "@type": "xsd:date"
              },
        }
        return vinylStructureData;
      };

    return (
        <Flex className="elementCardFlex">
            <script type="application/ld+json">
                {JSON.stringify(getVinylStructuredData(element.vinylLabel, element.artistLabel, element.imgPath, element.genreLabel, element.releaseDate, element.vinyl, element.artist, element.genre))}
            </script>
            <Box className='elementImage' style={{ backgroundImage: 'url(' + vinylStructureData["mo:image"] + ')' }}></Box>

            <Box display="flex" flexDirection="column" p="4" >

                <Text
                    textAlign={'center'}
                    as="h4"
                    lineHeight="tight"
                    mt="1"
                    isTruncated
                >
                    {vinylStructureData["dc:title"]}
                </Text>
                <Link
                    textAlign={'center'}
                    mt="1"
                    href={element.artist}
                    isTruncated
                    isExternal
                    color={'grey'}
                    lineHeight="tight"
                >
                    Artist: {vinylStructureData["foaf:maker"]["foaf:name"]} <ExternalLinkIcon mx='2px' />
                </Link>
                <Link
                    textAlign={'center'}
                    mt="1"
                    href={element.genre}
                    lineHeight="tight"
                    isTruncated
                    isExternal
                    color={'grey'}
                >
                    Genre: {vinylStructureData["mo:genre"]["rdfs:label"]} <ExternalLinkIcon mx='2px' />
                </Link>
                <Text
                    textAlign={'center'}
                    mt="1"
                    isTruncated
                    as="h4"
                    lineHeight="tight"
                    color={'grey'}
                >
                    Released Date: {vinylStructureData["dc:date"]["@value"]}
                </Text>

                <Link
                    textAlign={'center'} 
                    href={element.vinyl} 
                    isExternal
                    mt="1"
                    isTruncated
                    lineHeight="tight"
                    color={'teal'}>
                    More details <ExternalLinkIcon mx='2px' />
                </Link>

            </Box>
        </Flex>
    );
}

export default VinylCard;