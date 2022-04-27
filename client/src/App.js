import './App.css';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import { ChakraProvider, extendTheme, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { Header } from './components';
import { Login, Landing, Signup, SignupAvatar, Dashboard, AddRecipe, RecipeDetails, User, EditRecipe, AddCook } from './pages';
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
  colors: {
    
  }
}

const theme = extendTheme({ config })

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
            <Header />
            <Routes>
              {Auth.loggedIn()?(
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/avatar' element={<SignupAvatar />} />
                  <Route path='/addRecipe' element={<AddRecipe />} />
                  <Route path='/recipe/:id/edit' element={<EditRecipe />} />
                  <Route path='/recipe/:id/addcook' element={<AddCook />} />
                </>
              ):(
                <>
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                </>
              )}
              <Route path='/recipe/:id' element={<RecipeDetails />} />
              <Route path='/user/:username' element={<User />} />
              <Route path='*' element={<Landing />} />
            </Routes>
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
