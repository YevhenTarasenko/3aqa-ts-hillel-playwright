import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class GaragePage extends BasePage {
	private readonly _header: HeaderComponent;
	private readonly _addCarBtn: Locator;
	private readonly _emptyMessageInPage: Locator;

	constructor(page: Page) {
		super(page, '/');
		this._header = new HeaderComponent(this._page);
		this._addCarBtn = this._page.getByRole('button', { name: 'Add car' });
		this._emptyMessageInPage = this._page.locator('.panel-empty_message');
	}

	get header() {
		return this._header;
	}

	get addCarBtn() {
		return this._addCarBtn;
	}

	get emptyMessageInPage() {
		return this._emptyMessageInPage;
	}
}
