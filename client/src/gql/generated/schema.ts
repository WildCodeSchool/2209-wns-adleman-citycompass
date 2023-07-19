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
  managers?: Maybe<Array<User>>;
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
  updateManagedCities: User;
  updatePlace: Place;
  updateUser: User;
  updateUserRole: User;
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


export type MutationUpdateManagedCitiesArgs = {
  data: UserManagedCityUpdate;
  userId: Scalars['Int'];
};


export type MutationUpdatePlaceArgs = {
  data: PlaceUpdate;
  id: Scalars['Float'];
  userID: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdate;
  id: Scalars['Int'];
};


export type MutationUpdateUserRoleArgs = {
  data: UserRoleUpdate;
  id: Scalars['Int'];
};

export type Place = {
  __typename?: 'Place';
  adress: Scalars['String'];
  author: User;
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
  categoryId: Scalars['Float'];
  cityId: Scalars['Float'];
  description: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
};

export type PlaceUpdate = {
  adress?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['Float'];
  cityId: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
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
  getUserManagedCities: User;
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


export type QueryGetUserManagedCitiesArgs = {
  userId: Scalars['Float'];
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
  managedPlaces?: Maybe<Array<Place>>;
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

export type UserManagedCityUpdate = {
  managedCitiesId: Array<Scalars['Float']>;
};

export type UserRoleUpdate = {
  role: Scalars['String'];
};

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type CreateCategoryMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, picto: string } };

export type CreateCityMutationVariables = Exact<{
  data: CityInput;
}>;


export type CreateCityMutation = { __typename?: 'Mutation', createCity: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string } };

export type CreatePlaceMutationVariables = Exact<{
  data: PlaceInput;
}>;


export type CreatePlaceMutation = { __typename?: 'Mutation', createPlace: { __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, name: string, picto: string }> };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', picture: string, name: string, id: number, description: string, longitude: string, latitude: string }> };

export type GetCitiesWithPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesWithPlacesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', name: string, places: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', id: number } }> }> };

