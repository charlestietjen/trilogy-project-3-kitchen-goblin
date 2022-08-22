import './App.css';
import { useState, useEffect } from 'react'
import smartlook from 'smartlook-client';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import { ChakraProvider, extendTheme, cookieStorageManager, localStorageManager, Box, Grid, GridItem } from '@chakra-ui/react';
import { Header, Nav, ColorModeSwitcher } from './components';
import { Login, Landing, Signup, SignupAvatar, Dashboard, AddRecipe, RecipeDetails, User, EditRecipe, AddCook, Account, MealPlan } from './pages';
import { config, colors } from './utils/theme'
import bgImage from './assets/img/background.webp'
import Auth from './utils/auth';


const httpLink = createUploadLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = extendTheme({ config, colors })

function App({ cookies }) {
  const [wHeight, setWHeight] = useState(window.innerHeight)

  smartlook.init('4d6611d7bf45c1389c0a8e0ad9fa8baf9f3645dc')
  useEffect(() => {
    function handleResize() {
      setWHeight(window.innerHeight) 
}

    window.addEventListener('resize', handleResize)
  })
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <ChakraProvider resetCSS theme={theme}
          colorModeManager={
            typeof cookies === 'string'
              ? cookieStorageManager(cookies)
              : localStorageManager
          }>
          <Grid
          h={wHeight}
            templateAreas={`"colormode header"
                          "content content"
                          "nav nav"`}
            templateRows={['13% 76% 11%',null,'15% 1fr 11%']}
            templateColumns={['10% 90%',null,'20% 80%']}
            bgImg={bgImage}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}>
            <GridItem alignSelf={'center'} justifySelf='left' area={'colormode'}>
              <ColorModeSwitcher />
            </GridItem>
            <GridItem justifySelf={['center', null, 'left']} w={'100%'} area={'header'}>
              <Header />
            </GridItem>
            <GridItem overflowY='auto' justifySelf='center' area={'content'} w={'100%'}>
              <Routes>
                {Auth.loggedIn() ? (
                  <>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/avatar' element={<SignupAvatar />} />
                    <Route path='/addRecipe' element={<AddRecipe />} />
                    <Route path='/recipe/:id/edit' element={<EditRecipe />} />
                    <Route path='/recipe/:id/addcook' element={<AddCook />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/mealplan' element={<MealPlan />} />
                  </>
                ) : (
                  <>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/addRecipe' element={<Login />} />
                    <Route path='/dashboard' element={<Login />} />
                    <Route path='/mealplan' element={<Login />} />
                  </>
                )}
                <Route path='/recipe/:id' element={<RecipeDetails />} />
                <Route path='/user/:username' element={<User />} />
                <Route path='*' element={<Landing />} />
              </Routes>
            </GridItem>
            {/* nav */}
            {/* {Auth.loggedIn() ? (<GridItem area={'nav'}><Nav /></GridItem>):('')} */}
            <GridItem minH={'fit-content'} area={'nav'}><Nav /></GridItem>
          </Grid>
        </ChakraProvider>
      </StoreProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = ({ req }) => {
  return {
    cookies: req.headers.cookie ?? '',
  }
}

export default App;
