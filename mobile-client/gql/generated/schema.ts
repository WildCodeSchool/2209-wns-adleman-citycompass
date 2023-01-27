import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Category";
  id: Scalars["Float"];
  name: Scalars["String"];
  picto: Scalars["String"];
};

export type CategoryInput = {
  name: Scalars["String"];
  picto: Scalars["String"];
};

export type City = {
  __typename?: "City";
  description: Scalars["String"];
  id: Scalars["Float"];
  latitude: Scalars["String"];
  longitude: Scalars["String"];
  name: Scalars["String"];
  picture: Scalars["String"];
};

export type CityInput = {
  description: Scalars["String"];
  latitude: Scalars["String"];
  longitude: Scalars["String"];
  name: Scalars["String"];
  picture: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  id: Scalars["Int"];
};

export type MutationUpdateCityArgs = {
  data: CityInput;
  id: Scalars["String"];
};

export type MutationUpdatePlaceArgs = {
  data: PlaceInput;
  id: Scalars["String"];
};

export type Place = {
  __typename?: "Place";
  adress: Scalars["String"];
  categoryId: Scalars["Float"];
  cityId: Scalars["Float"];
  description: Scalars["String"];
  id: Scalars["Float"];
  latitude: Scalars["String"];
  longitude: Scalars["String"];
  name: Scalars["String"];
  picture: Scalars["String"];
  website?: Maybe<Scalars["String"]>;
};

export type PlaceInput = {
  adress: Scalars["String"];
  categoryId: Scalars["Float"];
  cityId: Scalars["Float"];
  description: Scalars["String"];
  latitude: Scalars["String"];
  longitude: Scalars["String"];
  name: Scalars["String"];
  picture: Scalars["String"];
  website?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getCategories: Array<Category>;
  getCities: Array<City>;
  getOneCitybyId: City;
  getOnePlacebyId: Place;
  getPlaces: Array<Place>;
};

export type QueryGetOneCitybyIdArgs = {
  id: Scalars["String"];
};

export type QueryGetOnePlacebyIdArgs = {
  id: Scalars["String"];
};

export type GetPlacesQueryVariables = Exact<{ [key: string]: never }>;
export type GetOnePlacebyIdQueryVariables = Exact<{
  getOnePlacebyIdId: Scalars["String"];
}>;

export type GetOnePlacebyIdQuery = {
  __typename?: "Query";
  getOnePlacebyId: {
    __typename?: "Place";
    id: number;
    name: string;
    adress: string;
    website?: string | null;
    picture: string;
    description: string;
  };
};

export type GetPlacesQuery = {
  __typename?: "Query";
  getPlaces: Array<{
    __typename?: "Place";
    name: string;
    id: number;
    cityId: number;
    picture: string;
  }>;
};

export const GetPlacesDocument = gql`
  query GetPlaces {
    getPlaces {
      name
      id
      cityId
      picture
    }
  }
`;
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
export function useGetPlacesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPlacesQuery, GetPlacesQueryVariables>(
    GetPlacesDocument,
    options
  );
}
export function useGetPlacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPlacesQuery,
    GetPlacesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPlacesQuery, GetPlacesQueryVariables>(
    GetPlacesDocument,
    options
  );
}
export type GetPlacesQueryHookResult = ReturnType<typeof useGetPlacesQuery>;
export type GetPlacesLazyQueryHookResult = ReturnType<
  typeof useGetPlacesLazyQuery
>;
export type GetPlacesQueryResult = Apollo.QueryResult<
  GetPlacesQuery,
  GetPlacesQueryVariables
>;
export function useGetOnePlacebyIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOnePlacebyIdQuery,
    GetOnePlacebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOnePlacebyIdQuery, GetOnePlacebyIdQueryVariables>(
    GetOnePlacebyIdDocument,
    options
  );
}
export function useGetOnePlacebyIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOnePlacebyIdQuery,
    GetOnePlacebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOnePlacebyIdQuery,
    GetOnePlacebyIdQueryVariables
  >(GetOnePlacebyIdDocument, options);
}
export type GetOnePlacebyIdQueryHookResult = ReturnType<
  typeof useGetOnePlacebyIdQuery
>;
export type GetOnePlacebyIdLazyQueryHookResult = ReturnType<
  typeof useGetOnePlacebyIdLazyQuery
>;
export type GetOnePlacebyIdQueryResult = Apollo.QueryResult<
  GetOnePlacebyIdQuery,
  GetOnePlacebyIdQueryVariables
>;
