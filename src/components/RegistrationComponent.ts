import { BaseComponent } from './BaseComponent';
import { Locator, Page } from '@playwright/test';

export class RegistrationComponent extends BaseComponent {
	private readonly _nameInput: Locator;
	private readonly _lastNameInput: Locator;
	private readonly _emailInput: Locator;
	private readonly _passwordInput: Locator;
	private readonly _reEnterPasswordInput: Locator;
	private readonly _registerBtn: Locator;
	private readonly _errorMessage: Locator;

	constructor(page: Page) {
		super(page, page.locator('.modal-content'));
		this._nameInput = this.component.locator('#signupName');
		this._lastNameInput = this.component.locator('#signupLastName');
		this._emailInput = this.component.locator('#signupEmail');
		this._passwordInput = this.component.locator('#signupPassword');
		this._reEnterPasswordInput = this.component.locator('#signupRepeatPassword');
		this._registerBtn = this.component.getByRole('button', { name: 'Register' });
		this._errorMessage = this.component.locator('.invalid-feedback');
	}

	get nameInput() {
		return this._nameInput;
	}

	get lastNameInput() {
		return this._lastNameInput;
	}

	get emailInput() {
		return this._emailInput;
	}

	get passwordInput() {
		return this._passwordInput;
	}

	get reEnterPasswordInput() {
		return this._reEnterPasswordInput;
	}

	get registerBtn() {
		return this._registerBtn;
	}

	get errorMessage() {
		return this._errorMessage;
	}
}
