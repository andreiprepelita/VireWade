import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import ArtistsForm from "./ArtistsForm";


const ArtistsDislikedSelector = ( {setDislikedArtists} ) => {

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
            Artists disliked
        </Button>
        { showArtists 
        ?             
        <div>
            <ArtistsForm 
                setChecked={setDislikedArtists} 
                labelText="Select the artists you don't like" 
                helperText="Select only if you hate the artists."
                colorScheme="red"
                /> 
        </div>
        : 
        null }
    </div>);
}

export default ArtistsDislikedSelector;