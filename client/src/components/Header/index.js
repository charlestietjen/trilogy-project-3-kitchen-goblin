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
                        <Link as={RouterLink} to='/dashboard'>
                            <MenuItem>
                                <Avatar src={`./assets/img/avatar/${Auth.getProfile().data.username}`} size='sm' marginRight='1vh' /><Text>{Auth.getProfile().data.username}</Text>
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={handleLogout}>
                            <FiLogOut />Log Out
                        </MenuItem>
                    </>
                    :
                    <>
                        <Link as={RouterLink} to='/login'>
                            <MenuItem>
                                <FiLogIn /> Log In
                            </MenuItem>
                        </Link>
                        <Link as={RouterLink} to='/signup'>
                            <MenuItem>
                                <FiPlus /> Sign Up
                            </MenuItem>
                        </Link>
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