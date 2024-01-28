import React from 'react';
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const TrackCard = ({trackName,trackAuthor, trackImage}) => {


    return (
        <Flex className="trackCardFlex ">

        <img className='trackImage' src ={trackImage} />

        <Box display="flex" flexDirection="column" p="4" alignItems={'flex-start'}>

            <Text
                textAlign={'center'}
                mt="1"
                lineHeight="tight"
                fontWeight={'bold'}
                as="h4"
                isTruncated
            >
                Title: 
                {trackName}
            </Text>
            <Text
                fontWeight={'bold'}
                textAlign={'left'}
                mt="1"
                as="h4"
                lineHeight="tight"
                isTruncated
                >
                Author: 
                {trackAuthor}
            </Text>

        </Box>
        
    </Flex>
    );
}


export default TrackCard;