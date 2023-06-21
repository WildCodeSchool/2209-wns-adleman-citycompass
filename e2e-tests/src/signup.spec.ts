import { test } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can sign up with correct info", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'person icon to profile' }).click();
  await page.getByText('Créer un compte').click();

  await page.getByTestId("lastname").fill('John');
  await page.getByTestId("firstname").fill('contributor');
  await page.getByTestId("picture").fill('https://i.pravatar.cc/300');
  await page.getByTestId("email").fill('contributor@mail.com');
  await page.getByTestId("password").fill('contributorPassword1!');

  await page.getByTestId('register').click();
  await page.locator('div').filter({ hasText: /^Me connecterEmailPasswordCréer un compteEnregistrer$/ }).nth(3).click();

 });