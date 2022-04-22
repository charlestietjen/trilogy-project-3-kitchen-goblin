import Auth from '../../utils/auth';
import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Text,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    Avatar,
    Button,
    useDisclosure,
    Stack,
    Box
} from '@chakra-ui/react';
import { ImageUpload } from '../../components/ImageUpload';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from '../../utils/mutations';

export const SignupAvatar = () => {
    const user = Auth.getProfile().data;
    const [avatarSrc, setAvatarSrc] = useState('');
    const [avatarFile, setAvatarFile] = useState({});
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [updateUser] = useMutation(UPDATE_USER)
    const navigate = useNavigate();

    const imageProperties = {
        uploadedBy: user.username, category: 'avatar'
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const mutationResponse = await updateUser({
            variables: {...user, avatar: avatarSrc}});
        const token = mutationResponse.data.updateUser.token;
        Auth.logout(true);
        Auth.login(token);
    }

    const imageCallback = imageData => {
        setAvatarSrc(imageData.src)
        onClose()
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w='80vw'>
                    <ModalHeader>
                        <Text>Upload an Avatar</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody align='center'>
                        <ImageUpload onClose={onClose} callback={imageCallback} properties={imageProperties} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box paddingTop='15vh'>
                <form onSubmit={handleSubmit}>
                    <Stack display='flex' align='center'>
                        <FormLabel alignSelf='center' htmlFor='avatar'>Upload an Avatar</FormLabel>
                        <Avatar alignSelf='center' src={avatarSrc} onClick={onOpen} marginTop='1vh' size='xl' />
                        <Button type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}
