import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

const randomEmail = faker.internet.email({firstName: 'aqa-tarasenko'});

// Чи є в playwright щось схоже на cy.log('Text') ?

test.describe('Registration form validation', async () => {
	test.beforeEach(async ({page}) => {
		page.goto('/');
		const signInBtn = page.locator('.header_signin');
		const modalPopup = page.locator('.modal-content');
		const registrationBtn = modalPopup.getByRole('button', {name: 'Registration'});

		await signInBtn.click();
		await registrationBtn.click();
	});

	//Create user with valid date
	test('[Valid] Create user with valid data', async ({page}) => {
		const nameInput = page.locator('#signupName');
		const lastNameInput = page.locator('#signupLastName');
		const emailInput = page.locator('#signupEmail');
		const passwordInput = page.locator('#signupPassword');
		const reEnterPasswordInput = page.locator('#signupRepeatPassword');
		const registerBtn = page.getByRole('button', {name: 'Register'});
		const myProfileDropdown = page.locator('#userNavDropdown');

		await nameInput.fill('Yevhen');
		await lastNameInput.fill('Tarasenko');
		await emailInput.fill(randomEmail);
		await passwordInput.fill('Qwerty12345%');
		await reEnterPasswordInput.fill('Qwerty12345%');
		await registerBtn.click();
		await expect.soft(myProfileDropdown).toBeVisible();
	});

	//Test the "Register" button is not clickable if data incorrect
	test('[Invalid] The "Register" button is not clickable if data incorrect', async ({page}) => {
		const nameInput = page.locator('#signupName');
		const lastNameInput = page.locator('#signupLastName');
		const emailInput = page.locator('#signupEmail');
		const passwordInput = page.locator('#signupPassword');
		const reEnterPasswordInput = page.locator('#signupRepeatPassword');
		const registerBtn = page.getByRole('button', {name: 'Register'});

		await nameInput.fill('Y');
		await lastNameInput.fill('T');
		await emailInput.fill('@#@@');
		await passwordInput.fill('Qwerty1');
		await reEnterPasswordInput.fill('Qwerty1234567890');
		await expect(registerBtn).toHaveAttribute('disabled');
	});

	//Tests for the "Name" field
	test('[Valid data] Validation the "Name" field', async ({page}) => {
		const nameInput = page.locator('#signupName');
		const errorMessage = page.locator('.invalid-feedback');

		// Min valid name
		await nameInput.fill('Ex');
		await nameInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Max valid name
		await nameInput.fill('MesWithTwentySymbols');
		await nameInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Name" field', async ({page}) => {
		const nameInput = page.locator('#signupName');
		const errorMessage = page.locator('.invalid-feedback');

		// Validation error "Name required"
		await nameInput.click();
		await nameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Name required" is shown').toHaveText('Name required');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name has to be from 2 to 20 characters long"
		await nameInput.fill('E');
		await nameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Name has to be from 2 to 20 characters long');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name has to be from 2 to 20 characters long"
		await nameInput.fill('MesWithTwentyOneSymbo');
		await nameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Name has to be from 2 to 20 characters long');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Name is invalid"
		await nameInput.fill('@#!$dasds');
		await nameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Name is invalid" is shown').toHaveText('Name is invalid');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Last name" field
	test('[Valid data] Validation the "Last name" field', async ({page}) => {
		const lastNameInput = page.locator('#signupLastName');
		const errorMessage = page.locator('.invalid-feedback');

		// Min valid Last name
		await lastNameInput.fill('Ex');
		await lastNameInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Max valid Last name
		await lastNameInput.fill('MesWithTwentySymbols');
		await lastNameInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Last name" field', async ({page}) => {
		const lastNameInput = page.locator('#signupLastName');
		const errorMessage = page.locator('.invalid-feedback');

		// Validation error "Last name required"
		await lastNameInput.click();
		await lastNameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Last name required" is shown').toHaveText('Last name required');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name has to be from 2 to 20 characters long"
		await lastNameInput.fill('E');
		await lastNameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Last name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Last name has to be from 2 to 20 characters long');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name has to be from 2 to 20 characters long"
		await lastNameInput.fill('MesWithTwentyOneSymbo');
		await lastNameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Last name has to be from 2 to 20 characters long" is shown')
			.toHaveText('Last name has to be from 2 to 20 characters long');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Last name is invalid"
		await lastNameInput.fill('@#!$dasds');
		await lastNameInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Last name is invalid" is shown')
			.toHaveText('Last name is invalid');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Email" field
	test('[Valid data] Validation the "Email" field', async ({page}) => {
		const emailInput = page.locator('#signupEmail');
		const errorMessage = page.locator('.invalid-feedback');

		// Valid email 1
		await emailInput.fill('test@gmail.com');
		await emailInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Valid email 2
		await emailInput.fill('test@a.ua');
		await emailInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Valid email 3
		await emailInput.fill('a@a.ua');
		await emailInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Email" field', async ({page}) => {
		const emailInput = page.locator('#signupEmail');
		const errorMessage = page.locator('.invalid-feedback');

		// Validation error "Email required"
		await emailInput.click();
		await emailInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Email required" is shown').toHaveText('Email required');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Email is incorrect"
		await emailInput.fill('@^#@@gmail.com');
		await emailInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Email is incorrect" is shown').toHaveText('Email is incorrect');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Password" field
	test('[Valid data] Validation the "Password" field', async ({page}) => {
		const passwordInput = page.locator('#signupPassword');
		const errorMessage = page.locator('.invalid-feedback');

		// Min valid password
		await passwordInput.fill('Qwerty12');
		await passwordInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Max valid password
		await passwordInput.fill('Qwerty123456789');
		await passwordInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Password" field', async ({page}) => {
		const passwordInput = page.locator('#signupPassword');
		const errorMessage = page.locator('.invalid-feedback');

		// Validation error "Password required"
		await passwordInput.click();
		await passwordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect.soft(errorMessage, 'Validation error "Password required" is shown').toHaveText('Password required');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await passwordInput.fill('Qwerty1');
		await passwordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// / Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await passwordInput.fill('Qwerty1234567890');
		await passwordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});

	//Tests for the "Re-enter password" field
	test('[Valid data] Validation the "Re-enter password" field', async ({page}) => {
		const passwordInput = page.locator('#signupPassword');
		const reEnterPasswordInput = page.locator('#signupRepeatPassword');
		const errorMessage = page.locator('.invalid-feedback');

		// Min valid Re-enter password
		await passwordInput.fill('Qwerty12');
		await reEnterPasswordInput.fill('Qwerty12');
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();

		// Max valid Re-enter password
		await passwordInput.fill('Qwerty123456789');
		await reEnterPasswordInput.fill('Qwerty123456789');
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage).not.toBeVisible();
	});

	test('[Invalid data] Validation the "Re-enter password" field', async ({page}) => {
		const passwordInput = page.locator('#signupPassword');
		const reEnterPasswordInput = page.locator('#signupRepeatPassword');
		const errorMessage = page.locator('.invalid-feedback');

		// Validation error "Re-enter password required"
		await reEnterPasswordInput.click();
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Re-enter password required" is shown')
			.toHaveText('Re-enter password required');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Passwords do not match"
		await passwordInput.fill('Qwerty12');
		await reEnterPasswordInput.fill('Qwerty123');
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(errorMessage, 'Validation error "Passwords do not match" is shown')
			.toHaveText('Passwords do not match');
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await reEnterPasswordInput.fill('Qwerty1');
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');

		// / Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
		await reEnterPasswordInput.fill('Qwerty1234567890');
		await reEnterPasswordInput.blur();
		await expect.soft(errorMessage, 'Validation error is visible').toBeVisible();
		await expect
			.soft(
				errorMessage,
				'Validation error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" is shown',
			)
			.toHaveText(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		await expect.soft(errorMessage, 'Validation error is red').toHaveCSS('color', 'rgb(220, 53, 69)');
	});
});
