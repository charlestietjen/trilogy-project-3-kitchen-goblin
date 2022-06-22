import { useState } from 'react'
import { Box, Avatar, AvatarBadge, Text, Editable, EditableInput, Container, Stack, Center, Divider, IconButton, Link } from "@chakra-ui/react"
import { EditIcon } from '@chakra-ui/icons'
import Auth from '../../utils/auth'

export const Account = () => {
    const [profileState, setProfileState] = useState(Auth.getProfile().data)
    return (
        <Box w={['80vw', null, '40vw']} borderRadius={'lg'} bg='blackAlpha.600'>
            <Stack align='center' px={2} py={8}>
                <Center>
                    <Avatar boxSize={'15vh'} src={profileState.avatar || ''}><AvatarBadge icon={<EditIcon />} /></Avatar>
                </Center>
                <Container>
                    <Text>Username</Text>
                    <Divider />
                    <Text>{profileState.username}</Text>
                </Container>
                <Container>
                    <Text>Email</Text>
                    <Divider />
                    <Text m={3}>{profileState.email}<IconButton ml={3} size={'sm'} icon={<EditIcon />}/></Text>
                </Container>
            </Stack>
        </Box>
    )
}