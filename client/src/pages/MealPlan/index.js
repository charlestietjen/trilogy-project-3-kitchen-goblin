import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPEGROUP } from '../../utils/queries';
import { Box, Stack, Image, Text, Center, Tabs, Tab, TabList, TabPanels, TabPanel, Heading } from "@chakra-ui/react";
import placeholder from '../../assets/img/undercon.gif';
import { SpinnerFullPage } from '../../components/SpinnerFullPage';

// dummy data for dates and recipeId
const week = [
    {
        date: '2022, 8, 8',
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: '2022, 8, 9',
        recipeId: '62b3c7667b6fc4c7618b00f7',
    },
    {
        date: '2022, 8, 10',
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: '2022, 8, 11',
        recipeId: '62b3c7667b6fc4c7618b00f7'
    },
    {
        date: '2022, 8, 12',
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: '2022, 8, 13',
        recipeId: '62b3c7667b6fc4c7618b00f7'
    },
    {
        date: '2022, 8, 14',
        recipeId: '62718a30315022639bab0d4f'
    },
];

export const MealPlan = () => {
    const [mealList, setMealList] = useState([]);
    const { loading, data } = useQuery(QUERY_RECIPEGROUP, {
        variables: {
            array: week.map(ele => {
                return ele.recipeId
            })
        }
    });
    useEffect(() => {
        if (loading) {
            return
        };
        const newMealList = data.recipegroup.map((recipe, i) => {
            return { date: week[i].date, ...recipe }
        });
        setMealList([...newMealList]);
    }, [data, loading]);
    return (
        <Center>
            <Box w={['80vw', null, '40vw']} minW={'fit-content'} borderRadius={'lg'} bg='blackAlpha.600'>
                {/* {loading ? (<SpinnerFullPage />) : (
                    <Tabs>
                        <TabList>
                            {mealList.length > 0 ? (mealList.map(ele => (
                                <Tab key={ele.date}>{ele.date}</Tab>
                            ))) : ('')}
                        </TabList>
                        <TabPanels>
                            {mealList.length > 0 ? (mealList.map(ele => (
                                <TabPanel key={ele.date}>
                                    <Center>
                                        <Stack>
                                            <Heading fontSize={'medium'}>{ele.recipeName}</Heading>
                                            <Image boxSize={'xs'} src={ele.image} />
                                        </Stack>
                                    </Center>
                                </TabPanel>
                            ))) : ('')}
                        </TabPanels>
                    </Tabs>
                )} */}
                <Image src={placeholder} />
            </Box>
        </Center>
    )
}