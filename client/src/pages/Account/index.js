import { useState } from 'react'
import { Box, Avatar, AvatarBadge, Text, Editable, EditableInput, Container, Stack, Center, Divider, Icon, IconButton, Link } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
import { EditIcon } from '@chakra-ui/icons'
import Auth from '../../utils/auth'

export const Account = () => {
    const [profileState, setProfileState] = useState(Auth.getProfile().data)
    return (
        <Center>
            <Box w={['80vw', null, '40vw']} borderRadius={'lg'} backdropFilter={'auto'} backdropBlur={'0.1em'} boxShadow={'dark-lg'} bg='blackAlpha.600'>
                <Stack align='center' px={2} py={8}>
                    <Center>
                        <Link as={RouterLink} to='/avatar'>
                            <Avatar boxSize={'15vh'} src={profileState.avatar || ''}><AvatarBadge color='whiteAlpha.600' borderColor='whiteAlpha.600' boxSize={'2.5em'}><Icon fontSize='xx-large' as={EditIcon} /></AvatarBadge></Avatar>
                        </Link>
                    </Center>
                    <Container>
                        <Text>Username</Text>
                        <Divider />
                        <Text>{profileState.username}</Text>
                    </Container>
                    <Container>
                        <Text>Email</Text>
                        <Divider />
                        <Text m={3}>{profileState.email}<IconButton ml={3} size={'sm'} icon={<EditIcon />} /></Text>
                    </Container>
                </Stack>
            </Box>
        </Center>
    )
}