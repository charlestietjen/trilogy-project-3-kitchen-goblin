import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RECIPE } from '../../utils/queries';
import { stripTypenames } from '../../utils/helpers'
import {
    Stack,
    Editable,
    EditablePreview,
    EditableInput,
    EditableTextarea,
    Image,
    Text,
    SimpleGrid,
    VStack,
    Divider,
    Box,
    Switch,
    FormLabel,
    Button,
    FormControl
} from '@chakra-ui/react'
import { SpinnerFullPage } from '../../components';
import { UPDATE_RECIPE } from '../../utils/mutations'
import { ImageUpload } from '../../components';
export const EditRecipe = () => {
    const { id } = useParams()
	const {loading, data} = useQuery(QUERY_RECIPE, {
		variables: { id: id}
	})
    const [formState, setFormState] = useState({
    })
    const [updateRecipe] = useMutation(UPDATE_RECIPE)

    const handleChange = e => {
        if (e.target.name.split('.').shift() === 'ingredientName' || e.target.name.split('.').shift() === 'quantity'){
            let newState = [...formState.ingredients]
            let index = e.target.name.split('.').pop()
            let newElement = {...newState[index]}
            let target = e.target.name.split('.').shift();
            newElement[target] = e.target.value;
            newState[index] = newElement
            setFormState({...formState, ingredients: newState})
            return;
        } else if (e.target.name.split('.').shift() === 'text' || e.target.name.split('.').shift() === 'image'){
            let newState = [...formState.steps]
            let index = e.target.name.split('.').pop()
            let newElement = {...newState[index]}
            let target = e.target.name.split('.').shift();
            newElement[target] = e.target.value;
            newState[index] = newElement
            setFormState({...formState, steps: newState})
            return;
        }
        setFormState({...formState, [e.target.name]:e.target.value || e.target.checked})
    }
    const handleStepImage = imageData => {
        const { url } = imageData;
        console.log(imageData.properties)
        const i = imageData.properties.index;
        const newSteps = formState.steps;
        newSteps[i].image = url;
        setFormState({...formState, steps: newSteps});
    }
    const handleTitleImage = e => {
        const { url } = e;
        setFormState({...formState, image: url});
    };
    const handleSubmit = async e => {
        e.preventDefault()
        const mutationData = await updateRecipe({
            variables: {
                id: id,
                recipeName: formState.recipeName,
                shortDescription: formState.shortDescription,
                ingredients: formState.ingredients,
                steps: formState.steps,
                image: formState.image,
                isPublic: formState.isPublic,
            }
        })
        if (mutationData){
            window.location.assign(`/recipe/${id}`);
        } else {
            console.log('Something went wrong.')
        }
    }
    useEffect(() => {
        if (data){
            const recipeData = stripTypenames(data.recipe.recipe)
            setFormState({
                recipeName: recipeData.recipeName,
                image: recipeData.image,
                ingredients: recipeData.ingredients,
                shortDescription: recipeData.shortDescription,
                steps: recipeData.steps,
                username: recipeData.username,
            })
        }
    },[data])
    return (
        <>
            {loading?(
                <SpinnerFullPage />
            ):(
            <Stack align='center' paddingTop={20} paddingBottom={'2em'}>
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <FormControl align='center' w={'40vmax'}>
                        <FormLabel>Recipe Title</FormLabel>
                        <Editable placeholder='Enter a title...' defaultValue={data.recipe.recipe.recipeName}>
                            <EditablePreview />
                            <EditableInput name='recipeName' w={'40vmax'} textAlign='center' fontSize={'1.5rem'} />
                        </Editable>
                        <FormLabel>Recipe Title Image</FormLabel>
                        <ImageUpload callback={handleTitleImage} properties={{uploadedBy: data.recipe.recipe.username, category: 'recipe', src: data.recipe.recipe.image}} />
                        <FormLabel>Recipe Description</FormLabel>
                        <Editable defaultValue={data.recipe.recipe.shortDescription}>
                            <EditablePreview />
                            <EditableTextarea name='shortDescription' />
                        </Editable>
                        <Box align={'left'}>
                            <FormLabel>Public Recipe</FormLabel>
                            <Switch name='isPublic' />
                        </Box>
                        <FormLabel>Ingredients</FormLabel>
                        <SimpleGrid padding={1} border={'solid'} bg={'blackAlpha.500'} columns={2}>
                            <VStack divider={<Divider />} mr={6}>{data.recipe.recipe.ingredients.map(({ ingredientName }, i) => (
                                <Editable key={i} defaultValue={ingredientName}>
                                    <EditablePreview />
                                    <EditableInput name={`ingredientName.${i}`} /> 
                                </Editable>
                                ))}</VStack>
                                <VStack divider={<Divider />}>{data.recipe.recipe.ingredients.map(({ quantity }, i) => (
                                    <Editable key={i} defaultValue={quantity}>
                                        <EditablePreview />
                                        <EditableInput name={`quantity.${i}`} />
                                    </Editable>
                                ))}</VStack>
                            </SimpleGrid>
                            {data.recipe.recipe.steps.map(({ text, image }, i) => (
                                <Box textAlign={'left'} w='90%' key={i}>
                                    <FormLabel fontWeight={'bold'} m={1}>Step {i+1}</FormLabel>
                                    <Editable defaultValue={text}>
                                        <EditablePreview />
                                        <EditableTextarea name={`text.${i}`} rows={8} />
                                    </Editable>
                                    <ImageUpload callback={handleStepImage} properties={{category: 'step', uploadedBy: data.recipe.recipe.username, index: i, src: image}} options={{size: '25vmax'}}/>
                                </Box>
                            ))}
                            <Button marginTop={'1em'} type='submit'>Submit</Button>
                        </FormControl>
                    </form>
              </Stack>
            )}
        </>
    )
}