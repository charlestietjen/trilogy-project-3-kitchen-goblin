import {
    Input,
    Text,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Switch,
    Stack,
    Textarea,
    SimpleGrid,
    Grid,
    GridItem,
    Box,
    IconButton,
    Checkbox
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

export const AddRecipe = () => {
    const [formState, setFormState] = useState({
        isPublic: false
    })
    const [ingredients, setIngredients] = useState([{
        ingredientName: '',
        quantity: ''
    }]);
    const [steps, setSteps] = useState([{
        text: ''
    }]);
    const addIngredient = () => {
        const newIngredient = {ingredientName: '', quantity: ''};
        setIngredients([...ingredients, newIngredient])
    }
    const removeIngredient = () => {
        const lastIngredient = ingredients[ingredients.length -1];
        const newIngredients = ingredients.filter((t) => t !== lastIngredient);
        setIngredients(newIngredients)
    }
    const handleChange = e => {
        setFormState({...formState, [e.target.id]:e.target.value})
        console.log(formState)
    }
    const publicHandler = e => {
        setFormState({...formState, isPublic: e.target.value})
    }
    useEffect(() => {
    })
    return (
        <Stack display='flex' align='center' paddingTop='12vmax'>
            <form onChange={handleChange}>
                <Stack>
                <FormControl w='35vmax'>
                    <FormLabel>Recipe Name</FormLabel>
                    <Input id='recipeName' placeholder='Enter a name...' />
                    <FormLabel>Description</FormLabel>
                    <Textarea id='shortDescription' rows='7' size='md' placeholder='Enter a short description...'></Textarea>
                    <FormLabel>Ingredients</FormLabel>
                    {ingredients.map((ingredient, i) => (
                        <Grid id={`ingredient${i}`}templateColumns='repeat(6, 1fr)' key={i}>
                            <GridItem colSpan={4}>
                                <FormHelperText>Ingredient Name</FormHelperText>
                                <Input name='ingredientName' />
                            </GridItem>
                            <GridItem colStart={5} colSpan={2}>
                                <FormHelperText>Quantity</FormHelperText>
                                <Input name='quantity' />
                            </GridItem>
                        </Grid>
                    ))}
                    <Grid templateColumns='repeat(4, 1fr)'>
                        <GridItem colSpan={2}>
                            <IconButton onClick={addIngredient} margin='1vmax' icon={<AddIcon />}/>
                        </GridItem>
                        {ingredients.length>1?(
                            <GridItem colSpan={2}>
                                <IconButton onClick={removeIngredient} margin='1vmax' icon={<MinusIcon />} />
                            </GridItem>
                        ):(<></>)}
                    </Grid>
                    <SimpleGrid columns={2}>
                        <FormLabel>Public Recipe</FormLabel>
                        <Switch value={true} name='isPublic' id='isPublic' />
                    </SimpleGrid>
                </FormControl>
                </Stack>
            </form>
        </Stack>
    )
}