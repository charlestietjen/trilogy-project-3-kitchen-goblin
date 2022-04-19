import './App.css';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Header } from './components';
import { Login, Landing, Signup } from './pages';

const httpLink = createHttpLink({
  uri: '/graphql',
});

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
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<Landing />} />
            </Routes>
          </ChakraProvider>
        </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
