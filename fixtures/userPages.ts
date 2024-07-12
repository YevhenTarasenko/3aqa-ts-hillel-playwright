import { Page, test as base } from '@playwright/test';

export const userPages = base.extend<{ userGaragePage: Page }>({
	userGaragePage: async ({ browser }, use) => {
		const page = await browser.newPage({ storageState: 'setup/session-storage.json' });
		await use(page);
	},
});
