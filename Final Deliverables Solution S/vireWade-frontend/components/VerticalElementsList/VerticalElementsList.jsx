import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import VerticalLibrary from "./VerticalLibrary.jsx";

const VerticalElementsList = () => {

    const [elements, setElements] = useState([])
    

    const getUserPlaylists = async () => {
        const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
          }
        }
        const res = await fetch(`https://api.spotify.com/v1/me/playlists`, requestOptions);
        
        console.log("Enters")
          const fetchedPlaylists = await res.json();

          let playlists = []

          for(let playlist of fetchedPlaylists.items) {

            let tracks = await getPlaylistTracklist(playlist.id)
            playlists.push({
                title: playlist.name,
                id: playlist.id,
                image: playlist.images[0],
                tracks: tracks.items,
                description: playlist.description
            });
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
          const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, requestOptions);
  
          const JsonRes = await res.json();
  
          console.log("playlists trackist: ", JsonRes)
          return JsonRes;
      }
  
      const getPlaylistImage = async(playlistId) => {
        const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
          }
        }
          const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, requestOptions);
  
          const JsonRes = await res.json();
  
          console.log("playlists image is: ", JsonRes)
      }


    useEffect(() => {

        
        getUserPlaylists();


    }, []);

    

    return (

        <Flex alignItems="flex-start" direction="column">
            <VerticalLibrary elements={elements} />
        </Flex>
    )
}

export default VerticalElementsList;