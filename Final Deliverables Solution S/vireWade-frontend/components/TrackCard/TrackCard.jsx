import React from 'react';
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const TrackCard = ({track}) => {

    useEffect(() => {
        console.log("TRACK RECEIVED = " + track)
    }, [])

    return (
        <Flex className="trackCardFlex ">

        <Box className='trackImage' style={{ backgroundImage: 'url(' + track.image + ')' }}></Box>

        <Box display="flex" flexDirection="column" p="4" alignItems={'flex-start'}>

            <Text
                textAlign={'center'}
                mt="1"
                lineHeight="tight"
                fontWeight={'bold'}
                as="h4"
                isTruncated
            >
                Title: {track.title}
            </Text>
            <Text
                fontWeight={'bold'}
                textAlign={'left'}
                mt="1"
                as="h4"
                lineHeight="tight"
                isTruncated
                >
                Author: {track.creator}
            </Text>
            <Text
                textAlign={'left'}
                mt="1"
                as="h4"
                fontWeight={'bold'}
                lineHeight="tight"
                isTruncated
                >
                Genre: {track.genre}
            </Text>

        </Box>
        
    </Flex>
    );
}


export default TrackCard;