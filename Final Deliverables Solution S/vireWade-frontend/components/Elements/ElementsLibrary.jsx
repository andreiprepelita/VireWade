import { Box, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";
import "./ElementsLibrary.css";
import {
    IoIosArrowBack,
    IoIosArrowForward
} from "react-icons/io";
import VinylCard from "../VinylCard/VinylCard";

const ElementsLibrary = ({ elements }) => {
    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        if (!ref.current) return;
        ref.current.scrollLeft += scrollOffset;
    };

    const getLeftArrows = () => {

        return (
            <IoIosArrowBack
                size="120px"
                className="leftArrowSimple"
                color={"teal"}
                onClick={() => scroll(-250)}
            />
        )
    }

    const getRightArrows = () => {
        return (
            <IoIosArrowForward
                size="120px"
                className="leftArrowSimple"
                color={"teal"}
                onClick={() => scroll(600)}
            />
        )
    }

    return (
        <Flex
            position="relative"
            id="elementsLibrary"
            direction={"column"}
            textAlign="start"
        >
            <Flex direction={"row"}>
                {getLeftArrows()}
                <Box ref={ref} className="ScrollableList">

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