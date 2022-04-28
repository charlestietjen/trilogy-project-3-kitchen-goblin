import React from 'react'
import {
    Grid,
    GridItem,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    Link,
    Avatar,
    Text,
    Icon,
    useColorMode,
    SimpleGrid,
    HStack,
    Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useStoreContext } from '../../utils/GlobalState';
import { HamburgerIcon, AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Auth from '../../utils/auth';

export const Header = () => {
    const handleLogout = () => {
        Auth.logout();
    }
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Grid display='flex'>
            <GridItem w='10%'>
                <Menu isLazy>
                    <MenuButton boxShadow={'dark-lg'} marginX={3} marginY={7} w={[10, 20]} h={[10, 20]} as={IconButton} aria-label='Options' icon={<HamburgerIcon fontSize={['x-large', 'xx-large']} />} variant="outline" />
                    <MenuList>
                        {Auth.loggedIn() ?
                            <>
                                <MenuItem as={RouterLink} to='/dashboard'>
                                    <Avatar src={Auth.getProfile().data.avatar} size='md' marginRight={2} />{Auth.getProfile().data.username}
                                </MenuItem>
                                <MenuItem>

                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Icon as={FiLogOut} /><Text marginLeft={2}>Log Out</Text>
                                </MenuItem>
                            </>
                            :
                            <>
                                <MenuItem as={RouterLink} to='/login'>
                                    <Icon as={FiLogIn} /><Text marginLeft={2}>Log In</Text>
                                </MenuItem>
                                <MenuItem as={RouterLink} to='/signup'>
                                    <AddIcon /><Text marginLeft={2}>Sign Up</Text>
                                </MenuItem>
                            </>
                        }
                    </MenuList>
                </Menu>
            </GridItem>
            <GridItem w={'85%'}>
                <HStack display={'flex'} justifyContent={'center'}>
                    {/* <Heading m={2} fontSize={['4vmax', null, null, '3.5vmax']} textAlign='center'><Link as={RouterLink} to='/'>Kitchen Goblin</Link></Heading> */}
                    <Link marginLeft={2} as={RouterLink} to={'/'}><Image src={require('../../assets/img/header.webp')} /></Link>
                    {colorMode === 'dark'?(<IconButton boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<SunIcon />} />):(<IconButton boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<MoonIcon />} />)}
                </HStack>
            </GridItem>
        </Grid>
    )
}