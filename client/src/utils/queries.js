import { gql } from '@apollo/client';

export const QUERY_SONGS = gql`
  query getSongs($category: ID) {
    songs(category: $category) {
      _id
      name
      price
      category {
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_SONGS = gql`
  {
    songs {
      _id
      name
      price
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      displayName
      orders {
        _id
        purchaseDate
        songs {
          _id
          name
          price
          category {
            name
          }
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($songs: [ID]!) {
    checkout(songs: $songs) {
      session
    }
  }
`;
