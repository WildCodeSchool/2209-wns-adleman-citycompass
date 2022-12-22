import { gql } from "@apollo/client/core";
import City from "../../server/src/entity/City";
import client from "./apolloClient";
import db from "../../server/src/db";

/**
 * Mutations for testing
 */

const createCityMutation = gql`
  mutation CreateCity($data: CityInput!) {
    createCity(data: $data) {
      name
      description
      picture
      longitude
      latitute
    }
  }
`;

const getCityQuery = gql`
  query GetCities {
    getCities {
      name
      id
      picture
      description
      latitude
      longitude
    }
  }
`;

/**
 * Tests
 */

describe("City resolver", () => {
  describe("create city", () => {
    it("should create city with valid parameters", async () => {
      const res = await client.mutate({
        mutation: createCityMutation,
        variables: {
          data: {
            name: "Lyon",
            description: "La description de Lyon",
            picture: "https://picsum.photos/200/300",
            longitude: "4.835659",
            latitude: "45.764043",
          },
        },
      });

      expect(res.data?.createCity).toHaveProperty("id");
      // expect(res.data?.createCity).toHaveProperty("name", "Lyon");
      // expect(res.data?.createCity).toHaveProperty(
      //   "description",
      //   "La description de Lyon"
      // );
      // expect(res.data?.createCity).toHaveProperty("latitude", "45.764043");
      // expect(res.data?.createCity).toHaveProperty("longitude", "4.835659");
    });
  });

  describe("read cities", () => {
    it("should return an array of cities", async () => {
      await db.getRepository(City).insert([
        {
          name: "Lyon",
          description: "La description de Lyon",
          picture: "https://picsum.photos/200/300",
          latitude: "45.764043",
          longitude: "4.835659",
        },
        {
          name: "Chartres",
          description: "La description de Chartres",
          picture: "https://picsum.photos/200/300",
          latitude: "48.443854",
          longitude: "1.489012",
        },
      ]);

      const res = await client.query({
        query: getCityQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.getCities.length).toBe(2);
    });
  });
});
