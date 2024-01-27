import { Box, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import "./VerticalLibrary.css";

const VerticalLibrary = ({ elements }) => {
    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        if (!ref.current) return;
        ref.current.scrollLeft += scrollOffset;
    };

    console.log("ELEMENTS ARE: ", elements)

    let playlistStructureData = {};
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

        playlistTracks.forEach(track => {
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
        return playlistStructureData;
      };

    return (
        <Flex
            id="elementsLibraryVertical"
            textAlign="start"
        >
            <Flex direction={"row"} width='100%'>
                <Box ref={ref} className="ScrollableListVertical">

                    {elements.map((element, i) => (
                        <Box className="elementsBox" key={element.id} mr="4">
                            {<script type="application/ld+json">
                                {JSON.stringify(getPlaylistStructuredData(element.image, element.title, element.description, element.tracks))}
                            </script>}
                            <PlaylistCard key={element.id + i} element={element} />
                        </Box>
                    ))}

                </Box>
            </Flex>
        </Flex>
    );
};

export default VerticalLibrary;