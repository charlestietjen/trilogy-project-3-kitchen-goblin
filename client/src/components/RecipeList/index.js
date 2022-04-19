import {
    Image,
    Box,
    Stack,
    Text,
    Heading
} from '@chakra-ui/react';

export const RecipeList = (props) => {
    const { recipes } = props;
    return (
        <>
            {recipes.map(recipe => (
                <Box alignSelf='center' w='42vmax'border='solid' borderRadius='5%' padding='1vmax' margin='1vmax' bg='blackAlpha.500' key={Math.floor(Math.random() * 65535)}>
                    <Stack display='flex' align='center'>
                        <Heading fontSize='2.4vmax'>{recipe.name}</Heading>
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