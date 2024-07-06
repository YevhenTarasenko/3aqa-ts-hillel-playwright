import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { GaragePage } from '../src/pages/GaragePage';

const EMAIL = process.env.CREDENTIALS_EMAIL!;
const PASSWORD = process.env.CREDENTIALS_PASSWORD!;

let homePage: HomePage;
let garagePage: GaragePage;

setup('Get storage state', async ({ page }) => {
	homePage = new HomePage(page);
	garagePage = new GaragePage(page);

	await homePage.navigate();
	await homePage.header.signInBtn.click();
	await homePage.logInPopup.emailField.fill(EMAIL);
	await homePage.logInPopup.passwordField.fill(PASSWORD);
	await homePage.logInPopup.logInBtn.click();

	await expect(garagePage.header.myProfileDropdown).toBeVisible();
	await expect(garagePage.addCarBtn).toBeVisible();

	await page.context().storageState({ path: 'setup/session-storage.json' });
});
