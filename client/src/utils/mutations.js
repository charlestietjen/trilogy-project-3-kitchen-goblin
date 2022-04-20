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
        $email: String!
        $username: String!
        $password: String!
        $avatar: String
    ) {
        addUser(
        email: $email
        username: $username
        password: $password
        avatar: $avatar
    )
        {
            token
            user {
                _id
            }
        }
    }
`

export const UPLOAD_IMAGE = gql`
    mutation imageUpload($image: Upload!, $uploadedBy: String!, $category: String!) {
        imageUpload(image: $image, uploadedBy: $uploadedBy, category: $category)
        {
            uploadedBy
        }
    }
    `