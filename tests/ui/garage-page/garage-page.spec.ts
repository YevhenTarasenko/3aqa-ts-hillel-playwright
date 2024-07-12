import { expect } from '@playwright/test';
import { userPages as test } from '../../../fixtures/userPages';
import { GaragePage } from '../../../src/pages/GaragePage';

let garagePage: GaragePage;

test.describe('Garage page', () => {
	test.beforeEach(async ({ page }) => {
		garagePage = new GaragePage(page);
	});

	test('Open Garage page', async ({ userGaragePage }) => {
		await userGaragePage.goto('/');
		expect(garagePage.emptyMessageInPage).toHaveText(`You don’t have any cars in your garage`);
	});
});
