import { useState } from 'react';
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

export const Login = () => {
    const [formState, setformState] = useState({
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        setformState({
            ...formState, [e.target.id]:e.target.value
        })
    };
    
    return (
        <Stack paddingTop='15vh' display='flex' align='center'>
            <Text>Enter your email and password below to login.</Text>
            <FormControl onChange={handleChange} isInvalid={!isValid} padding='2vmax' border='solid' borderRadius='5%' bg='blackAlpha.500' shadow='outline' w='40vmax' >
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' />
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password' />
                <FormErrorMessage>Email or password incorrect!</FormErrorMessage>
                <Button type='submit' margin='1vmax'>Log In</Button>
            </FormControl>
            <Text>Not signed up yet? Click <Link>Here</Link></Text>
            <Text>Forget your password? Click <Link>Here</Link></Text>
        </Stack>
    )
}