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
    
    
    const handleLogout = () => {
    
        localStorage.removeItem('user')
        window.location.reload();
    }

    const NavButtons = () => {

        return (
            <Stack direction={'row'} spacing={6} alignItems='flex-end'>
                {items.map((navItem) => (
                    
                    <Box key={navItem.label} width='fit-content'>
                        <Link href={navItem.href}>
                            <Button
                                p={5}
                                href={navItem.href ?? '/'}
                                onClick={navItem.label === 'Logout'? handleLogout : null}
                                fontWeight={600}
                                textAlign='center'
                                colorScheme={navItem.label !== 'Logout' ? 'orange': 'red'}>
                                {navItem.label}
                            </Button>
                        </Link>
                    </Box>
                ))}
            </Stack>
        );
    };

    return (
        <Box backgroundColor={'#0088cc'}>
            <Flex
                color='#FFD700'
                minH={'60px'}
                py={{ base: 4 }}
                px={{ base: 4 }}
                width="95%"
                white-space="nowrap">
                <Flex flex={{ base: 1 }} justify={{ base: 'center' }} justifyContent='space-between'>
                    <Heading display={"inline-block"}>
                        <Link _hover={{
                            textDecoration: 'none', color: '#dd6b20'
                        }}
                            href={'/'}>ViReWade</Link>
                    </Heading>

                    <Flex display={{ base: 1, md: 'flex' }} ml={5} >
                        {  (window.location.pathname !== 'login' && window.location.pathname !== 'register') ?
                            <NavButtons />
                        :null}
                    </Flex>
                </Flex>

            </Flex>
        </Box>
    )
}

export default NavBar;