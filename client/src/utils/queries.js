import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
query getRecipes($username: String){
    recipes(username: $username) {
        _id
        recipeName
        shortDescription
        ingredients {
            ingredientName
            quantity
        }
        steps {
            text
            image
        }
        image
    }
}`

export const ALL_RECIPES = gql`
query {
  allrecipes {
    _id
    recipeName
    shortDescription
    image
    username
  }
}
`

export const QUERY_RECIPE = gql`
query Recipe($id: ID!) {
  recipe(_id: $id) {
    recipe {
      recipeName
      shortDescription
      ingredients {
        ingredientName
        quantity
      }
      steps {
        text
        image
      }
      image
      username
    }
    user {
      avatar
    }
  }
}
`

export const QUERY_USER_AVATAR = gql`
query User($username: String!) {
  user(username: $username) {
    avatar
  }
}
`