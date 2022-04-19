import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Text,
    Link,
    Stack,
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { ImageUpload } from '../../components';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

export const Signup = () => {
    const [ avatarSrc, setAvatarSrc ] = useState('');
    const [avatarFile, setAvatarFile] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addUser] = useMutation(ADD_USER);

    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState, [e.target.id]:e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                username: formState.username
            }
        });
        const token = mutationResponse.data.addUser.token;
        console.log(token);
        Auth.login(token, true)
    };

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
                    <ImageUpload onClose={onClose} state={avatarSrc} setNewState={setAvatarSrc} fileState={avatarFile} setFileState={setAvatarFile} />
                </ModalBody>
            </ModalContent>
        </Modal>
        <Stack paddingTop='15vh' display='flex' align='center'>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={handleChange} align='center' padding='2vmax' border='solid' borderRadius='5%' bg='blackAlpha.500' shadow='outline' w='40vmax'>
                    <Stack display='flex'>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Input id='email' type='email' />
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id='username' type='username' />
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' />
                    <FormHelperText>Your password must be at least 6 characters and contain at least one special character.</FormHelperText>
                    {/* <FormLabel alignSelf='center' htmlFor='avatar'>Upload an Avatar</FormLabel>
                    <Avatar alignSelf='center' src={avatarSrc} onClick={onOpen} marginTop='1vh' size='xl' /> */}
                    <Button alignSelf='center' type='submit'>Sign Up</Button>
                    </Stack>
                </FormControl>
            </form>
        </Stack>
        </>
    )
}