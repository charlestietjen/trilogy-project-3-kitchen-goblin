import React from 'react'
import { Text, Stack, Avatar, SimpleGrid, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_USER_PUBLIC } from '../../utils/queries';
import { SpinnerFullPage, RecipeList, Search } from '../../components';

export const User = () => {
    const { username } = useParams()
    const { loading, data } = useQuery(QUERY_USER_PUBLIC, {
        variables: { username: username, isPublic: true }
    });
    return (
        <Stack align={'center'} marginTop={10}>
            {loading ? (<SpinnerFullPage />) : ('')}
            {data && data.recipes.length > 0 ? (
                <Stack spacing={10} align={'center'}>
                    <SimpleGrid bgColor={'blackAlpha.600'} backdropFilter={'auto'} backdropBlur={'0.1em'} padding={2} borderRadius={5} boxShadow={'dark-lg'} w={'75%'} columns={2}>
                        <Avatar showBorder={true} size={'xl'} src={data.user.avatar} />
                        <Heading alignSelf='center'>{username}</Heading>
                    </SimpleGrid>
                    <RecipeList recipes={data.recipes} />
                </Stack>
            ) : (
                <Text>{username} has no public recipes listed.</Text>
            )}
        </Stack>
    )
};