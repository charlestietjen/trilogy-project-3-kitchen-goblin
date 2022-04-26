import { useState, useEffect } from 'react';
import { 
    Stack, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Text,
    Link,
    Button
 } from '@chakra-ui/react';
 import { useMutation } from '@apollo/client';
 import { useNavigate, Link as RouterLink } from 'react-router-dom';
 import Auth from '../../utils/auth';
 import { LOGIN } from '../../utils/mutations';

export const Login = () => {
    const [formState, setformState] = useState({
        email: '',
        password: '',
        isValid: true,
    });
    const [login, { error }] = useMutation(LOGIN);
    const navigate = useNavigate();

    const handleChange = e => {
        setformState({
            ...formState, 
            [e.target.id]:e.target.value,
            isValid: true
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const mutationResponse = await login({
        variables:
        {
            email: formState.email,
            password: formState.password
        }})
        const token = mutationResponse.data.login.token;
        Auth.login(token)
        navigate('/dashboard')
    }
    
    useEffect(() => {
        if (error){
            setformState({
                ...formState,
                isValid: false,
            });
        }
    }, [error]);
    return (
        <Stack paddingTop='15vh' display='flex' align='center'>
            <Text>Enter your email and password below to login.</Text>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={handleChange} isInvalid={!formState.isValid} padding={['2vmax']} border='solid' borderRadius='5%' bg='blackAlpha.500' shadow='outline' w={['40vmax', null, '45vh']} >
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input id='email' type='email' />
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' />
                    <FormErrorMessage w={'max'} padding={1} bgColor={'red.900'}>Email or password incorrect!</FormErrorMessage>
                    <Button type='submit' margin='1vmax'>Log In</Button>
                </FormControl>
            </form>
            <Text>Not signed up yet? <Link as={RouterLink} to='/signup'>Click Here</Link></Text>
            <Text>Forgot your password? <Link as={RouterLink} to='/passwordreset'>Click Here</Link></Text>
        </Stack>
    )
}