export type GetOneCitybyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOneCitybyNameQuery = { __typename?: 'Query', getOneCitybyName: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string, places: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', name: string, id: number, picto: string } }> } };

export type GetOnePlacebyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOnePlacebyNameQuery = { __typename?: 'Query', getOnePlacebyName: { __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', name: string, picto: string, id: number } } };

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', id: number, name: string }, city: { __typename?: 'City', id: number, name: string } }> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, firstname: string, lastname: string, email: string, picture: string, role: string, managedCities?: Array<{ __typename?: 'City', id: number, name: string }> | null } };

export type GetSearchResultQueryVariables = Exact<{
  searchInput: Scalars['String'];
}>;


export type GetSearchResultQuery = { __typename?: 'Query', Search: { __typename?: 'SearchResult', cities: Array<{ __typename?: 'City', name: string }>, placesByName: Array<{ __typename?: 'Place', name: string, city: { __typename?: 'City', name: string } }>, placesByAddress: Array<{ __typename?: 'Place', name: string, adress: string, city: { __typename?: 'City', name: string } }> } };

export type GetUserManagedCitiesQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserManagedCitiesQuery = { __typename?: 'Query', getUserManagedCities: { __typename?: 'User', id: number, managedCities?: Array<{ __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string }> | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, firstname: string, lastname: string, email: string, password: string, picture: string, role: string }> };

export type LoginMutationVariables = Exact<{
  data: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type UpdateCategoryMutationVariables = Exact<{
  data: CategoryUpdate;
  updateCategoryId: Scalars['Int'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, picto: string } };

export type UpdateCityMutationVariables = Exact<{
  data: CityUpdate;
  updateCityId: Scalars['Float'];
}>;


export type UpdateCityMutation = { __typename?: 'Mutation', updateCity: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdate;
  updateUserId: Scalars['Int'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstname: string, lastname: string, email: string, password: string, picture: string } };

export type UserManagedCityUpdateMutationVariables = Exact<{
  userId: Scalars['Int'];
  data: UserManagedCityUpdate;
}>;


export type UserManagedCityUpdateMutation = { __typename?: 'Mutation', updateManagedCities: { __typename?: 'User', id: number, managedCities?: Array<{ __typename?: 'City', id: number, name: string, picture: string, latitude: string, longitude: string }> | null } };

export type UpdateUserRoleMutationVariables = Exact<{
  updateUserRoleId: Scalars['Int'];
  data: UserRoleUpdate;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: number, role: string } };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data) {
    id
    name
    picto
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateCityDocument = gql`
    mutation CreateCity($data: CityInput!) {
  createCity(data: $data) {
    id
    name
    picture
    description
    latitude
    longitude
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($data: PlaceInput!) {
  createPlace(data: $data) {
    id
    name
    latitude
    longitude
    adress
    website
    picture
    description
  }
}
    `;
export type CreatePlaceMutationFn = Apollo.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, options);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = Apollo.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = Apollo.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    picto
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
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
export const GetCitiesWithPlacesDocument = gql`
    query GetCitiesWithPlaces {
  getCities {
    name
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
        id
      }
    }
  }
}
    `;

/**
 * __useGetCitiesWithPlacesQuery__
 *
 * To run a query within a React component, call `useGetCitiesWithPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesWithPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesWithPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesWithPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesWithPlacesQuery, GetCitiesWithPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesWithPlacesQuery, GetCitiesWithPlacesQueryVariables>(GetCitiesWithPlacesDocument, options);
      }
export function useGetCitiesWithPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesWithPlacesQuery, GetCitiesWithPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesWithPlacesQuery, GetCitiesWithPlacesQueryVariables>(GetCitiesWithPlacesDocument, options);
        }
export type GetCitiesWithPlacesQueryHookResult = ReturnType<typeof useGetCitiesWithPlacesQuery>;
export type GetCitiesWithPlacesLazyQueryHookResult = ReturnType<typeof useGetCitiesWithPlacesLazyQuery>;
export type GetCitiesWithPlacesQueryResult = Apollo.QueryResult<GetCitiesWithPlacesQuery, GetCitiesWithPlacesQueryVariables>;
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
export const GetPlacesDocument = gql`
    query GetPlaces {
  getPlaces {
    id
    name
    latitude
    longitude
    adress
    website
    picture
    description
    category {
      id
      name
    }
    city {
      id
      name
    }
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
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    id
    firstname
    lastname
    email
    picture
    role
    managedCities {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
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
export const GetUserManagedCitiesDocument = gql`
    query getUserManagedCities($userId: Float!) {
  getUserManagedCities(userId: $userId) {
    id
    managedCities {
      id
      name
      picture
      description
      latitude
      longitude
    }
  }
}
    `;

/**
 * __useGetUserManagedCitiesQuery__
 *
 * To run a query within a React component, call `useGetUserManagedCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserManagedCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserManagedCitiesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserManagedCitiesQuery(baseOptions: Apollo.QueryHookOptions<GetUserManagedCitiesQuery, GetUserManagedCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserManagedCitiesQuery, GetUserManagedCitiesQueryVariables>(GetUserManagedCitiesDocument, options);
      }
export function useGetUserManagedCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserManagedCitiesQuery, GetUserManagedCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserManagedCitiesQuery, GetUserManagedCitiesQueryVariables>(GetUserManagedCitiesDocument, options);
        }
export type GetUserManagedCitiesQueryHookResult = ReturnType<typeof useGetUserManagedCitiesQuery>;
export type GetUserManagedCitiesLazyQueryHookResult = ReturnType<typeof useGetUserManagedCitiesLazyQuery>;
export type GetUserManagedCitiesQueryResult = Apollo.QueryResult<GetUserManagedCitiesQuery, GetUserManagedCitiesQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    firstname
    lastname
    email
    password
    picture
    role
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserLogin!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($data: CategoryUpdate!, $updateCategoryId: Int!) {
  updateCategory(data: $data, id: $updateCategoryId) {
    id
    name
    picto
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateCategoryId: // value for 'updateCategoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateCityDocument = gql`
    mutation updateCity($data: CityUpdate!, $updateCityId: Float!) {
  updateCity(data: $data, id: $updateCityId) {
    id
    name
    picture
    description
    latitude
    longitude
  }
}
    `;
export type UpdateCityMutationFn = Apollo.MutationFunction<UpdateCityMutation, UpdateCityMutationVariables>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateCityId: // value for 'updateCityId'
 *   },
 * });
 */
export function useUpdateCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCityMutation, UpdateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, options);
      }
export type UpdateCityMutationHookResult = ReturnType<typeof useUpdateCityMutation>;
export type UpdateCityMutationResult = Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<UpdateCityMutation, UpdateCityMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UserUpdate!, $updateUserId: Int!) {
  updateUser(data: $data, id: $updateUserId) {
    id
    firstname
    lastname
    email
    password
    picture
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateUserId: // value for 'updateUserId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserManagedCityUpdateDocument = gql`
    mutation UserManagedCityUpdate($userId: Int!, $data: UserManagedCityUpdate!) {
  updateManagedCities(userId: $userId, data: $data) {
    id
    managedCities {
      id
      name
      picture
      latitude
      longitude
    }
  }
}
    `;
export type UserManagedCityUpdateMutationFn = Apollo.MutationFunction<UserManagedCityUpdateMutation, UserManagedCityUpdateMutationVariables>;

/**
 * __useUserManagedCityUpdateMutation__
 *
 * To run a mutation, you first call `useUserManagedCityUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserManagedCityUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userManagedCityUpdateMutation, { data, loading, error }] = useUserManagedCityUpdateMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserManagedCityUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserManagedCityUpdateMutation, UserManagedCityUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserManagedCityUpdateMutation, UserManagedCityUpdateMutationVariables>(UserManagedCityUpdateDocument, options);
      }
export type UserManagedCityUpdateMutationHookResult = ReturnType<typeof useUserManagedCityUpdateMutation>;
export type UserManagedCityUpdateMutationResult = Apollo.MutationResult<UserManagedCityUpdateMutation>;
export type UserManagedCityUpdateMutationOptions = Apollo.BaseMutationOptions<UserManagedCityUpdateMutation, UserManagedCityUpdateMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation updateUserRole($updateUserRoleId: Int!, $data: UserRoleUpdate!) {
  updateUserRole(id: $updateUserRoleId, data: $data) {
    id
    role
  }
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      updateUserRoleId: // value for 'updateUserRoleId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;