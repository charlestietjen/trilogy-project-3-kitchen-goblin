import Auth from '../../utils/auth';
import { useState } from 'react';
import {
    FormLabel,
    Button,
    Stack,
    Box,
    Center,
} from '@chakra-ui/react';
import { ImageUpload } from '../../components/ImageUpload';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom'

export const SignupAvatar = () => {
    const user = Auth.getProfile().data;
    const [avatarSrc, setAvatarSrc] = useState(user.avatar);
    const [updateUser] = useMutation(UPDATE_USER);

    const imageProperties = {
        uploadedBy: user.username, 
        category: 'avatar',
        src: avatarSrc
    }

    const imageCallback = async imageData => {
        // setAvatarSrc(imageData.url)
        const mutationResponse = await updateUser({
            variables: { userId: user._id, avatar: imageData.src}});
        const token = mutationResponse.data.updateUser.token;
        if (mutationResponse.data){
            Auth.logout(true);
            Auth.login(token);
            return;
        }
        console.log('Something went wrong!')
    }

    return (
        <Center>
        <Stack paddingTop='15vh' display='flex' align='center' bgColor={'blackAlpha.600'} p={10} borderRadius={4} boxShadow={'dark-lg'} backdropFilter={'auto'} backdropBlur={'0.1em'}>
            <FormLabel alignSelf='center' htmlFor='avatar'>Upload an Avatar</FormLabel>
            <Box alignSelf='center' marginTop='1vh' size='xl'>
                <ImageUpload options={{size: '150px', isAvatar: true}} callback={imageCallback} properties={imageProperties} />
            </Box>
            <Button boxShadow={'dark-lg'} as={Link} to={'/dashboard'}>Skip</Button>
        </Stack>
        </Center>
    )
}
