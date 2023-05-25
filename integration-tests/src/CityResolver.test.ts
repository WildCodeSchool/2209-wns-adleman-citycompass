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
      id
      name
      picture
      description
      latitude
      longitude
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
      expect(res.data.getCities[0]).toHaveProperty("id");
      expect(res.data.getCities[0]).toHaveProperty("name");
    });
  });
  describe("create city", () => {
    it("should return an error message when not logged in", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          fetchPolicy: "no-cache",
          variables: {
            data: {
              name: "Jack",
              picture: "https://picsum.photos/",
              description: "la description un peu longue",
              latitude: "52.12",
              longitude: "12.52",
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );
    });
  });
});
