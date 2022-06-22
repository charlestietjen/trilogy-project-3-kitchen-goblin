import React from 'react'
import {
    Link,
    Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {

    return (
        <Link as={RouterLink} to={'/'}><Image src={require('../../assets/img/header.webp')} /></Link>
    )
}