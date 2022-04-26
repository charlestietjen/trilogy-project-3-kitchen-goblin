import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RECIPE } from '../../utils/queries';
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
    FormLabel
} from '@chakra-ui/react'
import { SpinnerFullPage } from '../../components';
export const EditRecipe = () => {
    const { id } = useParams()
	const {loading, data} = useQuery(QUERY_RECIPE, {
		variables: { id: id}
	})
    const [formState, setFormState] = useState({
    })

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
    useEffect(() => {
        if (data){
            setFormState({
                recipeName: data.recipe.recipe.recipeName,
                image: data.recipe.recipe.image,
                ingredients: data.recipe.recipe.ingredients,
                shortDescription: data.recipe.recipe.shortDescription,
                steps: data.recipe.recipe.steps,
                username: data.recipe.recipe.username,
            })
        }
    },[data])
    return (
        <>
            {loading?(
                <SpinnerFullPage />
            ):(
            <Stack align='center' paddingTop={20}>
                <form onChange={handleChange}>
                    <FormLabel>Recipe Title</FormLabel>
                    <Editable placeholder='Enter a title...' defaultValue={data.recipe.recipe.recipeName}>
                        <EditablePreview />
                        <EditableInput name='recipeName' w={'40vmax'} textAlign='center' fontSize={'1.5rem'} />
                    </Editable>
                    <FormLabel>Recipe Title Image</FormLabel>
                    <Image w={'100%'} src={data.recipe.recipe.image} />
                    <FormLabel>Recipe Description</FormLabel>
                    <Editable defaultValue={data.recipe.recipe.shortDescription}>
                        <EditablePreview />
                        <EditableTextarea name='shortDescription' />
                    </Editable>
                    <FormLabel>Public Recipe</FormLabel>
                    <Switch name='isPublic' />
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
                            <Box w='90%' key={i}>
                                <FormLabel fontWeight={'bold'} m={1}>Step {i+1}</FormLabel>
                                <Editable defaultValue={text}>
                                    <EditablePreview />
                                    <EditableTextarea name={`text.${i}`} rows={8} />
                                </Editable>
                                <Image src={image} />
                            </Box>
                        ))}
                    </form>
              </Stack>
            )}
        </>
    )
}