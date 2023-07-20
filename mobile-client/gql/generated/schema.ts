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

export type CategoryUpdate = {
  name?: InputMaybe<Scalars['String']>;
  picto?: InputMaybe<Scalars['String']>;
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
  createUser: User;
  login: Scalars['String'];
  logout: Scalars['String'];
  updateCategory: Category;
  updateCity: City;
  updatePlace: Place;
  updateUser: User;
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


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationLoginArgs = {
  data: UserLogin;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdate;
  id: Scalars['Int'];
};


export type MutationUpdateCityArgs = {
  data: CityUpdate;
  id: Scalars['Float'];
};


export type MutationUpdatePlaceArgs = {
  data: PlaceInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdate;
  id: Scalars['Int'];
};

export type Place = {
  __typename?: 'Place';
  adress: Scalars['String'];
  category: Category;
  city: City;
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
  getOneUserbyMail: User;
  getPlaces: Array<Place>;
  getUsers: Array<User>;
  profile: User;
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


export type QueryGetOneUserbyMailArgs = {
  email: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  cities: Array<City>;
  placesByAddress: Array<Place>;
  placesByName: Array<Place>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Float'];
  lastname: Scalars['String'];
  managedCities?: Maybe<Array<City>>;
  password: Scalars['String'];
  picture: Scalars['String'];
  role: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  picture: Scalars['String'];
  role?: Scalars['String'];
};

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', picture: string, name: string, id: number, description: string, longitude: string, latitude: string }> };

export type GetOneCitybyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOneCitybyNameQuery = { __typename?: 'Query', getOneCitybyName: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string, places: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', name: string, id: number, picto: string } }> } };

export type GetOnePlacebyIdQueryVariables = Exact<{
  getOnePlacebyIdId: Scalars['String'];
}>;


export type GetOnePlacebyIdQuery = { __typename?: 'Query', getOnePlacebyId: { __typename?: 'Place', id: number, name: string, adress: string, website?: string | null, picture: string, description: string } };

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', name: string, id: number, picture: string, city: { __typename?: 'City', id: number } }> };


export const GetCitiesDocument = gql`
    query GetCities {
  getCities {
    picture
    name
    id
    description
    longitude
    latitude
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
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
export const GetOnePlacebyIdDocument = gql`
    query GetOnePlacebyId($getOnePlacebyIdId: String!) {
  getOnePlacebyId(id: $getOnePlacebyIdId) {
    id
    name
    adress
    website
    picture
    description
  }
}
    `;

/**
 * __useGetOnePlacebyIdQuery__
 *
 * To run a query within a React component, call `useGetOnePlacebyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnePlacebyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnePlacebyIdQuery({
 *   variables: {
 *      getOnePlacebyIdId: // value for 'getOnePlacebyIdId'
 *   },
 * });
 */
export function useGetOnePlacebyIdQuery(baseOptions: Apollo.QueryHookOptions<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>(GetOnePlacebyIdDocument, options);
      }
export function useGetOnePlacebyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>(GetOnePlacebyIdDocument, options);
        }
export type GetOnePlacebyIdQueryHookResult = ReturnType<typeof useGetOnePlacebyIdQuery>;
export type GetOnePlacebyIdLazyQueryHookResult = ReturnType<typeof useGetOnePlacebyIdLazyQuery>;
export type GetOnePlacebyIdQueryResult = Apollo.QueryResult<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>;
export const GetPlacesDocument = gql`
    query GetPlaces {
  getPlaces {
    name
    id
    city {
      id
    }
    picture
  }
}
    `;

/**
 * __useGetPlacesQuery__
 *
 * To run a query within a React component, call `useGetPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
      }
export function useGetPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
        }
export type GetPlacesQueryHookResult = ReturnType<typeof useGetPlacesQuery>;
export type GetPlacesLazyQueryHookResult = ReturnType<typeof useGetPlacesLazyQuery>;
export type GetPlacesQueryResult = Apollo.QueryResult<GetPlacesQuery, GetPlacesQueryVariables>;