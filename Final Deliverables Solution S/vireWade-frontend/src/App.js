import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ChakraProvider, Stack } from '@chakra-ui/react';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login';
import Playlists from '../components/Playlists/Playlists';
import Profile from '../components/Profile/Profile';
import NavBarController from '../components/NavBar/NavBarController';
import Discog from '../components/Discog/Discog';
import NewPlaylistFile from '../components/Playlists/NewPlaylist';

const App = () => {
  return (
    <ChakraProvider className="app">
        <Stack
        className="app"
        flex={{ base: 1, md: 0 }}
        direction={'column'}
        justify={'flex-end'}
        spacing={6}>
            <NavBarController />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/login" element={<Login />}/>
                    <Route exact path="/register" element={<Login />}/>
                    <Route exact path="/playlists/:userId" element={<Playlists />}/>
                    <Route exact path="/profile/:userId" element={<Profile />}/>
                    <Route exact path="/purchases" element={<Discog />} />
                    <Route exact path="/playlists/file" element={< NewPlaylistFile/>} />
                </Routes>
            </BrowserRouter>
        </Stack>
    </ChakraProvider>
  
    );
};
export default App;