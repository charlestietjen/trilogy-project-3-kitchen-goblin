import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RECIPE } from '../../utils/queries';
import { stripTypenames } from '../../utils/helpers'
import {
    Stack,
    Editable,
    EditablePreview,
    EditableInput,
    EditableTextarea,
    IconButton,
    SimpleGrid,
    VStack,
    Divider,
    Box,
    Switch,
    FormLabel,
    Button,
    FormControl,
    Textarea
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { SpinnerFullPage } from '../../components';
import { ADD_COOK } from '../../utils/mutations'
import { ImageUpload } from '../../components';

export const AddCook = () => {
    const [addCook] = useMutation(ADD_COOK)
    const { id } = useParams()
    const { loading, data } = useQuery(QUERY_RECIPE, {
        variables: { id: id }
    })
    const [formState, setFormState] = useState({
        ingredients: [],
        steps: [],
    })
    const navigate = useNavigate()

    const handleChange = e => {
        if (e.target.name.split('.').shift() === 'ingredientName' || e.target.name.split('.').shift() === 'quantity') {
            let newState = [...formState.ingredients]
            let index = e.target.name.split('.').pop()
            let newElement = { ...newState[index] }
            let target = e.target.name.split('.').shift();
            newElement[target] = e.target.value;
            newState[index] = newElement
            setFormState({ ...formState, ingredients: newState })
            return;
        } else if (e.target.name.split('.').shift() === 'text' || e.target.name.split('.').shift() === 'image') {
            let newState = [...formState.steps]
            let index = e.target.name.split('.').pop()
            let newElement = { ...newState[index] }
            let target = e.target.name.split('.').shift();
            newElement[target] = e.target.value;
            newState[index] = newElement
            setFormState({ ...formState, steps: newState })
            return;
        }
        setFormState({ ...formState, [e.target.name]: e.target.value || e.target.checked })
    }
    const handleStepImage = imageData => {
        const { src } = imageData;
        const i = imageData.properties.index;
        const newSteps = formState.steps;
        newSteps[i].image = src;
        setFormState({ ...formState, steps: newSteps });
    }
    const handleTitleImage = e => {
        const { src } = e;
        setFormState({ ...formState, image: src });
    };
    const addStep = () => {
        let newSteps = formState.steps;
        newSteps.push({ text: '', image: '' });
        setFormState({ ...formState, steps: newSteps });
    };
    const removeStep = () => {
        let newSteps = formState.steps;
        newSteps.pop();
        setFormState({ ...formState, steps: newSteps });
    };
    const addIngredient = () => {
        let newIngredients = formState.ingredients
        newIngredients.push({ ingredientName: '', quantity: '' })
        setFormState({ ...formState, ingredients: newIngredients });
    };
    const removeIngredient = () => {
        let newIngredients = formState.ingredients;
        newIngredients.pop();
        setFormState({ ...formState, ingredients: newIngredients });
    };
    const handleSubmit = async e => {
        e.preventDefault()
        const mutationData = await addCook({
            variables: {
                recipeId: id,
                recipeName: formState.recipeName,
                shortDescription: formState.shortDescription,
                ingredients: formState.ingredients,
                steps: formState.steps,
                image: formState.image,
                isPublic: formState.isPublic,
                notes: formState.notes
            }
        })
        if (mutationData) {
            window.location.assign(`/recipe/${id}`);
        } else {
            console.log('Something went wrong.')
        }
    }
    useEffect(() => {
        if (data) {
            const recipeData = stripTypenames(data.recipe.recipe)
            setFormState(
                {
                    recipeName: recipeData.recipeName,
                    image: recipeData.image,
                    ingredients: recipeData.ingredients,
                    shortDescription: recipeData.shortDescription,
                    steps: recipeData.steps,
                    username: recipeData.username,
                }
            )
        }
    }, [data])
    return (
        <>
            {loading ? (
                <SpinnerFullPage />
            ) : ('')}
            {formState.recipeName ? (
                <Stack align='center' paddingTop={3} paddingBottom={'2em'}>
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <FormControl boxShadow={'dark-lg'} align='center' padding={2} w={['90vw',null,'40vw']}>
                            <FormLabel>Recipe Title</FormLabel>
                            <Editable boxShadow={'2xl'} placeholder='Enter a title...' defaultValue={formState.recipeName}>
                                <EditablePreview />
                                <EditableInput name='recipeName' w={'40vmax'} textAlign='center' fontSize={'1.5rem'} />
                            </Editable>
                            <FormLabel>Recipe Title Image</FormLabel>
                            <ImageUpload callback={handleTitleImage} properties={{ uploadedBy: formState.username, category: 'recipe', src: formState.image }} />
                            <FormLabel>Recipe Description</FormLabel>
                            <Editable boxShadow={'2xl'} defaultValue={formState.shortDescription}>
                                <EditablePreview />
                                <EditableTextarea name='shortDescription' />
                            </Editable>
                            <Box align={'left'}>
                                <FormLabel>Public Recipe</FormLabel>
                                <Switch name='isPublic' />
                            </Box>
                            <Box display={'flex'} justifyContent={'space-evenly'} marginY={'1em'}>
                                <Button boxShadow={'dark-lg'} type='submit'>Submit</Button><Button boxShadow={'dark-lg'} onClick={() => { navigate(-1) }}>Cancel</Button>
                            </Box>
                            <FormLabel>Ingredients</FormLabel>
                            <VStack padding={1} boxShadow={'2xl'} border={'solid thin'} bg={'blackAlpha.500'}>
                                {formState.ingredients.map(({ ingredientName, quantity }, i) => (
                                    <Box w={'100%'} key={i}>
                                        <SimpleGrid w={'100%'} columns={2}>
                                            <Editable placeholder='Ingredient name...' defaultValue={ingredientName}>
                                                <EditablePreview />
                                                <EditableInput name={`ingredientName.${i}`} />
                                            </Editable>
                                            <Editable placeholder='Quantity...' defaultValue={quantity}>
                                                <EditablePreview />
                                                <EditableInput name={`quantity.${i}`} />
                                            </Editable>
                                        </SimpleGrid>
                                        <Divider />
                                    </Box>
                                ))}
                            </VStack>
                            <SimpleGrid columns={2}>
                                <IconButton boxShadow={'dark-lg'} icon={<AddIcon />} onClick={addIngredient} margin={4} />
                                {formState.ingredients.length > 1 ? (
                                    <IconButton boxShadow={'dark-lg'} icon={<MinusIcon />} margin={4} onClick={removeIngredient} />
                                ) : ('')}
                            </SimpleGrid>
                            {formState.steps.map(({ text, image }, i) => (
                                <Box marginY={2} boxShadow={'2xl'} textAlign={'left'} w='90%' key={i}>
                                    <FormLabel fontWeight={'bold'} m={1}>Step {i + 1}</FormLabel>
                                    <Editable defaultValue={text}>
                                        <EditablePreview />
                                        <EditableTextarea name={`text.${i}`} rows={8} />
                                    </Editable>
                                    <ImageUpload callback={handleStepImage} properties={{ category: 'step', uploadedBy: formState.username, index: i, src: image }} options={{ size: ['20vmax', null, '16vmax'] }} />
                                </Box>
                            ))}
                            <SimpleGrid columns={2}>
                                <IconButton boxShadow={'dark-lg'} icon={<AddIcon />} onClick={addStep} margin={4} />
                                {formState.steps.length > 1 ? (
                                    <IconButton boxShadow={'dark-lg'} icon={<MinusIcon />} margin={4} onClick={removeStep} />
                                ) : ('')}
                            </SimpleGrid>
                            <FormLabel>Cook Notes</FormLabel>
                            <Textarea name='notes'></Textarea>
                            <Box display={'flex'} justifyContent={'space-evenly'} marginTop={'1em'}>
                                <Button boxShadow={'dark-lg'} type='submit'>Submit</Button><Button boxShadow={'dark-lg'} onClick={() => { navigate(-1) }}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </form>
                </Stack>
            ) : ('')}
        </>
    )
}