import { Stack, Text, SimpleGrid, VStack, Box, Container, Image, Divider } from '@chakra-ui/react';

export const CookDetails = ({ ...cook } : cook) => {
    return (
    <Stack>
        <Image w={'100%'} src={cook.image || ''} />
        <Text>Ingredients</Text>
        <SimpleGrid padding={1} border={'solid'} bg={'blackAlpha.500'} columns={2}>
            <VStack divider={<Divider />} mr={6}>{cook.ingredients.map(({ ingredientName }: any, i: number) => (
                <Box key={i}>{ingredientName}</Box>
            ))}</VStack>
            <VStack divider={<Divider />}>{cook.ingredients.map(({ quantity }, i) => (
                <Box key={i}>{quantity}</Box>
            ))}</VStack>
        </SimpleGrid>
        {cook.steps.map(({ text, image }: any, i: number) => (
            <Box display={'flex'} w='90%' key={i}>
                <Text fontWeight={'bold'} m={1}>Step {i+1}</Text>
                <Container textAlign={'left'} paddingBottom={'1.5em'}>{text}</Container>
                <Image src={image} />
            </Box>
        ))}
    </Stack>
    )
}