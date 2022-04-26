import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_RECIPE } from '../../utils/queries'
import Auth from '../../utils/auth'
import { useParams, Link } from 'react-router-dom'
import {
    Spinner,
	Stack,
	Heading,
	SimpleGrid,
	Tag,
	Avatar,
	TagLabel,
	Image,
	Box,
	VStack,
	Text,
	Container,
	Divider,
	Button
} from '@chakra-ui/react'
import { SpinnerFullPage } from '../../components'

export const RecipeDetails = () => {
	const { id } = useParams();
	const {loading, data} = useQuery(QUERY_RECIPE, {
		variables: { id: id}
	});
	const { recipeName, image, ingredients, shortDescription, steps, username } = data?.recipe.recipe || {};
	const { avatar, _id } = data?.recipe.user || {};
	return(
		<>
			{loading?(<SpinnerFullPage />):(
				<Stack align='center' paddingTop={20}>
					<Heading w={'40vmax'} textAlign='center' fontSize={'1.5rem'}>{recipeName}</Heading>
					<SimpleGrid w={'90%'} columns={2}>
						<Box w={'max'}>
							<Tag as={Link} to={`/user/${username}`} size='lg'>
								<Avatar ml={-1} mr={2} size={'sm'} src={avatar} />
								<TagLabel>{username}</TagLabel>
							</Tag>
						</Box>
						<Image w={'100%'} src={image} />
					</SimpleGrid>
					{_id === Auth.getProfile().data._id && 
						<Button as={Link} to={`/recipe/${data.recipe.recipe._id}/edit`}>Edit Recipe</Button>
					}
					<Container>
						{shortDescription}
					</Container>
					<Text>Ingredients</Text>
					<SimpleGrid padding={1} border={'solid'} bg={'blackAlpha.500'} columns={2}>
						<VStack divider={<Divider />} mr={6}>{ingredients.map(({ ingredientName }, i) => (
							<Box key={i}>{ingredientName}</Box>
						))}</VStack>
						<VStack divider={<Divider />}>{ingredients.map(({ quantity }, i) => (
							<Box key={i}>{quantity}</Box>
						))}</VStack>
					</SimpleGrid>
					{steps.map(({ text, image }, i) => (
						<Box w='90%' key={i}>
							<Text fontWeight={'bold'} m={1}>Step {i+1}</Text>
							<Container paddingBottom={'1.5em'}>{text}</Container>
							<Image src={image} />
						</Box>
					))}
				</Stack>
			)}
		</>
	);
};