import React, { useState } from "react";
import { Stack, Button } from "@chakra-ui/react";
import VerticalElementsList from "../VerticalElementsList/VerticalElementsList";

function Playlists() {
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    // const handleClick = () => {
    //   setIsOpen(true);
    // };
  
    // const handleFileChange = (event) => {
    //   const pickedFile = event.target.files[0];
    //   if (pickedFile.name.endsWith("xml") || pickedFile.name.endsWith("xspf")) {
    //     setFile(pickedFile);
    //     setIsOpen(false);
    //   } else {
    //     alert("Only XML and XSPF files are allowed.");
    //   }
    // };
  
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
  
    return (
      <Stack className="blueBox">
        <Button
          colorScheme="orange"
          type="submit"
          padding="20px"
          alignSelf="flex-start"
        //   onClick={handleClick}
        >
          Add Playlist
        </Button>
        {isOpen && (
          <input
            type="file"
            accept="application/xml"
            // onChange={handleFileChange}
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
        <VerticalElementsList />
      </Stack>
    );
  }
  

export default Playlists;