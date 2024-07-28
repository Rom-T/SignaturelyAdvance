import { URL_END_POINTS } from '../../testData';
import { step } from 'allure-js-commons';
import ToastComponent from "../components/toastComponent";

export default class ConfirmCodeModal {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.confirmCodeModalTitle = this.page.locator('.confirmCodeModal__title');
        this.confirmCodeInputField = this.page.getByPlaceholder('0A2b3C4d5E');
        this.sendButton = this.page.getByRole('button', { name: 'Send', exact: true });
        this.resendButton = this.page.getByRole('button', { name: 'Resend', exact: true });
    }

    async fillConfirmCodeInputField(code) {
        await step('Enter confirmation code.', async () => {
            await this.confirmCodeInputField.fill(code);
        });
    }

    async clickSendButton() {
        await step('Click on "Send" button.', async () => {
            await this.sendButton.click();
            await this.page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
        });
    }

    async clickSendButtonAndStay() {
        await step('Click on "Send" button.', async () => {
            await this.sendButton.click();
        });
    }

    async clickResendButton() {
        await step('Click on "Send" button.', async () => {
            await this.resendButton.click();
        });
    }
}
