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
      description
      picture
      longitude
      latitude
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
    //a city with valid paramters should be created
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
      expect(res.data?.createCity).toHaveProperty("name", "Lyon");
      expect(res.data?.createCity).toHaveProperty(
        "description",
        "La description de Lyon"
      );
      expect(res.data?.createCity).toHaveProperty("latitude", "45.764043");
      expect(res.data?.createCity).toHaveProperty("longitude", "4.835659");
    });
    // a city should start with a capital letter
    it("should not create city with no capital letter", async () => {
      const res = await client.mutate({
        mutation: createCityMutation,
        variables: {
          data: {
            name: "paris",
            description: "La description de Paris",
            picture: "https://picsum.photos/200/300",
            longitude: "2.3522219",
            latitude: "48.856614",
          },
        },
      });

      expect(res.data?.createCity).toHaveProperty("id");
      expect(res.data?.createCity).toHaveProperty("name", "Paris");
      expect(res.data?.createCity).toHaveProperty(
        "description",
        "La description de Paris"
      );
      expect(res.data?.createCity).toHaveProperty("latitude", "48.856614");
      expect(res.data?.createCity).toHaveProperty("longitude", "2.3522219");
    });
    //a city should not start with a space
    it("a city should not start with a space", async () => {
      const res = await client.mutate({
        mutation: createCityMutation,
        variables: {
          data: {
            name: " Marseille",
            description: "La description de Marseille",
            picture: "https://picsum.photos/200/300",
            longitude: "5.400000",
            latitude: "43.300000",
          },
        },
      });

      expect(res.data?.createCity).toHaveProperty("id");
      expect(res.data?.createCity).toHaveProperty("name", "Marseille");
      expect(res.data?.createCity).toHaveProperty(
        "description",
        "La description de Marseille"
      );
      expect(res.data?.createCity).toHaveProperty("latitude", "43.300000");
      expect(res.data?.createCity).toHaveProperty("longitude", "5.400000");
    });
    // a city should not be created twice based on name

    // a city with same latitude and longitude should not be created twice
    // a city with empty name should not be created
    // a city with empty description should not be created
    // a city with empty picture should not be created
    // a city with empty longitude should not be created
    // a city with empty latitude should not be created
    // a picture should be only URLs
    // unvalid longitude should not be accepted (ex : other caracters than 0 to 9)
    // unvalid latitude should not be accepted (ex : other caracters than 0 to 9)
    // city descriptions with less than 10 letters should not be accepted
    // descriptions with SQL requests should not have consequences
    // descriptions with JS scripts should not have consequences
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
      expect(res.data.getCities[0]).toHaveProperty("id");
      expect(res.data.getCities[0]).toHaveProperty("name");
    });
  });
});
