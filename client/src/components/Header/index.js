import {
    Grid,
    GridItem,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Heading,
    Link,
    Avatar
    } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { LOGIN } from '../../utils/actions';
import {
    HamburgerIcon
} from '@chakra-ui/icons';
import { FiLogIn, FiLogOut, FiPlus } from 'react-icons/fi';
import Auth from '../../utils/auth';
import './style.css';

export const Header = () => {
    const handleLogout = () => {
        Auth.logout();
    }

    return (
        <Grid display='flex'>
            <GridItem w='10%'>
            <Menu>
                <MenuButton m={2} size='lg' as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant="outline" />
                <MenuList>
                    {Auth.loggedIn() ?
                    <>
                        <MenuItem as={RouterLink} to='/dashboard'>
                            <Avatar src={Auth.getProfile().data.avatar} size='md' marginRight={2} />{Auth.getProfile().data.username}
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <FiLogOut />Log Out
                        </MenuItem>
                    </>
                    :
                    <>
                        <MenuItem as={RouterLink} to='/login'>
                            <FiLogIn /> Log In
                        </MenuItem>
                        <MenuItem as={RouterLink} to='/signup'>
                            <FiPlus /> Sign Up
                        </MenuItem>
                    </>
                    }
                </MenuList>
            </Menu>
            </GridItem>
            <GridItem w='80%'>
            <Heading m={2} fontSize='4vmax' textAlign='center'><Link as={RouterLink} to='/'>Kitchen Goblin</Link></Heading>
            </GridItem>
        </Grid>
    )
}