import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Text
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalState'
import { AddIcon } from '@chakra-ui/icons'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import Auth from '../../utils/auth'

export const NavSubMenu = () => {
    const handleLogout = () => {
        Auth.logout()
    }
    return (
        <Menu isLazy>
            <MenuButton boxShadow={'dark-lg'} as={Avatar} aria-label='Account menu' src={Auth.loggedIn()? Auth.getProfile().data.avatar:''} />
            <MenuList>
                {Auth.loggedIn() ?
                    <>
                        <MenuItem onClick={handleLogout}>
                            <Icon as={FiLogOut} /><Text>Log Out</Text>
                        </MenuItem>
                    </> :
                    <>
                        <MenuItem as={RouterLink} to='/login'>
                            <Icon as={FiLogIn} /><Text>Log In</Text>
                        </MenuItem>
                        <MenuItem as={RouterLink} to='/signup'>
                            <AddIcon /><Text>Sign Up</Text>
                        </MenuItem>
                    </>}
            </MenuList>
        </Menu>
    )
}