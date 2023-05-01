import { gql } from "@apollo/client/core";
import client from "./apolloClient";

/**
 * Mutations for testing
 */

const createUserMutation = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      firstname
      lastname
      email
      password
      picture
    }
  }
`;

/**
 * Tests
 */

describe("User Resolver", () => {
  describe("create user", () => {
    it("should create a user", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: {
          data: {
            firstname: "John",
            lastname: "Test",
            email: "john@example.com",
            password: "monMotsdepasse1!",
            picture: "https://i.pravatar.cc/300",
          },
        },
      });
      expect(res.data?.createUser).toHaveProperty("firstname");
      expect(res.data?.createUser).toHaveProperty("lastname");
      expect(res.data?.createUser).toHaveProperty("password");
      expect(res.data?.createUser).toHaveProperty("picture");
    });
  });
});
