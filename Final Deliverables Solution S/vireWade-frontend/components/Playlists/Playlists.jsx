import React, { useState, useEffect, Fragment } from "react";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom"
import VerticalElementsList from "../VerticalElementsList/VerticalElementsList";

function Playlists() {
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [userIsAuth, setIsUserAuth] = useState(getToken());
    const [elements, setElements] = useState([])
  
    const handleClick = () => {
      setIsOpen(true);
    };
  
    const handleFileChange = (event) => {
      const pickedFile = event.target.files[0];
      if (pickedFile.name.endsWith("xml") || pickedFile.name.endsWith("xspf")) {
        setFile(pickedFile);
        setIsOpen(false);
      } else {
        alert("Only XML and XSPF files are allowed.");
      }
    };
  
    // const handleSubmit = async () => {
    //     if (!file) {
    //       return;
    //     }
    
    //     try {
    //       const fileReader = new FileReader();
    //       fileReader.readAsText(file);
    //       fileReader.onload = async () => {
    //         try {
    //           const response = await fetch("/playlists", {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/xml",
    //               "Content-Length": file.size,
    //               "Authorization": "Bearer " + sessionStorage.getItem("token")
    //             },
    //             body: fileReader.result,
    //           });
    
    //           if (!response.ok) {
    //             throw new Error("Failed to upload file.");
    //           }
    
    //           alert("File uploaded successfully.");
    //           window.location.reload()
    //         } catch (error) {
    //           console.error(error);
    //           alert("Failed to upload file.");
    //         }
    //       };
    //     } catch (error) {
    //       console.error(error);
    //       alert("Failed to read file.");
    //     }
    //   };

    const getUserData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("spotify_token")).access_token}`
        }
    }
      console.log('ENTERs')
      const res = await fetch('https://api.spotify.com/v1/me', requestOptions);

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

        const JsonRes = await res.json();
    }

    useEffect(() => {
      getUserData();
      console.log("Enters Playlists Page")

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
  
    return (
      <Fragment>
          { userIsAuth ?
        <Stack className="blueBox">
          <Button
            colorScheme="orange"
            type="submit"
            padding="20px"
            alignSelf="flex-start"
            onClick={handleClick}
          >
            Add Playlist
          </Button>
          {isOpen && (
            <input
              type="file"
              accept="application/xml"
              onChange={handleFileChange}
            />
          )}
          {file && (
            <Button
              colorScheme="orange"
              type="submit"
              padding="20px"
              alignSelf="flex-start"
              // onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
          <VerticalElementsList elements={elements} setElements={setElements}/>
        </Stack>
        : <Navigate to="/" replace={true}/> }
      </Fragment>
    );
  }
  

export default Playlists;