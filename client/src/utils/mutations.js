import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                avatar
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        
    )
`