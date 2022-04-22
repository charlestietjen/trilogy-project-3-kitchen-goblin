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