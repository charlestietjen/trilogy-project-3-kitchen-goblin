import { React, useEffect } from 'react'
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
import { SpinnerFullPage, AvatarTag } from '../../components'

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
				_id: id
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
							<Stack marginBottom={4} border={'solid thin'} boxShadow={'xl'} w={['20em', null, '60em']} align={'center'} alignContent='center' paddingTop={7}>
								<Heading textShadow={'1px 0px black'} w={'40vmax'} textAlign='center' fontSize={'1.5rem'}>{recipeName}</Heading>
								<TabPanels>
									<TabPanel align={'center'}>
										<SimpleGrid w={'90%'} columns={2} margin={3}>
											<Box boxShadow={'xl'} w={'max'} h={'max'}>
												<AvatarTag avatar={avatar} username={username} />
											</Box>
											<Image alt={`A picture of ${recipeName}`} boxShadow={'2xl'} borderRadius={5} w={'100%'} src={image} />
										</SimpleGrid>
										{Auth.loggedIn() ? (
											<>
												{_id === Auth.getProfile().data._id &&
													<SimpleGrid columns={2} spacing={'3em'}>
														<Button boxShadow={'dark-lg'} colorScheme={'action'} as={Link} to={`/recipe/${data.recipe.recipe._id}/edit`}><EditIcon marginRight={1} />Edit Recipe</Button>
														<Popover>
															<PopoverTrigger>
																<Button boxShadow={'dark-lg'} colorScheme={'action'}><DeleteIcon marginRight={1} />Delete Recipe</Button>
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
										<Text fontWeight={'bold'} margin={2}>Ingredients</Text>
										<VStack boxShadow={'dark-lg'} marginY={2} border={['solid thin']} bg={'blackAlpha.500'}>
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
										<Stack boxShadow={'lg'} marginTop={6}>
											<Text fontWeight={'bold'}>Directions</Text>
											{steps.map(({ text, image }, i) => (
												<Box display={'flex'} w='90%' key={i}>
													<Text fontWeight={'bold'} m={1}>Step {i + 1}</Text>
													<Container textAlign={'left'} paddingBottom={'1.5em'}>{text}</Container>
													<Image src={image} />
												</Box>
											))}
										</Stack>
									</TabPanel>
									{cooks.map(({ image, steps, ingredients, notes }, i) => (
										<TabPanel key={i}>
											<Image alt={`A picture of ${recipeName}`} boxShadow={'2xl'} borderRadius={5} boxSize={'50%'} src={image} />
											<Text marginY={1} fontWeight={'bold'}>Notes</Text>
											<Container>{notes}</Container>
											<Text marginY={2} fontWeight={'bold'}>Ingredients</Text>
											<VStack border={'solid thin'} bg={'blackAlpha.500'}>
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
											<Stack boxShadow={'lg'} marginTop={6}>
												<Text fontWeight={'bold'}>Directions</Text>
												{steps.map(({ text, image }, i) => (
													<Box display={'flex'} w='90%' key={i}>
														<Text fontWeight={'bold'} m={1}>Step {i + 1}</Text>
														<Container textAlign={'left'} paddingBottom={'1.5em'}>{text}</Container>
														<Image src={image} />
													</Box>
												))}
											</Stack>
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