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

    // a city with empty name should not be created
    it("a city name should not be an empty string", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "",
              description: "La description de Marseille",
              picture: "https://picsum.photos/200/300",
              longitude: "5.400000",
              latitude: "43.300000",
            },
          },
        })
      ).rejects.toThrow();
    });

    // a city with empty description should not be created
    it("a city description should not be an empty string", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Marseille",
              description: "",
              picture: "https://picsum.photos/200/300",
              longitude: "5.400000",
              latitude: "43.300000",
            },
          },
        })
      ).rejects.toThrow();
    });
    // a city with empty picture should not be created
    it("a city picture should not be an empty string", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Marseille",
              description: "La description de Marseille",
              picture: "",
              longitude: "5.400000",
              latitude: "43.300000",
            },
          },
        })
      ).rejects.toThrow();
    });
    // a city with empty longitude should not be created
    it("a city latitude should not be an empty string", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Marseille",
              description: "La description de Marseille",
              picture: "https://picsum.photos/200/300",
              longitude: "5.400000",
              latitude: "",
            },
          },
        })
      ).rejects.toThrow();
    });
    // a city with empty latitude should not be created
    it("a city longitude should not be an empty string", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Marseille",
              description: "La description de Marseille",
              picture: "https://picsum.photos/200/300",
              longitude: "",
              latitude: "43.300000",
            },
          },
        })
      ).rejects.toThrow();
    });
    // a city should not be created twice based on name
    it("a city should not be created twice based on name ", async () => {
      await db.getRepository(City).insert([
        {
          name: "Chartres",
          description: "La description de Chartres",
          picture: "https://picsum.photos/200/300",
          latitude: "48.443854",
          longitude: "1.489012",
        },
      ]);
      expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Chartres",
              description: "La description de Chartres",
              picture: "https://picsum.photos/200/300",
              latitude: "48.443854",
              longitude: "1.489012",
            },
          },
        })
      ).rejects.toThrow("City name already found in database (creation)");
    });
    // a city with same latitude and longitude should not be created twice
    it("a city with same latitude and longitude should not be created twice", async () => {
      await db.getRepository(City).insert([
        {
          name: "Chartres",
          description: "La description de Chartres",
          picture: "https://picsum.photos/200/300",
          latitude: "48.443854",
          longitude: "1.489012",
        },
      ]);
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Paris",
              description: "La description de Paris",
              picture: "https://picsum.photos/200/300",
              latitude: "48.443854",
              longitude: "1.489012",
            },
          },
        })
      ).rejects.toThrow("City coordinates found in database");
    });
    // a city with no data should return an error
    it("a city with no data should return an error", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: null,
          },
        })
      ).rejects.toThrow();
    });
    // a citypicture should be only URLs
    it("a city picture should not be an URL", async () => {
      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          variables: {
            data: {
              name: "Marseille",
              description: "La description de Marseille",
              picture: "azertyuiopqsdfghjklmw",
              latitude: "48.443854",
              longitude: "1.489012",
            },
          },
        })
      ).rejects.toThrow();
    });
    // unvalid longitude should not be accepted (ex : other caracters than 0 to 9)
    // unvalid latitude should not be accepted (ex : other caracters than 0 to 9)
    // city descriptions with less than 10 letters should not be accepted
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
