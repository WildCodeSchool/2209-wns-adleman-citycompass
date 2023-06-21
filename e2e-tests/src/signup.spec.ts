import { test, expect } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can sign up with correct info", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'person icon to profile' }).click();
  await page.getByText('Créer un compte').click();

  await page.getByPlaceholder('Nom', { exact: true }).click();
  await page.getByPlaceholder('Nom', { exact: true }).fill('John');
  await page.getByPlaceholder('Prénom').click();
  await page.getByPlaceholder('Prénom').fill('contributor');
  await page.getByPlaceholder('https://mon-avatar.net').click();
  await page.getByPlaceholder('https://mon-avatar.net').fill('https://i.pravatar.cc/300');
  await page.getByPlaceholder('monmail@email.fr').click();
  await page.getByPlaceholder('monmail@email.fr').fill('contributor@mail.com');
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill('contributorPassword1!');

  await page.getByText('Se connecter').click();
  await page.locator('div').filter({ hasText: /^Me connecterEmailPasswordCréer un compteEnregistrer$/ }).nth(3).click();

 });