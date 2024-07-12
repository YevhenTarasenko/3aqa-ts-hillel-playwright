import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { LogInComponent } from '../components/LogInComponent';
import { RegistrationComponent } from '../components/RegistrationComponent';

export class HomePage extends BasePage {
	private readonly _header: HeaderComponent;
	private readonly _logInPopup: LogInComponent;
	private readonly _registrationPopup: RegistrationComponent;

	constructor(page: Page) {
		super(page, '/');
		this._header = new HeaderComponent(this._page);
		this._logInPopup = new LogInComponent(this._page);
		this._registrationPopup = new RegistrationComponent(this._page);
	}

	get header() {
		return this._header;
	}

	get logInPopup() {
		return this._logInPopup;
	}

	get registrationPopup() {
		return this._registrationPopup;
	}
}
