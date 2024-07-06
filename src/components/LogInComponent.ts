import { BaseComponent } from './BaseComponent';
import { Locator, Page } from '@playwright/test';

export class LogInComponent extends BaseComponent {
	private readonly _emailField: Locator;
	private readonly _passwordField: Locator;
	private readonly _rememberMeCheckbox: Locator;
	private readonly _forgotPasswordBtn: Locator;
	private readonly _registrationBtn: Locator;
	private readonly _logInBtn: Locator;

	constructor(page: Page) {
		super(page, page.locator('.modal-content'));
		this._emailField = this.component.locator('#signinEmail');
		this._passwordField = this.component.locator('#signinPassword');
		this._rememberMeCheckbox = this.component.locator('#remember');
		this._forgotPasswordBtn = this.component.getByRole('button', { name: 'Forgot password' });
		this._registrationBtn = this.component.getByRole('button', { name: 'Registration' });
		this._logInBtn = this.component.getByRole('button', { name: 'Login' });
	}

	get emailField() {
		return this._emailField;
	}

	get passwordField() {
		return this._passwordField;
	}

	get rememberMeCheckbox() {
		return this._rememberMeCheckbox;
	}

	get forgotPasswordBtn() {
		return this._forgotPasswordBtn;
	}

	get registrationBtn() {
		return this._registrationBtn;
	}

	get logInBtn() {
		return this._logInBtn;
	}
}
