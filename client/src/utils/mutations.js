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
            src
            uploadedBy
            category
        }
    }
    `

export const ADD_RECIPE = gql`
mutation AddRecipe($recipeName: String!, $shortDescription: String!, $steps: [stepInput]!, $ingredients: [ingredientInput]!, $isPublic: Boolean!, $image: String, $username: String) {
  addRecipe(recipeName: $recipeName, shortDescription: $shortDescription, steps: $steps, ingredients: $ingredients, isPublic: $isPublic, image: $image, username: $username) {
    _id
  }
}
`

export const UPDATE_USER = gql`
    mutation UpdateUser($username: String, $email: String, $password: String, $avatar: String) {
        updateUser(username: $username, email: $email, password: $password, avatar: $avatar) {
            token
            user {
                _id
                username
                email
                avatar
            }
        }
    }
`

export const SIGN_S3 = gql`
mutation SignS3($name: String!, $type: String!, $uploadedBy: String!, $category: String!) {
    signS3(name: $name, type: $type, category: $category, uploadedBy: $uploadedBy) {
        signedRequest
        url
        fileName
    }
}
`