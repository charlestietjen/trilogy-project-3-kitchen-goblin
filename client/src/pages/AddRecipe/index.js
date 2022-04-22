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
    Checkbox,
    Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';

export const AddRecipe = () => {
    const [formState, setFormState] = useState({
        isPublic: false
    })
    const [ingredients, setIngredients] = useState([{
        ingredientName: '',
        quantity: ''
    }]);
    const [steps, setSteps] = useState([{
        text: '', image: ''
    }]);
    const [addRecipe, { error }] = useMutation(ADD_RECIPE);
    const [isPublic, setIsPublic] = useState(false)
    const addIngredient = () => {
        const newIngredient = {ingredientName: '', quantity: ''};
        setIngredients([...ingredients, newIngredient])
    }
    const removeIngredient = () => {
        let lastIngredient = ingredients[ingredients.length -1];
        let newIngredients = ingredients.filter((t) => t !== lastIngredient);
        setIngredients(newIngredients)
        let newFormState = {...formState};
        lastIngredient = `ingredientName.${ingredients.length -1}`;
        let lastQuantity = `quantity.${ingredients.length -1}`;
        delete newFormState[lastIngredient];
        delete newFormState[lastQuantity]
        setFormState(newFormState);
    }
    const handleChange = e => {
        setFormState({...formState, [e.target.id]:e.target.value, isPublic: e.target.checked, ingredients: ingredients, steps: steps })
    }
    const publicHandler = e => {
        let { checked } = e.target;
        setFormState({...formState, isPublic: checked})
        // setIsPublic(checked);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        // package data for mutation
        const mutationResponse = await addRecipe({
            variables: {
                recipeName: formState.recipeName,
                shortDescription: formState.shortDescription,
                steps: formState.steps,
                ingredients: formState.ingredients,
                isPublic: formState.isPublic,
                image: formState.image
            }
        })
        console.log(mutationResponse)
    }
    const handleIngredientChange = e => {
        e.preventDefault();
        let { name, value } = e.target;
        let i = e.target.id.split('.').pop()
        let newIngredients = [...ingredients]
        newIngredients[i][name] = value;
        setIngredients(newIngredients)
    }
    const handleStepsChange = e => {
        e.preventDefault();
        let { name, value } = e.target;
        name = name.split('.');
        let i = name[name.length -1];
        name = name[0];
        let newSteps = [...steps];
        newSteps[i][name] = value;
        setSteps(newSteps);
    }
    const addStep = () => {
        let newStep = {text: '', image: ''};
        setSteps([...steps, newStep])
    }
    const removeStep = () => {
        let lastStep = steps[steps.length -1];
        let newSteps = steps.filter((t) => t !== lastStep);
        setSteps(newSteps)
        setFormState({...formState, steps: newSteps});
    }
    useEffect(() => {
    })
    return (
        <Stack display='flex' align='center' paddingTop='12vmax'>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Stack>
                <FormControl w='35vmax'>
                    <FormLabel>Recipe Name</FormLabel>
                    <Input id='recipeName' placeholder='Enter a name...' />
                    <FormLabel>Description</FormLabel>
                    <Textarea id='shortDescription' rows='7' size='md' placeholder='Enter a short description...'></Textarea>
                    <FormLabel>Ingredients</FormLabel>
                    {ingredients.map((ingredient, i) => (
                        <Grid onChange={handleIngredientChange} id={`ingredient${i}`}templateColumns='repeat(6, 1fr)' key={i}>
                            <GridItem colSpan={4}>
                                <FormHelperText>Ingredient Name</FormHelperText>
                                <Input id={`ingredientName.${i}`} name='ingredientName' />
                            </GridItem>
                            <GridItem colStart={5} colSpan={2}>
                                <FormHelperText>Quantity</FormHelperText>
                                <Input id={`quantity.${i}`} name='quantity' />
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
                    <FormLabel>Directions</FormLabel>
                    {steps.map((step, i) => (
                        <div key={i}>
                            <FormHelperText>Step {i + 1}</FormHelperText>
                            <Textarea margin={2} onChange={handleStepsChange} name={`text.${i}`} rows={8} />
                        </div>
                    ))}
                    <SimpleGrid columns={2} gap={40} margin='1vmax'>
                        <IconButton onClick={addStep} icon={<AddIcon />} />
                        {steps.length>1?(
                            <IconButton onClick={removeStep} icon={<MinusIcon />} />
                        ):(<></>)}
                    </SimpleGrid>
                    <SimpleGrid columns={2}>
                        <FormLabel>Public Recipe</FormLabel>
                        <Switch name='isPublic' id='isPublic' />
                    </SimpleGrid>
                    <SimpleGrid columns={2} gap={30}>
                        <Button type='submit'>Add to Book</Button>
                        <Link to='/dashboard'><Button>Cancel</Button></Link>
                    </SimpleGrid>
                </FormControl>
                </Stack>
            </form>
        </Stack>
    )
}