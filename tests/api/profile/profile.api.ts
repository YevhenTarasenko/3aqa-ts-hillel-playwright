import { test, expect } from '@playwright/test';

//Mocking requests

test.use({ storageState: 'setup/session-storage.json' });

test('Check profile name with min test data', async ({ page }) => {
	const minTestData = {
		status: 'ok',
		data: {
			userId: 130699,
			photoFilename: 'default-user.png',
			name: 'Y',
			lastName: 'T',
		},
	};

	await page.route('**/api/users/profile', (route) => {
		route.fulfill({
			status: 200,
			body: JSON.stringify(minTestData),
		});
	});

	await page.goto('panel/profile', { waitUntil: 'commit' });

	await expect(page.locator('.profile_name')).toBeVisible();
	await expect(page.locator('.profile_name')).toHaveText('Y T');
});

test('Check profile name with max test data', async ({ page }) => {
	const minTestData = {
		status: 'ok',
		data: {
			userId: 130699,
			photoFilename: 'default-user.png',
			name: 'Twentysymbolstwentys',
			lastName: 'Twentysymbolstwentys',
		},
	};

	await page.route('**/api/users/profile', (route) => {
		route.fulfill({
			status: 200,
			body: JSON.stringify(minTestData),
		});
	});

	await page.goto('panel/profile');

	await expect(page.locator('.profile_name')).toBeVisible();
	await expect(page.locator('.profile_name')).toHaveText('Twentysymbolstwentys Twentysymbolstwentys');
});

test('Check profile if status 404', async ({ page }) => {
	await page.route('**/api/users/profile', (route) => {
		route.fulfill({
			status: 404,
		});
	});

	await page.goto('panel/profile');

	await expect(page.locator('.profile_name')).not.toBeVisible();
});
