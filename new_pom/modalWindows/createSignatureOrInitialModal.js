import { step } from 'allure-js-commons';

export default class CreateSignatureOrInitialModal {
    constructor(page) {
        this.page = page;

        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.signNowBtn = this.page.getByRole('button', { name: 'Sign Now' });
        this.inputSignature = this.page.locator('input.requisiteModal__type-input');
    }

    async clickCheckboxAgree() {
        await step('Check "I agree" checkbox.', async () => {
            await this.checkboxAgree.waitFor({ state: 'visible' });
            await this.checkboxAgree.click();
        });
    }

    async clickSignNowBtn() {
        await step('Click on "Sign Now" button.', async () => {
            await this.signNowBtn.click();
        });
    }

    async fillInputSignature(text) {
        await step('Fill in "Signature" input field.', async () => {
            await this.inputSignature.fill(text);
        });
    }
}
