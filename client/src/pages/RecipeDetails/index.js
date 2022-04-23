import { useQuery } from "@apollo/client";
import { QUERY_RECIPE } from "../../utils/queries";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import {
Spinner,
Stack,
Heading,
SimpleGrid,
Tag,
Avatar,
TagLabel,
Image,
Box,
VStack,
Text,
Container
} from '@chakra-ui/react';

export const RecipeDetails = () => {
    const { id } = useParams();
    const {loading, data} = useQuery(QUERY_RECIPE, {
        variables: { id: id}
    });
    const { recipeName, image, ingredients, shortDescription, steps, username } = data?.recipe.recipe || {};
    const { avatar } = data?.recipe.user || {};
    return(
        <>
            {loading?(<Spinner />):(
                <Stack align='center' paddingTop={20}>
                    <Heading fontSize={'1.5rem'}>{recipeName}</Heading>
                    <SimpleGrid columns={2}>
                        <Tag size='lg'>
                            <Avatar ml={-1} mr={2} size={'sm'} src={avatar} />
                            <TagLabel>{username}</TagLabel>
                        </Tag>
                        <Image margin={4} src={image} />
                    </SimpleGrid>
                    <Text>Ingredients</Text>
                    <SimpleGrid columns={2}>
                        <VStack mr={6}>{ingredients.map(({ ingredientName }, i) => (
                            <Box key={i}>{ingredientName}</Box>
                        ))}</VStack>
                        <VStack>{ingredients.map(({ quantity }, i) => (
                            <Box key={i}>{quantity}</Box>
                        ))}</VStack>
                    </SimpleGrid>
                    {steps.map(({ text, image }, i) => (
                        <Box w='90%' key={i}>
                            <Text>Step {i+1}</Text>
                            <Container>{text}</Container>
                            <Image src={image} />
                        </Box>
                    ))}
                </Stack>
            )}
        </>
    )
}