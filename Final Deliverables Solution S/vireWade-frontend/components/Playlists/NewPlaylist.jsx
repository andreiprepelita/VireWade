import React, { useState, useEffect, Fragment } from "react";
import "./NewPlaylist.css"
import { Stack, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Spinner, Center } from "@chakra-ui/react";
import Elements from "../Elements/Elements";
import defaultImage from "../../assets/image.jpg";

function NewPlaylistFile() {

    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showVinyls, setShowVinyls] = useState(false);
    const [vinyls, setVinyls] = useState([]);
    const [alert, setAlert] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [recomendationIsLoading, setRecomendationIsLoading] = useState([false]);
    const [pageIndex, setPageIndex] = useState();

    const pageSize = 4;
    const artistsLimit = 50;
    
    const changeIndex = (newPageIndex) => {
        
        let index = newPageIndex;

        if (newPageIndex >= artistsLimit/pageSize) {
            index = (artistsLimit/pageSize) - 1
        }
        
        if (newPageIndex < 1) {
            index = 1;
        }
        
        handleSubmit()
        setPageIndex(index)
        
    }

    const handleClick = () => {
        setIsOpen(true);
      };
    
      const handleFileChange = (event) => {
        const pickedFile = document.getElementById('fileInput').files[0];
        console.log(pickedFile)
        if (pickedFile.name.endsWith("xml") || pickedFile.name.endsWith("xspf")) {
          setFile(pickedFile);
        } else {
          setAlert("Only XML and XSPF files are allowed.");
        }
      };
    
      const handleSubmit = async () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
    
        if (!file) {
            setAlert("No file selected.");
            return;
        }
    
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
            const fileContent = e.target.result;
    
            try {
                setRecomendationIsLoading(true);
                const response = await fetch("https://recommendation-api-0q3l.onrender.com/recommendation/playlist/local", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml",
    
                    },
                    body: fileContent
                });
    
                // Check if the response is in JSON format
                if (response.headers.get("content-type")?.includes("application/json")) {
                    const jsonResponse = await response.json();
                    setShowAlert(true)
                    loadVinyls(jsonResponse.records) // Print the JSON response

                } else {
                    const textResponse = await response.text();
                    console.log(textResponse); // Print the text response
                }
    
                if (!response.ok) {
                    setAlert(`Failed to upload file. Status: ${response.status}`);
                    setShowAlert(true)
                    setRecomendationIsLoading(false)
                }
    
                setAlert("File uploaded successfully.");
                // The window reload is commented out, uncomment if you need it
                // window.location.reload();
            } catch (error) {
                console.error(error);
                setAlert(`Failed to upload file: ${error.message}`);
                setShowAlert(true)
                setRecomendationIsLoading(false)
            }
        };
    
        fileReader.onerror = () => {
            setAlert("Failed to read the file.");
            setShowAlert(true)
            setRecomendationIsLoading(false)
        };
    
        fileReader.readAsBinaryString(file); // or use readAsArrayBuffer if you want to send it as binary
        
    };

    async function loadVinyls(fetchData) {
      const vinyls = fetchData
      const albumArt = require('album-art')

      setRecomendationIsLoading(false)

      for (let vinyl of vinyls) {
          try {
              const art = await albumArt(vinyl.artist, {album: vinyl.vinyl})
              vinyl.imgPath = art;
          } catch (e) {
              vinyl.imgPath = defaultImage;
              console.log(e);
          }

      }
      setVinyls(vinyls)
  }



    return (
        <Stack className="blueBox" justifyContent={"center"} alignItems={"center"}>
        {showAlert ?
            ( alert === "File uploaded successfully." ?
            <Alert status='success'>
              <AlertIcon />
                {alert}
            </Alert> :
            <Alert status='error'>
            <AlertIcon />
              {alert}
          </Alert>
            ) : null}
        <Button
          colorScheme="orange"
          type="submit"
          padding="20px"
          onClick={() => {
            handleClick()
            setFile(null)
          }}
        >
          Add Playlist
        </Button>
        {isOpen && (
          <input
            type="file"
            accept=".xspf, .xml"
            id="fileInput"
            onChange={handleFileChange}
          />
        )}
        {file && (
          <>
          <div id="file-label">{file.name}</div>
          <Button
            colorScheme="orange"
            type="submit"
            padding="20px"
            onClick={() => {
              setShowVinyls(true)
              handleSubmit();
              setPageIndex(1)
              setShowAlert(false)
            }}
          >
            Get recommandations based on this playlist
          </Button>
          </>
        )}
        <Center>
        {showVinyls ?
                recomendationIsLoading
                    ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        color='teal.500'
                        emptyColor='gray.200'
                        size='xl'
                        alignSelf={'center'}/>
                    :
                    <Elements elements={vinyls} changeIndex={changeIndex} pageIndex={pageIndex} color={"orange"}/>
                : null
            }
        </Center>
        </Stack>
    );
}



export default NewPlaylistFile;