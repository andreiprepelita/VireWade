import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import imageExample from '../../assets/image.jpg'
import VerticalLibrary from "./VerticalLibrary.jsx";

const VerticalElementsList = () => {

    const getPlaylistsURL = ""

    const [playlistsIds, setPlaylistsIds] = useState([])

    useEffect(() => {

        console.log('another test')

        if (sessionStorage.getItem('token') != null) {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization':  'Bearer ' + sessionStorage.getItem('token')
                },
            }

            fetch(getPlaylistsURL, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPlaylistsIds(data)
            });
        }

    }, []);

    useEffect(() => {
        
        if (playlistsIds !== undefined && playlistsIds !== null && playlistsIds.length > 0) {

            console.log('inside: ' + playlistsIds)
            let playlists = []

            const requests = playlistsIds.map(playlistId => {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization':  'Bearer ' + sessionStorage.getItem('token')
                    },
                };

                return fetch(getPlaylistsURL + "/" + playlistId + "/info", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        playlists.push({
                            title: data['meta']['title'],
                            id: playlistId,
                            author: data['meta']['creator'],
                            image: data['meta']['image'],
                            genre: data['meta']['genre'],
                            tracks: data['tracks']
                        });
                    });
            });

            Promise.all(requests)
                .then(() => {
                    console.log(playlists);
                    setElements(playlists);
                });
        }

    }, [playlistsIds])

    const [elements, setElements] = useState([

        {
            id: 1,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        },
        {
            id: 2,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        }
        ,
        {
            id: 3,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        }, {
            id: 4,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        },
        {
            id: 5,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        }
        ,
        {
            id: 6,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        },
        {
            id: 7,
            image: imageExample,
            title: "Vinyl Name",
            author: "Author Name",
            genre: "Genre",
            tracks: [
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 1"
                },
                {
                    "creator": "Author Name",
                    "image": imageExample,
                    "title": "Song title 2"
                }
            ]
        }
    ])

    return (

        <Flex alignItems="flex-start" direction="column">
            <VerticalLibrary elements={elements} />
        </Flex>
    )
}

export default VerticalElementsList;