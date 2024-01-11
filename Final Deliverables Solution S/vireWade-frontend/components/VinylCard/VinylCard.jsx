import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import "./VinylCard.css";

const VinylCard = ({ element }) => {

    var vinylStructureData = {};

    const getVinylStructuredData = (title, artist, imgUrl, genre, releaseDate) => {
        vinylStructureData = {
            "@context": {
                "mo": "http://purl.org/ontology/mo/",
                "dc": "http://purl.org/dc/elements/1.1/",
                "foaf": "http://xmlns.com/foaf/0.1/"
              },
              "@type": "mo:Vinyl",
              "dc:title": title,
              "foaf:maker": {
                "@type": "mo:MusicArtist",
                "foaf:name": artist
              },
              "mo:image": imgUrl,
              "mo:genre": genre,
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
                {JSON.stringify(getVinylStructuredData(element.vinylLabel, element.artistLabel, element.imgPath, element.genreLabel, element.releaseDate))}
            </script>
            <Box className='elementImage' style={{ backgroundImage: 'url(' + vinylStructureData["mo:image"] + ')' }}></Box>

            <Box display="flex" flexDirection="column" p="4" >

                <Text
                    textAlign={'center'}
                    mt="1"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {vinylStructureData["dc:title"]}
                </Text>
                <Text
                    textAlign={'center'}
                    mt="1"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    color={'grey'}
                >
                    Artist: {vinylStructureData["foaf:maker"]["foaf:name"]}
                </Text>
                <Text
                    textAlign={'center'}
                    mt="1"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    color={'grey'}
                >
                    Genre: {vinylStructureData["mo:genre"]}
                </Text>
                <Text
                    textAlign={'center'}
                    mt="1"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    color={'grey'}
                >
                    Released Date: {vinylStructureData["dc:date"]["@value"]}
                </Text>

                <Link
                    textAlign={'center'} 
                    href={'/vinyl/details/' + element.vinylLabel + "/" + element.artistLabel} 
                    isExternal
                    mt="1"
                    lineHeight="tight"
                    isTruncated
                    color={'teal'}>
                    More details <ExternalLinkIcon mx='2px' />
                </Link>

            </Box>
        </Flex>
    );
}

export default VinylCard;