import { Box, Text, Link, Flex, Avatar, Divider, Icon } from "@chakra-ui/react"
import { FaReadme, FaBook, FaHome, FaCalendarAlt, FaPlus } from 'react-icons/fa'
import { AddIcon } from "@chakra-ui/icons"
import { Link as RouterLink } from 'react-router-dom'
import { NavSubMenu } from "../NavSubmenu"
export const Nav = () => {
    return (
        <Flex borderTop='solid gray thin' bg='blackAlpha.400' color='whiteAlpha' w='100%' h='100%' align='center' justifyContent={'space-evenly'}>
            {/* avatar to be rewritten as a menu w/account options */}
            <NavSubMenu />
            <Divider orientation="vertical" />
            <Link textAlign='center' as={RouterLink} to='/dashboard'><Box h='100%'>
                <Icon fontSize={['xx-large']} as={FaBook} />
                <Text mb={2} fontSize={['small']}>My Recipes</Text>
            </Box></Link>
            <Divider orientation="vertical" />
            <Link textAlign='center' as={RouterLink} to='/'><Box h='100%'>
                <Icon fontSize={['xx-large']} as={FaHome} />
                <Text mb={2} fontSize={['small']}>Home</Text>
            </Box></Link>
            <Divider orientation="vertical" />
            <Link textAlign='center' as={RouterLink} to='/addrecipe'><Box h='100%'>
                <Icon fontSize={['xx-large']} as={FaPlus} />
                <Text mb={2} fontSize={['small']}>New Recipe</Text>
            </Box></Link>
            <Divider orientation="vertical" />
            {/* meal plan under cons. */}
            <Link textAlign='center' as={RouterLink} to='/mealplan'><Box h='100%'>
                <Icon fontSize={['xx-large']} as={FaCalendarAlt} />
                <Text mb={2} fontSize={['small']}>Meal Plan</Text>
            </Box></Link>
        </Flex>
    )
}