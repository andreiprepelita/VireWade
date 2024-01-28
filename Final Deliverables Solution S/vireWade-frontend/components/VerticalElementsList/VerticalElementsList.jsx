import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import VerticalLibrary from "./VerticalLibrary.jsx";

const VerticalElementsList = ({elements, setElements}) => {

    
  let playlistStructureData = {};

    const getUserPlaylists = async () => {
        const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
          }
        }
        const res = await fetch(`https://api.spotify.com/v1/me/playlists?offset=0&limit=1`, requestOptions);
        
        console.log("Enters")
          const fetchedPlaylists = await res.json();

          let playlists = []

          for(let playlist of fetchedPlaylists.items) {


          await getPlaylistTracklist(playlist.id).then(tracks => {
              playlists.push({
                title: playlist.name,
                id: playlist.id,
                image: playlist.images[0],
                tracks: tracks.items,
                description: playlist.description
            });
            })  
           
          }
  
          console.log("playlists ARE: ", playlists)

          setElements(playlists);
  
      }
  
      const getPlaylistTracklist = async (playlistId) => {
        const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
          }
        }
          const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, requestOptions);
  
          const JsonResult = await result.json();
  
          console.log("playlists trackist: ", JsonResult)
          return JsonResult;
      }


    useEffect(() => {
      console.log("VerticalElementsList is rerendered")
        
        getUserPlaylists();


    }, []);

    

    return (

        <Flex alignItems="flex-start" direction="column">
            <VerticalLibrary elements={elements} playlistStructureData={playlistStructureData}/>
        </Flex>
    )
}

export default VerticalElementsList;