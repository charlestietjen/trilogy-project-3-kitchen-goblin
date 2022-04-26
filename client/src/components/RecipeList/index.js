import {
    Image,
    Box,
    Stack,
    Text,
    Heading
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const RecipeList = (props) => {
    const { recipes } = props;
    return (
        <>
            {recipes.map(recipe => (
                <Box as={Link} to={`/recipe/${recipe._id}`} alignSelf='center' w={['20em', '22em', '25em', '40em']} border='solid' borderRadius='5%' padding='1vmax' margin='1vmax' bg='blackAlpha.500' key={Math.floor(Math.random() * 65535)}>
                    <Stack display='flex' align='center'>
                        <Heading fontSize={['1.2em', '1.3em', '1.6em','2em']}>{recipe.recipeName}</Heading>
                        <Image w='25vmax' src={recipe.image} />
                        <Text>
                            {recipe.shortDescription}
                        </Text>
                    </Stack>
                </Box>
            ))}
        </>
    )
}