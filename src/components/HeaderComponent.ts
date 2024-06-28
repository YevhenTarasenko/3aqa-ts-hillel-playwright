import { BaseComponent } from './BaseComponent';
import { Locator, Page } from '@playwright/test';

export class HeaderComponent extends BaseComponent {
	private readonly _signInBtn: Locator;
	private readonly _myProfileDropdown: Locator;

	constructor(page: Page) {
		super(page, page.locator('.header'));
		this._signInBtn = this.component.locator('.header_signin');
		this._myProfileDropdown = this.component.locator('#userNavDropdown');
	}

	get signInBtn() {
		return this._signInBtn;
	}

	get myProfileDropdown() {
		return this._myProfileDropdown;
	}
}
