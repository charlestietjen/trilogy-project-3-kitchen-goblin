import { Box, Stack, Image, Text, Container } from "@chakra-ui/react"
import placeholder from '../../assets/img/undercon.gif'

export const MealPlan = () => {
    return (
        <Box w={['80vw', null, '40vw']} borderRadius={'lg'} bg='blackAlpha.600'>
            <Stack justify='center' align='center' px={2} py={8}>
                <Box>
                    <Image src={placeholder} />
                </Box>
                <Text textAlign='center'>Coming soon!</Text>
            </Stack>
        </Box>
    )
}