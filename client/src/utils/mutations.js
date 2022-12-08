import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($songs: [ID]!) {
    addOrder(songs: $songs) {
      purchaseDate
      songs {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $displayName: String!
    $email: String!
    $password: String!
    $artist: Boolean!
  ) {
    addUser(
      displayName: $displayName
      email: $email
      password: $password
      artist: $boolean
    ) {
      token
      user {
        _id
      }
    }
  }
`;
