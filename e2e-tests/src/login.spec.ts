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
  await page.getByRole('button', { name: 'person icon to profile' }).click();

  const email = "visitor@mail.com";
  const password = await hashPassword("visitorPassword1!");
  await db.getRepository(User).insert({ email, password });

  await page.getByRole('button', { name: 'person icon to profile' }).click();
  await page.getByPlaceholder('monmail@email.fr').fill(email);
  await page.getByPlaceholder('Mot de passe').fill(password);
  await page.getByRole('button', { name: 'Enregistrer' }).click();
  await expect(page).toHaveURL(/.*dashboard/)
  await page.getByText(`Email : ${email}`).click();
});