import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
query getRecipes($username: String, $isPublic: Boolean){
    recipes(username: $username, isPublic: $isPublic) {
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
      username
    }
    user {
      avatar
      _id
    }
    cooks {
      image
      ingredients {
        ingredientName
        quantity
      }
      steps {
        text
        image
      }
      notes
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

export const QUERY_USER_PUBLIC = gql`
query User($username: String!, $isPublic: Boolean) {
  user(username: $username) {
    avatar
  }
  recipes(username: $username, isPublic: $isPublic) {
    _id
    recipeName
    shortDescription
    image
  }
}
`

export const QUERY_RECIPEGROUP = gql`
query Recipegroup($array: [ID]!) {
  recipegroup(array: $array) {
    _id
    recipeName
    image
  }
}
`