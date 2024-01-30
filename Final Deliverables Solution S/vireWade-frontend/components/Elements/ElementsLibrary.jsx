import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "./ElementsLibrary.css";
import {
    IoIosArrowBack,
    IoIosArrowForward
} from "react-icons/io";
import VinylCard from "../VinylCard/VinylCard";

const ElementsLibrary = ({ elements, changeIndex, pageIndex }) => {
    


    const getLeftArrows = () => {

        return (
            <IoIosArrowBack
                size="120px"
                className="leftArrowSimple"
                color={"teal"}
                onClick={async () => {
                    
                    
                    changeIndex(pageIndex - 1);
                }}
            />
        )
    }

    const getRightArrows = () => {
        return (
            <IoIosArrowForward
                size="120px"
                className="leftArrowSimple"
                color={"teal"}
                onClick={async () => {
                    
                    
                    changeIndex(pageIndex + 1);
                }}
            />
        )
    }
    useEffect(() => {

    }, [pageIndex])

    return (
        <Flex
            position="relative"
            id="elementsLibrary"
            direction={"column"}
            textAlign="start"
        >
            <Flex direction={"row"} justify={"center"}>
                {getLeftArrows()}
                <Box className="ScrollableList">

                    {elements.map((element) => (
                        <Box display="inline-block" className="elementsBox" key={element.vinyl + element.artist + element.genre} mr="4" >
                            <VinylCard element={element} key={element.vinyl + element.artist + element.genre}  />
                        </Box>
                    ))}

                </Box>
                {getRightArrows()}
            </Flex>
        </Flex>
    );
};

export default ElementsLibrary;