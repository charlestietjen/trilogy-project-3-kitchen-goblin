import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
query getRecipes($username: String){
    recipes(username: $username) {
        _id
        recipeName
        shortDescription
        steps {
            text
            image
        }
        image
    }
}`