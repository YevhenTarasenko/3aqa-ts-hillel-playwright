import { BaseComponent } from './BaseComponent';
import { Locator, Page } from '@playwright/test';

export class LogInComponent extends BaseComponent {
	private readonly _registrationBtn: Locator;

	constructor(page: Page) {
		super(page, page.locator('.modal-content'));
		this._registrationBtn = this.component.getByRole('button', { name: 'Registration' });
	}

	get registrationBtn() {
		return this._registrationBtn;
	}
}
