import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import GenreForm from "./GenreForm";


const GenreSelector = ( {setLikedGenres} ) => {

    const [showGenres, setShowGenres] = useState(false);

    return (
    <div style={{width:"100%", textAlign:"center"}}>
        <Button
            colorScheme='telegram'
            type='submit'
            p={'20px'}
            width='20%'
            alignSelf={'center'}
            onClick={() => {setShowGenres(!showGenres);}}>
            Genres liked
        </Button>
        { showGenres 
        ?             
        
            <GenreForm 
                setChecked={setLikedGenres} 
                labelText="Select your favorite music genres" 
                helperText="Select only if you're like this genre."
                colorScheme="telegram"/> 
        
        : 
        null }
    </div>);
}

export default GenreSelector;