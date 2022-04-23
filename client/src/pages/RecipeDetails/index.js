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
Container,
Divider
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
                        <Box>
                            <Tag as={Link} to={`/user/${username}`} size='lg'>
                                <Avatar ml={-1} mr={2} size={'sm'} src={avatar} />
                                <TagLabel>{username}</TagLabel>
                            </Tag>
                        </Box>
                        <Image margin={4} src={image} />
                    </SimpleGrid>
                    <Container>
                        {shortDescription}
                    </Container>
                    <Text>Ingredients</Text>
                    <SimpleGrid padding={1} border={'solid'} bg={'blackAlpha.500'} columns={2}>
                        <VStack divider={<Divider />} mr={6}>{ingredients.map(({ ingredientName }, i) => (
                            <Box key={i}>{ingredientName}</Box>
                        ))}</VStack>
                        <VStack divider={<Divider />}>{ingredients.map(({ quantity }, i) => (
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