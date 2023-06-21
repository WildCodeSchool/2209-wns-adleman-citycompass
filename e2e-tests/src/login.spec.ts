import { test, expect } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";
import {
    hashPassword,
  } from "../../server/src/helpers/hashing";
import User from "../../server/src/entity/User";
import db from "../../server/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'person icon to profile' }).click();

  const lastname= "contributor";
  const firstname= "John";
  const picture= "https://i.pravatar.cc/300";
  const email = "contributor@mail.com";
  const passwordClear = "contributorPassword1!";
  const password = await hashPassword(passwordClear);
  const user = await db.getRepository(User).insert({ lastname, firstname, picture, email, password });
  // const user = db.getRepository(User).find()
  console.log("😀", user);
  
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(passwordClear);
  await page.getByRole('button', { name: 'Enregistrer' }).click();
  
  await expect(page.getByTestId("login-email-dashboard")).toContainText(
    `Email : ${email}`
  );
});