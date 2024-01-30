import { Box, Flex } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import "./VerticalLibrary.css";

const VerticalLibrary = ({ elements, playlistStructureData }) => {


    useEffect(() => {
        console.log("VerticalLibrary is rerendered")
        console.log("ELEMENTS ARE: ", elements)

        
    }, [])

    let artists = "";
    let artistsNames = [];

    const getPlaylistStructuredData = (playlistImg, playlistName, playlistDescription, playlistTracks) => {
        playlistStructureData = {
            "@context": "https://schema.org/",
            "@type": "MusicPlaylist",
            "numTracks": playlistTracks.length,
            "image": playlistImg,
            "name": playlistName,
            "abstract": playlistDescription,
            "track": {
                "@type": "ItemList",
                "itemListElement": []
            }
        }

        let authors = "";
        playlistTracks.forEach(track => {


            if(authors !== "") {
                authors +=","
            }
            authors += track.track.artists[0].id
            artistsNames.push(track.track.artists[0].name);

            console.log("Track is +++ ", track)
            playlistStructureData.track.itemListElement.push({
            "@type": "MusicRecording",
            "name": track.track.name,
            "byArtist": {
                "@type": "Person",
                "name": track.track.artists[0].name
                },
            "genre": track.track.genre,
            "image": track.track.album.images[1].url
        })})
        artists = authors;
        return playlistStructureData;
      };

   

    return (
        <Flex
            id="elementsLibraryVertical"
            textAlign="start"
        >
            <Flex direction={"row"} width='100%'>
                <Box className="ScrollableListVertical">

                    {elements.map((element, i) => {
                        return (
                        <Box className="elementsBox" key={element.id} mr="4">
                            {<script type="application/ld+json">
                                {JSON.stringify(getPlaylistStructuredData(element.image, element.title, element.description, element.tracks))}
                            </script>}
                            <PlaylistCard key={element.id + i} element={element} artists={artists} artistsNames={artistsNames}/>
                        </Box>
                    )}
                    )}

                </Box>
            </Flex>
        </Flex>
    );
};

export default VerticalLibrary;