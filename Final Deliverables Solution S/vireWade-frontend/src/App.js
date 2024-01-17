import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ChakraProvider, Stack } from '@chakra-ui/react';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login';
import Playlists from '../components/Playlists/Playlists';
import Profile from '../components/Profile/Profile';
import NavBarController from '../components/NavBar/NavBarController';
import VinylDetails from '../components/VinylDetails/VinylDetails';
import Discog from '../components/Discog/Discog';
import Playlist from "../components/Playlist/Playlist";

const App = () => {
  return (
    <ChakraProvider className="app">
        <Stack
        className="app"
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'column'}
        spacing={6}>
            <NavBarController />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Profile />} />
                    <Route exact path="login" element={<Login />}/>
                    <Route exact path="playlists/:userId" element={<Playlists />}/>
                    <Route exact path="profile/:userId" element={<MainPage />}/>
                    <Route exact path="/vinyl/:artist/:vinylName/" element={<VinylDetails />} />
                    <Route exact path="/purchases" element={<Discog />} />
                    <Route exact path="/playlist" element={<Playlist />} />
                    
                </Routes>
            </BrowserRouter>
        </Stack>
    </ChakraProvider>
  
    );
};
export default App;