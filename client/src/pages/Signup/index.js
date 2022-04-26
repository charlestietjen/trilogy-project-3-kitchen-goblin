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
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

export const Signup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();

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
        Auth.login(token, true);
    };

    return (
        <Stack paddingTop='15vh' display='flex' align='center'>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={handleChange} align='center' padding='2vmax' border='solid' borderRadius='5%' bg='blackAlpha.500' shadow='outline' w={['40vmax', null, '45vh']}>
                    <Stack display='flex'>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Input id='email' type='email' />
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id='username' type='username' />
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' />
                    <FormHelperText>Your password must be at least 6 characters and contain at least one special character.</FormHelperText>
                    <Button alignSelf='center' type='submit'>Sign Up</Button>
                    </Stack>
                </FormControl>
            </form>
            <Text>Already have an account? <Link as={RouterLink} to='/login'>Click here</Link></Text>
        </Stack>
    )
}