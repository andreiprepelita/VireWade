import React from 'react';
import { Box, Flex, Text, Image } from "@chakra-ui/react";

const TrackCard = ({trackName,trackAuthor, trackImage, artistUrl, albumUrl}) => {


    return (
        <Flex className="trackCardFlex ">
        
        <a href={albumUrl} target='_blank'>
        <Image src={trackImage} alt="Track image" objectFit={"contain"}/>
        </a>
        <Box display="flex" flexDirection="column" p="4" alignItems={'flex-start'}>

            <Text
                textAlign={'center'}
                mt="1"
                lineHeight="tight"
                fontWeight={'bold'}
                as="h4"
                isTruncated
            >
                <a href={albumUrl} target='_blank'>Title: 
                {trackName}</a>
            </Text>
            <Text
                fontWeight={'bold'}
                textAlign={'left'}
                mt="1"
                as="h4"
                lineHeight="tight"
                isTruncated
                >
               <a href={artistUrl} target='_blank'> Artist: 
                {trackAuthor}</a>
            </Text>

        </Box>
        
    </Flex>
    );
}


export default TrackCard;