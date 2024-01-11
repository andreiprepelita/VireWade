import React from 'react';
import {
    Box,
    Flex,
    Stack,
    Link,
    Button,
    Heading
} from '@chakra-ui/react';


const NavBar = ({ items }) => {

    const NavButtons = () => {

        return (
            <Stack direction={'row'} spacing={6} alignItems='flex-end'>
                {items.map((navItem) => (

                    <Box key={navItem.label} width='fit-content'>
                        <Link href={navItem.href}>
                            <Button
                                p={5}
                                href={navItem.href ?? '/'}
                                fontWeight={600}
                                textAlign='center'
                                colorScheme='teal'>
                                {navItem.label}
                            </Button>
                        </Link>
                    </Box>
                ))}
            </Stack>
        );
    };

    return (
        <Box backgroundColor={'#81E6D9'}>
            <Flex
                color='green'
                minH={'60px'}
                py={{ base: 4 }}
                px={{ base: 4 }}
                width="95%"
                white-space="nowrap">
                <Flex flex={{ base: 1 }} justify={{ base: 'center' }} justifyContent='space-between'>
                    <Heading display={"inline-block"}>
                        <Link _hover={{
                            textDecoration: 'none', color: 'white'
                        }}
                            href={'/'}>ViReWade</Link>
                    </Heading>

                    <Flex display={{ base: 1, md: 'flex' }} ml={5} >
                        <NavButtons />
                    </Flex>
                </Flex>

            </Flex>
        </Box>
    )
}

export default NavBar;