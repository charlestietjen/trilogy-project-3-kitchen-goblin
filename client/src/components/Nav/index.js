import { Box, Text, Link, Flex, Avatar } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
export const Nav = () => {
    return (
        <Flex bg='black' w='100%' h='100%' justifyContent={'space-evenly'}>
            <Text>Button1</Text>
            <Text>Button 2</Text>
        </Flex>
    )
}