import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_RECIPEGROUP } from '../../utils/queries'
import { Box, Stack, Image, Text, Center, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react"
import placeholder from '../../assets/img/undercon.gif'

// dummy data for dates and recipeId
const week = [
    {
        date: new Date(2022, 8, 8),
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: new Date(2022, 8, 9),
        recipeId: '62b3c7667b6fc4c7618b00f7',
    },
    {
        date: new Date(2022, 8, 10),
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: new Date(2022, 8, 11),
        recipeId: '62b3c7667b6fc4c7618b00f7'
    },
    {
        date: new Date(2022, 8, 12),
        recipeId: '62718a30315022639bab0d4f'
    },
    {
        date: new Date(2022, 8, 12),
        recipeId: '62b3c7667b6fc4c7618b00f7'
    },
    {
        date: new Date(2022, 8, 13),
        recipeId: '62718a30315022639bab0d4f'
    },
]

export const MealPlan = () => {
    const [mealList, setMealList] = useState([])
    const { loading, data } = useQuery(QUERY_RECIPEGROUP, {
        variables: {array: week.map(ele => {
            return ele.recipeId
        })}
    })
    useEffect(() => {
        if (loading){
            return
        }
        const newMealList = data.recipegroup.map((recipe, i) => {
            return {date: week[i].date, ...recipe}
        })
        setMealList({...mealList, newMealList})
    },[mealList, data, loading])
    return (
        <Center>
            <Box w={['80vw', null, '40vw']} minW={'fit-content'} borderRadius={'lg'} bg='blackAlpha.600'>
                <Tabs>
                    <TabList>
                        <Tab>Monday</Tab>
                        <Tab>Tuesday</Tab>
                        <Tab>Wednesday</Tab>
                        <Tab>Thursday</Tab>
                        <Tab>Friday</Tab>
                        <Tab>Saturday</Tab>
                        <Tab>Sunday</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>First panel</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
    )
}