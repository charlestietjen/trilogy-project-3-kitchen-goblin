import React from 'react'
import {
    Spinner,
    Box
} from '@chakra-ui/react'

export const SpinnerFullPage = () => {
    return(
    <Box display={'flex'} justifyContent={'center'} align={'center'} paddingTop={'30vh'}>
        <Spinner size={'xl'} />
    </Box>
    )
}