import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  picto: Scalars['String'];
  places: Array<Place>;
};

export type CategoryInput = {
  name: Scalars['String'];
  picto: Scalars['String'];
};

export type City = {
  __typename?: 'City';
  description: Scalars['String'];
  id: Scalars['Float'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  places: Array<Place>;
};

export type CityInput = {
  description: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type CityUpdate = {
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createCity: City;
  createPlace: Place;
  updateCategory: Category;
  updateCity: City;
  updatePlace: Place;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateCityArgs = {
  data: CityInput;
};


export type MutationCreatePlaceArgs = {
  data: PlaceInput;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['Int'];
};


export type MutationUpdateCityArgs = {
  data: CityUpdate;
  id: Scalars['String'];
};


export type MutationUpdatePlaceArgs = {
  data: PlaceInput;
  id: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  adress: Scalars['String'];
  category: Category;
  categoryId: Scalars['Float'];
  city: City;
  cityId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['Float'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type PlaceInput = {
  adress: Scalars['String'];
  categoryId: Scalars['Float'];
  cityId: Scalars['Float'];
  description: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Search: SearchResult;
  getCategories: Array<Category>;
  getCities: Array<City>;
  getOneCitybyId: City;
  getOneCitybyName: City;
  getOnePlacebyId: Place;
  getOnePlacebyName: Place;
  getPlaces: Array<Place>;
};


export type QuerySearchArgs = {
  searchInput: Scalars['String'];
};


export type QueryGetOneCitybyIdArgs = {
  id: Scalars['String'];
};


export type QueryGetOneCitybyNameArgs = {
  name: Scalars['String'];
};


export type QueryGetOnePlacebyIdArgs = {
  id: Scalars['String'];
};


export type QueryGetOnePlacebyNameArgs = {
  name: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  cities: Array<City>;
  placesByAddress: Array<Place>;
  placesByName: Array<Place>;
};

export type GetOneCitybyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOneCitybyNameQuery = { __typename?: 'Query', getOneCitybyName: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string, places: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', name: string, id: number, picto: string } }> } };

export type GetOnePlacebyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOnePlacebyNameQuery = { __typename?: 'Query', getOnePlacebyName: { __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, categoryId: number, category: { __typename?: 'Category', name: string, picto: string, id: number } } };

export type GetSearchResultQueryVariables = Exact<{
  searchInput: Scalars['String'];
}>;


export type GetSearchResultQuery = { __typename?: 'Query', Search: { __typename?: 'SearchResult', cities: Array<{ __typename?: 'City', name: string }>, placesByName: Array<{ __typename?: 'Place', name: string, city: { __typename?: 'City', name: string } }>, placesByAddress: Array<{ __typename?: 'Place', name: string, adress: string, city: { __typename?: 'City', name: string } }> } };


export const GetOneCitybyNameDocument = gql`
    query GetOneCitybyName($name: String!) {
  getOneCitybyName(name: $name) {
    id
    name
    picture
    description
    latitude
    longitude
    places {
      id
      name
      latitude
      longitude
      adress
      website
      picture
      description
      category {
        name
        id
        picto
      }
    }
  }
}
    `;

/**
 * __useGetOneCitybyNameQuery__
 *
 * To run a query within a React component, call `useGetOneCitybyNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCitybyNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCitybyNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetOneCitybyNameQuery(baseOptions: Apollo.QueryHookOptions<GetOneCitybyNameQuery, GetOneCitybyNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCitybyNameQuery, GetOneCitybyNameQueryVariables>(GetOneCitybyNameDocument, options);
      }
export function useGetOneCitybyNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCitybyNameQuery, GetOneCitybyNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCitybyNameQuery, GetOneCitybyNameQueryVariables>(GetOneCitybyNameDocument, options);
        }
export type GetOneCitybyNameQueryHookResult = ReturnType<typeof useGetOneCitybyNameQuery>;
export type GetOneCitybyNameLazyQueryHookResult = ReturnType<typeof useGetOneCitybyNameLazyQuery>;
export type GetOneCitybyNameQueryResult = Apollo.QueryResult<GetOneCitybyNameQuery, GetOneCitybyNameQueryVariables>;
export const GetOnePlacebyNameDocument = gql`
    query GetOnePlacebyName($name: String!) {
  getOnePlacebyName(name: $name) {
    id
    name
    latitude
    longitude
    adress
    website
    picture
    description
    categoryId
    category {
      name
      picto
      id
    }
  }
}
    `;

/**
 * __useGetOnePlacebyNameQuery__
 *
 * To run a query within a React component, call `useGetOnePlacebyNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnePlacebyNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnePlacebyNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetOnePlacebyNameQuery(baseOptions: Apollo.QueryHookOptions<GetOnePlacebyNameQuery, GetOnePlacebyNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnePlacebyNameQuery, GetOnePlacebyNameQueryVariables>(GetOnePlacebyNameDocument, options);
      }
export function useGetOnePlacebyNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnePlacebyNameQuery, GetOnePlacebyNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnePlacebyNameQuery, GetOnePlacebyNameQueryVariables>(GetOnePlacebyNameDocument, options);
        }
export type GetOnePlacebyNameQueryHookResult = ReturnType<typeof useGetOnePlacebyNameQuery>;
export type GetOnePlacebyNameLazyQueryHookResult = ReturnType<typeof useGetOnePlacebyNameLazyQuery>;
export type GetOnePlacebyNameQueryResult = Apollo.QueryResult<GetOnePlacebyNameQuery, GetOnePlacebyNameQueryVariables>;
export const GetSearchResultDocument = gql`
    query GetSearchResult($searchInput: String!) {
  Search(searchInput: $searchInput) {
    cities {
      name
    }
    placesByName {
      city {
        name
      }
      name
    }
    placesByAddress {
      city {
        name
      }
      name
      adress
    }
  }
}
    `;

/**
 * __useGetSearchResultQuery__
 *
 * To run a query within a React component, call `useGetSearchResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchResultQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useGetSearchResultQuery(baseOptions: Apollo.QueryHookOptions<GetSearchResultQuery, GetSearchResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchResultQuery, GetSearchResultQueryVariables>(GetSearchResultDocument, options);
      }
export function useGetSearchResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchResultQuery, GetSearchResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchResultQuery, GetSearchResultQueryVariables>(GetSearchResultDocument, options);
        }
export type GetSearchResultQueryHookResult = ReturnType<typeof useGetSearchResultQuery>;
export type GetSearchResultLazyQueryHookResult = ReturnType<typeof useGetSearchResultLazyQuery>;
export type GetSearchResultQueryResult = Apollo.QueryResult<GetSearchResultQuery, GetSearchResultQueryVariables>;