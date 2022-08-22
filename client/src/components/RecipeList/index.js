import { React, useState } from 'react'
import {
    Image,
    Box,
    Stack,
    Text,
    Heading,
    Grid,
    GridItem,
    Input,
    IconButton
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Search } from '../';

export const RecipeList = (props) => {
    const { recipes } = props;
    const [filteredRecipes, setFilteredRecipes] = useState([...recipes]);
    const handleSearchInput = e => {
        const { value } = e.target;
        if (!value){
            setFilteredRecipes([...recipes]);
            return;
        };
        const newFilteredList = recipes.filter(ele => {
            return ele.recipeName.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredRecipes([...newFilteredList]);
    };
    return (
        <Stack>
            <Grid boxShadow={'lg'} alignSelf='center' w='35vmax' display='flex' gap={1}>
                <GridItem my={2} mx={1} w='100%'>
                    <form>
                        <Input backdropFilter={'auto'} backdropBlur={'0.1em'} boxShadow={'dark-lg'} bg='blackAlpha.600' onChange={handleSearchInput} />
                    </form>
                </GridItem>
                <GridItem m={2}>
                    <IconButton backdropFilter={'auto'} backdropBlur={'0.1em'} boxShadow={'dark-lg'} bg='blackAlpha.600' icon={<SearchIcon />} />
                </GridItem>
            </Grid>
            {filteredRecipes.map(recipe => (
                <Box backdropFilter={'auto'} backdropBlur={'0.1em'} as={Link} to={`/recipe/${recipe._id}`} alignSelf='center' w={['85vw', null, '50vw']} boxShadow={'dark-lg'} borderRadius='5%' padding='1vmax' margin='1vmax' bg='blackAlpha.600' key={recipe._id}>
                    <Stack display='flex' align='center'>
                        <Heading fontSize={['1.2em', '1.3em', '1.6em', '2em']}>{recipe.recipeName}</Heading>
                        <Image borderRadius={5} boxShadow={'dark-lg'} w='25vmax' src={recipe.image} />
                        <Text>
                            {recipe.shortDescription}
                        </Text>
                    </Stack>
                </Box>
            ))}
        </Stack>
    )
}