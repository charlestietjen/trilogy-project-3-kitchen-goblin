import { Stack } from '@chakra-ui/react';
import { RecipeList, Search } from '../../components';

const recipes = [
    {
        name: 'Vegan Fried Chicken Experiment',
        image: require('../../assets/img/chickex.jpg'),
        shortDescription: 'Written recipes from the recent episode of my cooking show where I test out 4 different plant based ingredients to see which makes the best alternative to Kentucky fried chicken. The winner was Oyster mushrooms & the recipe for that can be found here. Below are the recipes for the other 3 ingredients I experimented with, seitan, jackfruit & tofu.'
    },
    {
        name: 'Vegan Fried Chicken Experiment',
        image: require('../../assets/img/chickex.jpg'),
        shortDescription: 'Written recipes from the recent episode of my cooking show where I test out 4 different plant based ingredients to see which makes the best alternative to Kentucky fried chicken. The winner was Oyster mushrooms & the recipe for that can be found here. Below are the recipes for the other 3 ingredients I experimented with, seitan, jackfruit & tofu.'
    },
    {
        name: 'Vegan Fried Chicken Experiment',
        image: require('../../assets/img/chickex.jpg'),
        shortDescription: 'Written recipes from the recent episode of my cooking show where I test out 4 different plant based ingredients to see which makes the best alternative to Kentucky fried chicken. The winner was Oyster mushrooms & the recipe for that can be found here. Below are the recipes for the other 3 ingredients I experimented with, seitan, jackfruit & tofu.'
    },
]

export const Landing = () => {
    return (
        <Stack display='flex'>
            <Search />
            <RecipeList recipes={recipes} />
        </Stack>
    )
}