import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class HomePage extends BasePage {
	private readonly _header: HeaderComponent;

	constructor(page: Page) {
		super(page, '/');
		this._header = new HeaderComponent(this._page);
	}

	get header() {
		return this._header;
	}
}
