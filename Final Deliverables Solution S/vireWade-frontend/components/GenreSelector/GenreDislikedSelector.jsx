import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import GenreForm from "./GenreForm";


const GenreDislikedSelector = ( {setDislikedGenres} ) => {

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
            Genres disliked
        </Button>
        { showGenres 
        ?             
            <GenreForm 
                setChecked={setDislikedGenres} 
                labelText="Select the music genre you don't want to be recommended" 
                helperText="Select only if you hate this genre."
                colorScheme="red"/> 
        : 
        null }
    </div>);
}

export default GenreDislikedSelector;