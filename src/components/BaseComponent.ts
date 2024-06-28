import { Locator, Page } from '@playwright/test';

export class BaseComponent {
	protected readonly _page: Page;
	protected readonly _component: Locator;

	constructor(page: Page, component: Locator) {
		this._page = page;
		this._component = component;
	}

	get component() {
		return this._component;
	}
}
