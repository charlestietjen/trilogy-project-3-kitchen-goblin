import { 
    Heading,
    Input,
    FormControl,
    FormHelperText,
    FormLabel,
    Switch,
    Stack,
    Textarea,
    SimpleGrid,
    Grid,
    GridItem,
    IconButton,
    Button,
    Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { ImageUpload } from '../../components';
import { useNavigate } from 'react-router-dom';

export const AddRecipe = () => {
    const navigate = useNavigate();
    const [addRecipe] = useMutation(ADD_RECIPE);
    const [formState, setFormState] = useState({
        isPublic: false,
        ingredients: [{ingredientName: '', quantity: ''}],
        steps: [{text: '', image: ''}]
    });
    const addIngredient = () => {
        let newIngredients = formState.ingredients
        newIngredients.push({ingredientName: '', quantity: ''})
        setFormState({...formState, ingredients: newIngredients});
    };
    const removeIngredient = () => {
        let newIngredients = formState.ingredients;
        newIngredients.pop();
        setFormState({...formState, ingredients: newIngredients});
    };
    const addStep = () => {
        let newSteps = formState.steps;
        newSteps.push({text: '', image: ''});
        setFormState({...formState, steps: newSteps});
    };
    const removeStep = () => {
        let newSteps = formState.steps;
        newSteps.pop();
        setFormState({...formState, steps: newSteps});
    };
    const handleStepImage = imageData => {
        const { url } = imageData;
        const { i } = imageData.properties.index;
        const newSteps = formState.steps;
        newSteps[i].image = url;
        setFormState({...formState, steps: newSteps});
    }
    const handleTitleImage = e => {
        const { url } = e;
        setFormState({...formState, image: url});
    };
    const handleChange = e => {
        if (e.target.name.split('.').shift() === 'ingredientName' || e.target.name.split('.').shift() === 'quantity'){
            const { name, value } = e.target;
            const newIngredients = [...formState.ingredients]
            newIngredients[e.target.name.split('.').pop()][name.split('.').shift()] = value;
            setFormState({...formState, ingredients: newIngredients})
            return;
        } else if (e.target.name.split('.').shift() === 'text' || e.target.name.split('.').shift() === 'image'){
            const { name, value } = e.target;
            const newSteps = [...formState.steps];
            newSteps[e.target.name.split('.').pop()][name.split('.').shift()] = value;
            setFormState({...formState, steps: newSteps});
            return;
        }
        setFormState({...formState, [e.target.name]:e.target.value || e.target.checked})
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const mutationResponse = await addRecipe({
            variables: {
                recipeName: formState.recipeName,
                shortDescription: formState.shortDescription,
                ingredients: formState.ingredients,
                steps: formState.steps,
                image: formState.image,
                isPublic: formState.isPublic,
                username: Auth.getProfile().data.username
            }
        }).then(({ data }) => {
            navigate(`/recipe/${data.addRecipe._id}`, { replace: true });
        })

    };
    return (
        <Stack display='flex' align='center' paddingTop={15}>
            <Heading fontSize={25}>Add a Recipe</Heading>
            <form name='recipe' onSubmit={handleSubmit} onChange={handleChange}>
                <Stack w='40vmax' divider={true}>
                    <FormControl>
                        <FormLabel>Recipe Name</FormLabel>
                        <Input name='recipeName' placeholder='Enter a name...' />
                        <FormLabel>Description</FormLabel>
                        <Textarea name='shortDescription' rows='7' size='md' placeholder='Enter a short description...' />
                        <FormLabel>Title Picture</FormLabel>
                        <ImageUpload callback={handleTitleImage} properties={{uploadedBy: Auth.getProfile().data.username, category: 'recipe'}} />
                        <FormLabel>Ingredients</FormLabel>
                        {formState.ingredients.map((ingredient, i) => (
                            <Grid templateColumns='repeat(6, 1fr)' key={i}>
                                <GridItem colSpan={4}>
                                    <FormHelperText>Ingredient Name</FormHelperText>
                                    <Input name={`ingredientName.${i}`}/>
                                </GridItem>
                                <GridItem colStart={5} colSpan={2}>
                                    <FormHelperText>Quantity</FormHelperText>
                                    <Input name={`quantity.${i}`} />
                                </GridItem>
                            </Grid>
                        ))}
                        <SimpleGrid columns={2}>
                            <IconButton icon={<AddIcon />} onClick={addIngredient} margin={4} />
                            {formState.ingredients.length>1?(
                                <IconButton icon={<MinusIcon />} margin={4} onClick={removeIngredient} />
                            ):('')}
                        </SimpleGrid>
                        <FormLabel>Directions</FormLabel>
                        {formState.steps.map((step, i) => (
                            <Box align='center' key={i}>
                                <FormHelperText> Step {i + 1}</FormHelperText>
                                <Textarea margin={2} name={`text.${i}`} rows={8} />
                                <FormHelperText>Step {i+1} Picture (Optional)</FormHelperText>
                                <ImageUpload callback={handleStepImage} properties={{category: 'step', uploadedBy: Auth.getProfile().data.username, index: {i}}} options={{size: '25vmax'}}/>
                            </Box>
                        ))}
                        <SimpleGrid columns={2}>
                            <IconButton icon={<AddIcon />} onClick={addStep} margin={4} />
                            {formState.steps.length>1?(
                                <IconButton icon={<MinusIcon />} margin={4} onClick={removeStep} />
                            ):('')}
                        </SimpleGrid>
                        <FormLabel>Public Recipe</FormLabel>
                        <Switch name='isPublic' />
                        <SimpleGrid columns={2}>
                            <Button type='submit'>Add to Book</Button>
                            <Button as={Link} to='/dashboard'>Cancel</Button>
                        </SimpleGrid>
                    </FormControl>
                </Stack>
            </form>
        </Stack>
    )
}