import React, { useState, useEffect, Fragment} from "react";
import { Stack, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom"
import VerticalElementsList from "../VerticalElementsList/VerticalElementsList";

function Playlists() {
    const [userIsAuth, setIsUserAuth] = useState(getToken());
    const [elements, setElements] = useState([])
    const navigate = useNavigate()
  

    const getUserData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
        }
    }
      console.log('ENTERs')
      const res = await fetch('https://api.spotify.com/v1/me', requestOptions);
      
      if (!res.ok) {
        sessionStorage.removeItem('spotify_token')
        window.location.reload()
      }
      const JsonRes = await res.json();

      
      sessionStorage.setItem('spotify_user_data', JSON.stringify({'display_name': JsonRes.display_name, 'user_id': JsonRes.id, 'uri': JsonRes.uri}))

    }


    const createPlaylist = async(name, description, publicState) => {
      const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
        },
        body: JSON.stringify({'name': name, 'description': description, 'public': publicState})
      }

      const res = await fetch(`https://api.spotify.com/v1/users/${JSON.parse(sessionStorage.getItem("spotify_user_data")).user_id}/playlists`, requestOptions);

      if (!res.ok) {
        sessionStorage.removeItem('spotify_token')
        window.location.reload()
      }

        const JsonRes = await res.json();

        const newPlaylistName = JsonRes.id;

        console.log("playlists trackist: ", JsonRes)

    }

    const addTrackToPlaylist = async(playlistId, spotifyUris) => {
      const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
        },
        body: JSON.stringify({'uris': spotifyUris, 'position': 0})
      }

      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, requestOptions);

      if (!res.ok) {
        sessionStorage.removeItem('spotify_token')
        window.location.reload()
      }

        const JsonRes = await res.json();
    }

    useEffect(() => {
      if(sessionStorage.getItem("spotify_token")) {
        getUserData();
        console.log("Enters Playlists Page")
      }

    }, []);

  function getToken() {
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      let result;
      if(userLocalStorage){
          result = (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
          console.log("Discog result is working: ", result)
          return result;
      }
      console.log("result not working ", result)
      return false;
  }

    const onSpotifySubmit = () => {
    if(!sessionStorage.getItem('spotify_token')) {
        window.location.replace("http://localhost:8888/spotify/login");
    }
  }

  const handleClick = () => {
    navigate('/playlists/file')
  }
  
    return (
      <Fragment>
          { userIsAuth ? (
            sessionStorage.getItem("spotify_token") ?
        <Stack className="blueBox">
          <Button
          colorScheme="orange"
          type="submit"
          padding="20px"
          alignSelf="flex-start"
          onClick={handleClick}
        >
          Add Playlist file
        </Button>
            
          <VerticalElementsList elements={elements} setElements={setElements}/>
        </Stack> : (<Box width={'500px'} alignSelf={'center'}>
                    <Button
                        type='submit'
                        className='full submitButton'
                        colorScheme='red'
                        onClick={onSpotifySubmit}
                        >
                            Associate account with Spotify
                        
                    </Button>
                
            </Box>)
        )
        : <Navigate to="/" replace={true}/> }
      </Fragment>
    );
  }
  

export default Playlists;