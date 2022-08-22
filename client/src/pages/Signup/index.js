import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Text,
    Link,
    Stack,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Box,
    Center
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { validatePassword } from '../../utils/helpers';
import { Terms } from '../../components'

export const Signup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        avatar: '',
        validPassword: true
    });

    const handleChange = (e) => {
        setFormState({
            ...formState, [e.target.id]: e.target.value
        })
        console.log(validatePassword(formState.password))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validatePassword(formState.password)) {
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                    username: formState.username
                }
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token, true);
        } else {
            setFormState({...formState, validPassword: false})
        }
    };

    return (
        <Stack paddingTop={['10%', 0, 0]} display='flex' align='center'>
            <form onSubmit={handleSubmit}>
                <FormControl backdropFilter={'auto'} backdropBlur={'0.1em'} onChange={handleChange} isInvalid={!formState.validPassword} align='center' padding='2vmax' borderRadius='5%' bg='blackAlpha.500' shadow='dark-lg' w={['40vmax', null, '45vh']}>
                    <Stack display='flex'>
                        <Text>Create your Kitchen Goblin account below.</Text>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Input id='email' type='email' />
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input id='username' type='username' />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' type='password' />
                        <FormErrorMessage>Your password does not meet the minimum requirements, please try again.</FormErrorMessage>
                        <FormHelperText>Your password must be at least 6 characters and contain at least one special character.</FormHelperText>
                        <Text>By creating an account you agree to abide by our terms and conditions viewable below.</Text>
                        <Box>
                        <Button m={1} alignSelf='center' type='submit'>Sign Up</Button><Button onClick={onOpen} m={1}>Terms and Conditions</Button>
                        </Box>
                        <Text>Already have an account? <Link as={RouterLink} to='/login'>Click here</Link></Text>
                    </Stack>
                </FormControl>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Terms />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Stack>
    )
}