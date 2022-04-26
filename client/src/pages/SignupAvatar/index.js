import Auth from '../../utils/auth';
import { useState } from 'react';
import {
    FormLabel,
    Button,
    Stack,
    Box,
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
            variables: { _id: user._id, avatar: imageData.url}});
        const token = mutationResponse.data.updateUser.token;
        if (mutationResponse.data){
            Auth.logout(true);
            Auth.login(token);
        }
        console.log('Something went wrong!')
    }

    return (
        <Stack paddingTop='15vh' display='flex' align='center'>
            <FormLabel alignSelf='center' htmlFor='avatar'>Upload an Avatar</FormLabel>
            <Box alignSelf='center' marginTop='1vh' size='xl'>
                <ImageUpload options={{size: '150px', isAvatar: true}} callback={imageCallback} properties={imageProperties} />
            </Box>
            <Button as={Link} to={'/dashboard'}>Skip</Button>
        </Stack>
    )
}
