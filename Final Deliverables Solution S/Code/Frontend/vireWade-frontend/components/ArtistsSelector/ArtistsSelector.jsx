import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import ArtistsForm from "./ArtistsForm";


const ArtistsSelector = ( {setLikedArtists} ) => {

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
            Artists liked
        </Button>
        { showArtists 
        ?             
        <div>
            <ArtistsForm 
                setChecked={setLikedArtists} 
                labelText="Select your favorite artists" 
                helperText="Select if you like the artists."
                colorScheme="telegram"
                /> 
        </div>
        : 
        null }
    </div>);
}

export default ArtistsSelector;