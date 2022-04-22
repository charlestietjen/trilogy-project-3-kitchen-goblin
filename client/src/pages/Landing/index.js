import { Stack, Spinner } from '@chakra-ui/react';
import { RecipeList, Search } from '../../components';
import { useQuery } from '@apollo/client';
import { ALL_RECIPES } from '../../utils/queries';

export const Landing = () => {
    const {loading, data} = useQuery(ALL_RECIPES);
    const recipes = data?.allrecipes || [];

    return (
        <Stack display='flex'>
            <Search />
            {loading?(<Spinner />):(<RecipeList recipes={recipes} />)}
            
        </Stack>
    )
}