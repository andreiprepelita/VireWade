import React from "react";
import { Flex } from "@chakra-ui/react";

import ElementsLibrary from "./ElementsLibrary";

const Elements = ({ elements }) => {

    return (

        <Flex alignItems="flex-start" direction="column" px={{base: 3}} py={{base: 3}} >
            <ElementsLibrary elements={elements} />
        </Flex>
    )
}

export default Elements;