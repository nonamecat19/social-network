import { gql } from '@apollo/client'


export const GET_PRODUCTS = gql`
    query Products {
        products {
            name
            description
            photo_src
            price
            createdAt
            updatedAt
            id
            count
        }
    }
`;