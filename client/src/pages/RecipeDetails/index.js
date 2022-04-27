import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_RECIPE } from '../../utils/queries'
import { DELETE_RECIPE } from '../../utils/mutations'
import Auth from '../../utils/auth'
import { useParams, Link } from 'react-router-dom'
import {
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
	Button,
	Popover, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, PopoverArrow, PopoverTrigger,
	Tabs, TabPanels, TabPanel, Tab, TabList,
	Center,
	Spacer,
	Flex

} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { SpinnerFullPage } from '../../components'

export const RecipeDetails = () => {
	const { id } = useParams();
	const { loading, data } = useQuery(QUERY_RECIPE, {
		variables: { id: id }
	});
	const [deleteRecipe] = useMutation(DELETE_RECIPE);
	const { recipeName, image, ingredients, shortDescription, steps, username } = data?.recipe.recipe || {};
	const { cooks } = data?.recipe || []
	const { avatar, _id } = data?.recipe.user || {};

	const handleDelete = async e => {
		const mutationResponse = await deleteRecipe({
			variables: {
				id: id
			}
		})
		if (!mutationResponse) return
		window.location.assign('/dashboard')
	}
	return (
		<>
			{loading ? (<SpinnerFullPage />) : (
				<Tabs isLazy orientation={'vertical'} size={'sm'}>
					<Box align={'center'}>
						<SimpleGrid display={'flex'} columns={2}>
							<TabList w={['15%', null, null, '25em']}>
								<Tab>Main</Tab>
								{cooks ? (
									cooks.map((step, i) => (
										<Tab key={i}>Cook: {i + 1}</Tab>
									))
								) : ('')}
								{Auth.loggedIn() && _id === Auth.getProfile().data._id ? (
									<Tab as={Link} to={`addcook`}><AddIcon /></Tab>
								) : ('')}
							</TabList>
							<Stack w={['20em', null, '60em']} align={'center'} alignContent='center' paddingTop={7}>
								<Heading w={'40vmax'} textAlign='center' fontSize={'1.5rem'}>{recipeName}</Heading>
								<TabPanels>
									<TabPanel align={'center'}>
										<SimpleGrid w={'90%'} columns={2} margin={3}>
											<Box w={'max'}>
												<Tag as={Link} to={`/user/${username}`} size='lg'>
													<Avatar ml={-1} mr={2} size={'sm'} src={avatar} />
													<TagLabel>{username}</TagLabel>
												</Tag>
											</Box>
											<Image w={'100%'} src={image} />
										</SimpleGrid>
										{Auth.loggedIn() ? (
											<>
												{_id === Auth.getProfile().data._id &&
													<SimpleGrid columns={2} spacing={'3em'}>
														<Button as={Link} to={`/recipe/${data.recipe.recipe._id}/edit`}><EditIcon marginRight={1} />Edit Recipe</Button>
														<Popover>
															<PopoverTrigger>
																<Button><DeleteIcon marginRight={1} />Delete Recipe</Button>
															</PopoverTrigger>
															<PopoverContent w={'max'}>
																<PopoverArrow />
																<PopoverCloseButton />
																<PopoverHeader>Delete Recipe</PopoverHeader>
																<PopoverBody>
																	Warning: This cannot be undone.
																</PopoverBody>
																<PopoverFooter display={'flex'} justifyContent={'space-evenly'}>
																	<Button bgColor={'red'} color={'white'} w={'100%'} onClick={handleDelete}>Delete</Button>
																</PopoverFooter>
															</PopoverContent>
														</Popover>
													</SimpleGrid>
												}
											</>
										) : ('')}
										<Container marginY={2}>
											{shortDescription}
										</Container>
										<Text margin={2}>Ingredients</Text>
										<VStack marginY={2} border={'solid'} bg={'blackAlpha.500'}>
										{ingredients.map(({ ingredientName, quantity }, i) => (
											<Box w={'100%'} key={i}>
											<SimpleGrid w={'100%'} columns={2}>
												<Box textAlign={'center'}>
													{ingredientName}
												</Box>
												<Box textAlign={'center'}>
													{quantity}
												</Box>
											</SimpleGrid>
											<Divider />
											</Box>
										))}
										</VStack>
										{steps.map(({ text, image }, i) => (
											<Box display={'flex'} w='90%' key={i}>
												<Text fontWeight={'bold'} m={1}>Step {i + 1}</Text>
												<Container textAlign={'left'} paddingBottom={'1.5em'}>{text}</Container>
												<Image src={image} />
											</Box>
										))}
									</TabPanel>
									{cooks.map(({ image, steps, ingredients, notes }, i) => (
										<TabPanel key={i}>
											<Image boxSize={'50%'} src={image} />
											<Container>{notes}</Container>
											<Text>Ingredients</Text>
											<VStack border={'solid'} bg={'blackAlpha.500'}>
											{ingredients.map(({ ingredientName, quantity }, i) => (
												<Box w={'100%'} key={i}>
													<SimpleGrid w={'100%'} columns={2}>
														<Box textAlign={'center'}>
															{ingredientName}
														</Box>
														<Box textAlign={'center'}>
															{quantity}
														</Box>
													</SimpleGrid>
													<Divider />
												</Box>
											))}
											</VStack>
											{steps.map(({ text, image }, i) => (
												<Box display={'flex'} w='90%' key={i}>
													<Text fontWeight={'bold'} m={1}>Step {i + 1}</Text>
													<Container textAlign={'left'} paddingBottom={'1.5em'}>{text}</Container>
													<Image src={image} />
												</Box>
											))}
										</TabPanel>
									))}
								</TabPanels>
							</Stack>
						</SimpleGrid>
					</Box>
				</Tabs>
			)}
		</>
	);
};