import { step } from 'allure-js-commons';

export default class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailAddressInput = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInput = this.page.getByPlaceholder('Your password');
        this.loginBtn = this.page.getByRole('button', { name: 'Login' });
        this.emailAddressError = this.page.locator('.form__field').filter({ has: this.page.getByPlaceholder('username@gmail.com')}).locator('.form__error');
    }

    async fillEmailAddressInput(email) {
        await step('Fill in "Email Address" input field.', async () => {
            await this.emailAddressInput.fill(email);
        });
    }

    async fillPasswordInput(password) {
        await step('Fill in "Password" input field.', async () => {
            await this.passwordInput.fill(password);
        });
    }

    async clickLogin() {
        await step('Click on "Login" button.', async () => {
            await this.loginBtn.click();
        });
    }
}
