import {
    Button,
    Stack,
    Spinner,
    Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RecipeList, Search } from '../../components';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../../utils/queries';
import { SpinnerFullPage } from '../../components';

export const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_RECIPES, {
        variables: { username: Auth.getProfile().data.username }
    });
    const recipes = data?.recipes || [];
    return (
        <Stack display='flex' align='center' paddingTop='10vmax'>
            <Search />
            <Button><Link to='/addRecipe'>Add Recipe</Link></Button>
            {loading? (<SpinnerFullPage /> ): (<></>)}
            {recipes.length > 0 ? (<RecipeList recipes={recipes} />) : (<Text>Add a recipe to get started!</Text>)}
        </Stack>
    )
}