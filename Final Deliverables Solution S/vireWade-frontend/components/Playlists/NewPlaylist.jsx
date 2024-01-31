import React, { useState, useEffect, Fragment } from "react";
import { Stack, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { Navigate } from "react-router-dom"
import VerticalElementsList from "../VerticalElementsList/VerticalElementsList";

function NewPlaylistFile() {

    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [userIsAuth, setIsUserAuth] = useState(getToken());
    const [elements, setElements] = useState([])
    const [alert, setAlert] = useState();

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
                const response = await fetch("http://localhost:8081/recommendation/playlist/local", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml",
    
                    },
                    body: fileContent
                });
    
                // Check if the response is in JSON format
                if (response.headers.get("content-type")?.includes("application/json")) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse); // Print the JSON response
                } else {
                    const textResponse = await response.text();
                    console.log(textResponse); // Print the text response
                }
    
                if (!response.ok) {
                    setAlert(`Failed to upload file. Status: ${response.status}`);
                }
    
                setAlert("File uploaded successfully.");
                // The window reload is commented out, uncomment if you need it
                // window.location.reload();
            } catch (error) {
                console.error(error);
                setAlert(`Failed to upload file: ${error.message}`);
            }
        };
    
        fileReader.onerror = () => {
            setAlert("Failed to read the file.");
        };
    
        fileReader.readAsBinaryString(file); // or use readAsArrayBuffer if you want to send it as binary
        setIsOpen(false);
        setFile(null)
    };


  
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
        <Stack className="blueBox">
        {alert ?
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
          alignSelf="flex-start"
          onClick={handleClick}
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
          <Button
            colorScheme="orange"
            type="submit"
            padding="20px"
            alignSelf="flex-start"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
        </Stack>
    );
}



export default NewPlaylistFile;