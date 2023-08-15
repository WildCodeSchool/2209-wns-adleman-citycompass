import { gql } from "@apollo/client/core";
import City from "../../server/src/entity/City";
import client from "./apolloClient";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import { getJWTFor } from "./utils";

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

    it("should create a city if connected user has superadmin role", async () => {
      const superadmin = await db.getRepository(User).save({
        firstname: "John",
        lastname: "Test",
        email: "superadmin@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "superadmin",
        managedCities: await db.getRepository(City).find(),
      });

      const token = await getJWTFor(superadmin);

      const res = await client.mutate({
        mutation: createCityMutation,
        fetchPolicy: "no-cache",
        variables: {
          data: {
            name: "Ville",
            picture: "https://picsum.photos/",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            latitude: "52.12",
            longitude: "12.52",
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      expect(res.data?.createCity).toHaveProperty("id");
    });

    it("should throw an error if user has role contributor", async () => {
      const contributor = await db.getRepository(User).save({
        firstname: "Jane",
        lastname: "Doe",
        email: "contributor@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "contributor",
      });
      console.log(contributor);
      const token = await getJWTFor({
        firstname: "JoJanehn",
        lastname: "Doe",
        email: "contributor@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "contributor",
      });

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
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );
    });

    it("should throw an error if user has role visitor", async () => {
      const visitor = await db.getRepository(User).save({
        firstname: "Sam",
        lastname: "zou",
        email: "visitor@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "visitor",
      });
      console.log(visitor);
      const token = await getJWTFor({
        firstname: "Sam",
        lastname: "zou",
        email: "visitor@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "visitor",
      });

      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          fetchPolicy: "no-cache",
          variables: {
            data: {
              name: "La ville",
              picture: "https://picsum.photos/",
              description: "la description un peu longue",
              latitude: "52.123",
              longitude: "12.523",
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );
    });

    it("should throw an error if user has role admin", async () => {
      const admin = await db.getRepository(User).save({
        firstname: "Tim",
        lastname: "Tam",
        email: "admin@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "admin",
      });
      console.log(admin);
      const token = await getJWTFor({
        firstname: "Tim",
        lastname: "Tam",
        email: "admin@example.com",
        password: "monMotsdepasse1!",
        picture: "https://i.pravatar.cc/300",
        role: "admin",
      });

      await expect(() =>
        client.mutate({
          mutation: createCityMutation,
          fetchPolicy: "no-cache",
          variables: {
            data: {
              name: "La ville",
              picture: "https://picsum.photos/",
              description: "la description un peu longue",
              latitude: "52.123",
              longitude: "12.523",
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );
    });
  });
});
