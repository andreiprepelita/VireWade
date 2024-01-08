import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import GenreForm from "./GenreForm";


const GenreSelector = ( {setLikedGenres, setDislikedGenres} ) => {

    const [showGenres, setShowGenres] = useState(false);

    return (
    <div style={{width:"100%", textAlign:"center"}}>
        <Button
            colorScheme='teal'
            type='submit'
            p={'20px'}
            width='40%'
            alignSelf={'center'}
            onClick={() => {setShowGenres(!showGenres);}}>
            Set your genres preferences
        </Button>
        { showGenres 
        ?             
        <div>
            <GenreForm 
                setChecked={setLikedGenres} 
                labelText="Select your favorite music genres" 
                helperText="Select only if you're a fan."
                colorScheme="teal"/> 
            <GenreForm 
                setChecked={setDislikedGenres} 
                labelText="Select the music genre you don't want to hear" 
                helperText="Select only if you are a hater."
                colorScheme="red"/> 
        </div>
        : 
        null }
    </div>);
}

export default GenreSelector;