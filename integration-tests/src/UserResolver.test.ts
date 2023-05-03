import { gql } from "@apollo/client/core";
import client from "./apolloClient";
import jwt from "jsonwebtoken";

/**
 * Mutations for testing
 */

export const createUserMutation = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
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

export const login = gql`
  mutation Login($data: UserLogin!) {
    login(data: $data) {
      email
      password
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
      expect(res.data?.createUser).toHaveProperty("id");
      expect(res.data?.createUser).toHaveProperty("firstname");
      expect(res.data?.createUser).toHaveProperty("lastname");
      expect(res.data?.createUser).toHaveProperty("password");
      // password must be hashed
      expect(res.data?.createUser.password).toContain("$argon2");
      expect(res.data?.createUser).toHaveProperty("picture");
      expect(res.data?.createUser).toHaveProperty("role");
      expect(res.data?.createUser.role).toBe("visitor");
    });

    // try if firstname is empty
    it("should reject the query if firstname is empty", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "",
              lastname: "Test",
              email: "john@example.com",
              password: "monMotsdepasse1!",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if lastname is empty
    it("should reject the query if lastname is empty", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "",
              email: "john@example.com",
              password: "monMotsdepasse1!",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if email is empty
    it("should reject the query if email is empty", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "",
              password: "monMotsdepasse1!",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if password is empty
    it("should reject the query if password is empty", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail.com",
              password: "",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if email is not an email
    it("should reject if data send in email is not an email", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "testmonmail.com",
              password: "",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if email is not an email
    it("should reject if data send in email is not an email", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail",
              password: "",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });

    // try if picture is not an url
    it("should reject if picture send in is not an url", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail",
              password: "",
              picture: "i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });

    it("should reject if role is not visitor", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail",
              password: "monMotsdepasse1!",
              picture: "i.pravatar.cc/300",
              role: "superadmin",
            },
          },
        })
      ).rejects.toThrow();
    });
  });
  describe("login user", () => {
    let userId: Number;
    let token: String;

    beforeAll(async () => {
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
      userId = await res.data?.createUser.id;
      console.log("🐛", userId);
    });

    beforeAll(async () => {
      token = jwt.sign({ userId }, "zeyfgzeigfyzegfyuzegf");
    });

    it("should not log in", async () => {
      expect(() =>
        client.mutate({
          mutation: login,
          context: { headers: { authorization: `Bearer ${token}` } },
          variables: {
            data: {
              email: "john@example.com",
              password: "testmotdepasse",
            },
          },
        })
      ).rejects.toThrow();
    });

    it("should log in", async () => {
      await expect(() =>
        client.mutate({
          mutation: login,
          context: { headers: { authorization: `Bearer ${token}` } },
          variables: {
            data: {
              email: "john@example.com",
              password: "monMotsdepasse1!",
            },
          },
        })
      ).resolves;
    });
  });
});
