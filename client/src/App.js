import './App.css';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Header } from './components';
import { Login, Landing, Signup, SignupAvatar, Dashboard, AddRecipe, RecipeDetails, User } from './pages';
import Auth from './utils/auth';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

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
  initialColorMode: 'light',
  useSystemColorMode: true
}

const theme = extendTheme({ config })

function App() {
  return (
    <ApolloProvider client={client}>
        <StoreProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Header />
            <Routes>
              {Auth.loggedIn()?(
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/avatar' element={<SignupAvatar />} />
                  <Route path='/addRecipe' element={<AddRecipe />} />
                </>
              ):(
                <>
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                </>
              )}
              <Route path='/recipe/:id' element={<RecipeDetails />} />
              <Route path='/user/:id' element={<User />} />
              <Route path='*' element={<Landing />} />
            </Routes>
          </ChakraProvider>
        </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
