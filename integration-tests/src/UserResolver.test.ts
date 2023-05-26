import { gql } from "@apollo/client/core";
import client from "./apolloClient";

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

export const updateUserRole = gql`
  mutation UpdateUserRole($updateUserRoleId: Int!, $data: UserRoleUpdate!) {
    updateUserRole(id: $updateUserRoleId, data: $data) {
      id
      role
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
    // try if password is to short
    it("should reject if data send in password is less than 8 char", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail.com",
              password: "m!nMpe1",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if password is to weak
    it("should reject if data send in password is all lowercase", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail.com",
              password: "monmotsdepasse1!",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if password is to weak
    it("should reject if data send in password doesn't contains a number", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail.com",
              password: "monMotsdepasse!",
              picture: "https://i.pravatar.cc/300",
            },
          },
        })
      ).rejects.toThrow();
    });
    // try if password is to weak
    it("should reject if data send in password doesn't contains a special character", async () => {
      await expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstname: "John",
              lastname: "Test",
              email: "test@monmail.com",
              password: "monMotsdepasse1",
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
              password: "monMotsdepasse1!",
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
              password: "monMotsdepasse1!",
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
              password: "monMotsdepasse1!",
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

  describe("update user", () => {
    it("should throw an error if user is not logged in", async () => {
      await expect(() =>
        client.mutate({
          mutation: updateUserRole,
          variables: {
            updateUserRoleId: 76,
            data: {
              role: "visitor",
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );
    });
    // tester role superadmin user superadmin d'un autre user : ok

    // tester role admin user superadmin : ok

    // tester role contributor user superadmin : ok

    // tester role visitor user superadmin : ok

    // tester role superadmin user admin : nok

    // tester role admin user superadmin : nok

    // tester role contributor user superadmin : ok

    // tester role visitor user superadmin : ok

    // tester changement de role à soit même : nok
  });
});
