import React from 'react'
import {
    Link,
    Image,
    Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {

    return (
        <Link as={RouterLink} to={'/'}><Box h='fit-content'><Image maxH='13vh' src={require('../../assets/img/header.webp')} /></Box></Link>
    )
}