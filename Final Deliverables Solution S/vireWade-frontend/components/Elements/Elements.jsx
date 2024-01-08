import React from "react";
import { Flex } from "@chakra-ui/react";

import ElementsLibrary from "./ElementsLibrary";

const ElementsList = ({ elements }) => {

    return (

        <Flex alignItems="flex-start" direction="column" py={{ base: 4 }} px={{ base: 4 }}>
            <ElementsLibrary elements={elements} />
        </Flex>
    )
}

export default ElementsList;