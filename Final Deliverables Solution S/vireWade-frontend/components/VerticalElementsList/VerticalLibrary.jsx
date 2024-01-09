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

    let playlistStructureData = {};
    const getPlaylistStructuredData = (playlistImg, playlistName, playlistAuthor, playlistTracks) => {
        playlistStructureData = {
            "@context": "https://schema.org/",
            "@type": "MusicPlaylist",
            "numTracks": playlistTracks.length,
            "image": playlistImg,
            "name": playlistName,
            "author": playlistAuthor,
            "track": {
                "@type": "ItemList",
                "itemListElement": []
            }
        }

        playlistTracks.forEach(track => playlistStructureData.track.itemListElement.push({
            "@type": "MusicRecording",
            "name": track.title,
            "byArtist": {
                "@type": "Person",
                "name": track.creator
                },
            "genre": track.genre,
            "image": track.image
        }))
        return playlistStructureData;
      };

    return (
        <Flex
            id="elementsLibraryVertical"
            textAlign="start"
        >
            <Flex direction={"row"} width='100%'>
                <Box ref={ref} className="ScrollableListVertical">

                    {elements.map((element) => (
                        <Box className="elementsBox" key={element.id} mr="4">
                            {<script type="application/ld+json">
                                {JSON.stringify(getPlaylistStructuredData(element.image, element.title, element.author, element.tracks))}
                            </script>}
                            <PlaylistCard key={element.id} element={element} />
                        </Box>
                    ))}

                </Box>
            </Flex>
        </Flex>
    );
};

export default VerticalLibrary;