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
  data: CityInput;
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
  getCategories: Array<Category>;
  getCities: Array<City>;
  getOneCitybyId: City;
  getOnePlacebyId: Place;
  getPlaces: Array<Place>;
};


export type QueryGetOneCitybyIdArgs = {
  id: Scalars['String'];
};


export type QueryGetOnePlacebyIdArgs = {
  id: Scalars['String'];
};

export type GetOneCitybyIdQueryVariables = Exact<{
  getOneCitybyId: Scalars['String'];
}>;


export type GetOneCitybyIdQuery = { __typename?: 'Query', getOneCitybyId: { __typename?: 'City', id: number, name: string, picture: string, description: string, latitude: string, longitude: string, places: Array<{ __typename?: 'Place', id: number, name: string, latitude: string, longitude: string, adress: string, website?: string | null, picture: string, description: string, category: { __typename?: 'Category', name: string, id: number, picto: string } }> } };


export const GetOneCitybyIdDocument = gql`
    query GetOneCitybyId($getOneCitybyId: String!) {
  getOneCitybyId(id: $getOneCitybyId) {
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
 * __useGetOneCitybyIdQuery__
 *
 * To run a query within a React component, call `useGetOneCitybyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCitybyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCitybyIdQuery({
 *   variables: {
 *      getOneCitybyId: // value for 'getOneCitybyId'
 *   },
 * });
 */
export function useGetOneCitybyIdQuery(baseOptions: Apollo.QueryHookOptions<GetOneCitybyIdQuery, GetOneCitybyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCitybyIdQuery, GetOneCitybyIdQueryVariables>(GetOneCitybyIdDocument, options);
      }
export function useGetOneCitybyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCitybyIdQuery, GetOneCitybyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCitybyIdQuery, GetOneCitybyIdQueryVariables>(GetOneCitybyIdDocument, options);
        }
export type GetOneCitybyIdQueryHookResult = ReturnType<typeof useGetOneCitybyIdQuery>;
export type GetOneCitybyIdLazyQueryHookResult = ReturnType<typeof useGetOneCitybyIdLazyQuery>;
export type GetOneCitybyIdQueryResult = Apollo.QueryResult<GetOneCitybyIdQuery, GetOneCitybyIdQueryVariables>;