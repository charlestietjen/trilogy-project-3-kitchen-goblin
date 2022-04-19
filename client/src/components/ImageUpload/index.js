import {
    Box,
    IconButton
} from '@chakra-ui/react';
import { FiImage } from 'react-icons/fi';

export const ImageUpload = () => {
    return (
        <Box>
            <IconButton size='50vw' icon={<FiImage size='50vw' />}></IconButton>
        </Box>
    )
};