import './App.css';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import { ChakraProvider, extendTheme, cookieStorageManager, localStorageManager, Box, Grid, GridItem } from '@chakra-ui/react';
import { Header, Nav } from './components';
import { Login, Landing, Signup, SignupAvatar, Dashboard, AddRecipe, RecipeDetails, User, EditRecipe, AddCook, } from './pages';
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

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const colors = {
  primary: {
    "50": "#F2F2F2",
    "100": "#DBDBDB",
    "200": "#C4C4C4",
    "300": "#ADADAD",
    "400": "#969696",
    "500": "#808080",
    "600": "#666666",
    "700": "#4D4D4D",
    "800": "#333333",
    "900": "#1A1A1A"
  },
  brand: {
    "50": "#EFF5EF",
    "100": "#D3E3D3",
    "200": "#B7D2B7",
    "300": "#9BC09B",
    "400": "#7FAE7F",
    "500": "#639C63",
    "600": "#4F7D4F",
    "700": "#3B5E3B",
    "800": "#283E28",
    "900": "#141F14"
  },
  action: {
    "50": "#F0F2F4",
    "100": "#D5D9E2",
    "200": "#BAC1CF",
    "300": "#9FA9BC",
    "400": "#8491A9",
    "500": "#697896",
    "600": "#546078",
    "700": "#3F485A",
    "800": "#2A303C",
    "900": "#15181E"
  }
}

const theme = extendTheme({ config, colors })

function App({ cookies }) {
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
            templateAreas={`"header"
                          "content"
                          "nav"`}
            templateRows={['13vh 80vh 7vh']}>
            <GridItem area={'header'}>
              <Header />
            </GridItem>
            <GridItem area={'content'}>
              <Routes>
                {Auth.loggedIn() ? (
                  <>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/avatar' element={<SignupAvatar />} />
                    <Route path='/addRecipe' element={<AddRecipe />} />
                    <Route path='/recipe/:id/edit' element={<EditRecipe />} />
                    <Route path='/recipe/:id/addcook' element={<AddCook />} />
                  </>
                ) : (
                  <>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                  </>
                )}
                <Route path='/recipe/:id' element={<RecipeDetails />} />
                <Route path='/user/:username' element={<User />} />
                <Route path='*' element={<Landing />} />
              </Routes>
            </GridItem>
            {/* nav */}
            <GridItem area={'nav'}><Nav /></GridItem>
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
