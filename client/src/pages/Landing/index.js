import { Stack } from '@chakra-ui/react';
import { RecipeList, Search } from '../../components';
import { useQuery } from '@apollo/client';
import { ALL_RECIPES } from '../../utils/queries';
import { SpinnerFullPage } from '../../components';

export const Landing = () => {
    const {loading, data} = useQuery(ALL_RECIPES);
    const recipes = data?.allrecipes || [];

    return (
        <Stack marginTop={10} display='flex'>
            <Search />
            {loading?(<SpinnerFullPage />):(<RecipeList recipes={recipes} />)}
            
        </Stack>
    )
}