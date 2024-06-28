import { test, expect } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { HeaderComponent } from '../../../src/components/HeaderComponent';
import { LogInComponent } from '../../../src/components/LogInComponent';
import { RegistrationComponent } from '../../../src/components/RegistrationComponent';
import { faker } from '@faker-js/faker';

const randomEmail = faker.internet.email({ firstName: 'aqa-tarasenko' });

let registrationPopup: RegistrationComponent;
let header: HeaderComponent;

test.describe('Registration form validation', async () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		header = new HeaderComponent(page);
		const logInPopup = new LogInComponent(page);
		registrationPopup = new RegistrationComponent(page);

		await homePage.navigate();
		await header.signInBtn.click();
		await logInPopup.registrationBtn.click();
	});

	//Create user with valid date
	test('[Valid] Create user with valid data', async () => {
		await registrationPopup.nameInput.fill('Yevhen');
		await registrationPopup.lastNameInput.fill('Tarasenko');
		await registrationPopup.emailInput.fill(randomEmail);
		await registrationPopup.passwordInput.fill('Qwerty12345%');
		await registrationPopup.reEnterPasswordInput.fill('Qwerty12345%');
		await registrationPopup.registerBtn.click();
		await expect.soft(header.myProfileDropdown).toBeVisible();
	});

	//Test the "Register" button is not clickable if data incorrect
	test('[Invalid] The "Register" button is not clickable if data incorrect', async () => {
		await registrationPopup.nameInput.fill('Y');
		await registrationPopup.lastNameInput.fill('T');
		await registrationPopup.emailInput.fill('@#@@');
		await registrationPopup.passwordInput.fill('Qwerty1');
		await registrationPopup.reEnterPasswordInput.fill('Qwerty1234567890');
		await expect.soft(registrationPopup.registerBtn).toHaveAttribute('disabled');
	});
	//Tests for the "Name" field
	test('[Valid data] Validation the "Name" field', async () => {
		// Min valid name
		await registrationPopup.nameInput.fill('Ex');
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Max valid name
		await registrationPopup.nameInput.fill('MesWithTwentySymbols');
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Name" field', async () => {
		// Validation error "Name required"
		await registrationPopup.nameInput.click();
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Name required" is shown')
			.toHaveText('Name required');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name has to be from 2 to 20 characters long"
		await registrationPopup.nameInput.fill('E');
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Name has to be from 2 to 20 characters long');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name has to be from 2 to 20 characters long"
		await registrationPopup.nameInput.fill('MesWithTwentyOneSymbo');
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Name has to be from 2 to 20 characters long');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name is invalid"
		await registrationPopup.nameInput.fill('@#!$dasds');
		await registrationPopup.nameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Name is invalid" is shown')
			.toHaveText('Name is invalid');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Last name" field
	test('[Valid data] Validation the "Last name" field', async () => {
		// Min valid Last name
		await registrationPopup.lastNameInput.fill('Ex');
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Max valid Last name
		await registrationPopup.lastNameInput.fill('MesWithTwentySymbols');
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Last name" field', async () => {
		// Validation error "Last name required"
		await registrationPopup.lastNameInput.click();
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Last name required" is shown')
			.toHaveText('Last name required');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name has to be from 2 to 20 characters long"
		await registrationPopup.lastNameInput.fill('E');
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Last name has to be from 2 to 20 characters long" is shown',
			)
			.toHaveText('Last name has to be from 2 to 20 characters long');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name has to be from 2 to 20 characters long"
		await registrationPopup.lastNameInput.fill('MesWithTwentyOneSymbo');
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Last name has to be from 2 to 20 characters long" is shown',
			)
			.toHaveText('Last name has to be from 2 to 20 characters long');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name is invalid"
		await registrationPopup.lastNameInput.fill('@#!$dasds');
		await registrationPopup.lastNameInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Last name is invalid" is shown')
			.toHaveText('Last name is invalid');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Email" field
	test('[Valid data] Validation the "Email" field', async () => {
		// Valid email 1
		await registrationPopup.emailInput.fill('test@gmail.com');
		await registrationPopup.emailInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Valid email 2
		await registrationPopup.emailInput.fill('test@a.ua');
		await registrationPopup.emailInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Valid email 3
		await registrationPopup.emailInput.fill('a@a.ua');
		await registrationPopup.emailInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Email" field', async () => {
		// Validation error "Email required"
		await registrationPopup.emailInput.click();
		await registrationPopup.emailInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Email required" is shown')
			.toHaveText('Email required');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Email is incorrect"
		await registrationPopup.emailInput.fill('@^#@@gmail.com');
		await registrationPopup.emailInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Email is incorrect" is shown')
			.toHaveText('Email is incorrect');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Password" field
	test('[Valid data] Validation the "Password" field', async () => {
		// Min valid password
		await registrationPopup.passwordInput.fill('Qwerty12');
		await registrationPopup.passwordInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Max valid password
		await registrationPopup.passwordInput.fill('Qwerty123456789');
		await registrationPopup.passwordInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Password" field', async () => {
		// Validation error "Password required"
		await registrationPopup.passwordInput.click();
		await registrationPopup.passwordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Password required" is shown')
			.toHaveText('Password required');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await registrationPopup.passwordInput.fill('Qwerty1');
		await registrationPopup.passwordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// / Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await registrationPopup.passwordInput.fill('Qwerty1234567890');
		await registrationPopup.passwordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Re-enter password" field
	test('[Valid data] Validation the "Re-enter password" field', async () => {
		// Min valid Re-enter password
		await registrationPopup.passwordInput.fill('Qwerty12');
		await registrationPopup.reEnterPasswordInput.fill('Qwerty12');
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();

		// Max valid Re-enter password
		await registrationPopup.passwordInput.fill('Qwerty123456789');
		await registrationPopup.reEnterPasswordInput.fill('Qwerty123456789');
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Re-enter password" field', async () => {
		// Validation error "Re-enter password required"
		await registrationPopup.reEnterPasswordInput.click();
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Re-enter password required" is shown')
			.toHaveText('Re-enter password required');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Passwords do not match"
		await registrationPopup.passwordInput.fill('Qwerty12');
		await registrationPopup.reEnterPasswordInput.fill('Qwerty123');
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(registrationPopup.errorMessage, 'Validation error "Passwords do not match" is shown')
			.toHaveText('Passwords do not match');
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await registrationPopup.reEnterPasswordInput.fill('Qwerty1');
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// / Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await registrationPopup.reEnterPasswordInput.fill('Qwerty1234567890');
		await registrationPopup.reEnterPasswordInput.blur();
		await expect.soft(registrationPopup.errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				registrationPopup.errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(registrationPopup.errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});
});
