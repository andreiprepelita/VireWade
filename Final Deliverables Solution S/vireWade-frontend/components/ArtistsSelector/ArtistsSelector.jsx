import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import ArtistsForm from "./ArtistsForm";


const ArtistsSelector = ( {setLikedArtists, setDislikedArtists} ) => {

    const [showArtists, setShowArtists] = useState(false);


    return (
    <div style={{width:"100%", textAlign:"center"}}>
        <Button
            colorScheme='telegram'
            type='submit'
            p={'20px'}
            width='20%'
            alignSelf={'center'}
            onClick={() => {setShowArtists(!showArtists);}}>
            Artists preferences
        </Button>
        { showArtists 
        ?             
        <div>
            <ArtistsForm 
                setChecked={setLikedArtists} 
                labelText="Select your favorite artists" 
                helperText="Select only if you're a fan."
                colorScheme="telegram"
                /> 
            <ArtistsForm 
                setChecked={setDislikedArtists} 
                labelText="Select the artists you don't like" 
                helperText="Select only if you are a hater."
                colorScheme="red"
                /> 
        </div>
        : 
        null }
    </div>);
}

export default ArtistsSelector;