import { step } from 'allure-js-commons';

export default class CardDetailsComponent {
    constructor(page) {
        this.page = page;

        this.cardNumberField = this.page
            .frameLocator('[title="Secure card number input frame"]')
            .getByLabel('Card Number');
        this.expirationDateField = this.page
            .frameLocator('[title="Secure expiration date input frame"]')
            .getByLabel('Expiration');
        this.cvvField = this.page.frameLocator('[title="Secure CVC input frame"]').getByPlaceholder('123');
        this.cardholderNameField = this.page.getByPlaceholder('Your Name');
        this.zipField = this.page.getByPlaceholder('00000');
        this.zipError = this.page
            .locator('.form__field')
            .filter({ has: this.page.getByPlaceholder('00000') })
            .locator('.form__error');
    }

    async fillData(cardDetails) {
        await step('Enter card details', async () => {
            await step('Fill in the "Card Number" input field', async () => {
                await this.cardNumberField.fill(cardDetails.cardNumber);
            });
            await step('Fill in the "Expiration Date" input field', async () => {
                await this.expirationDateField.fill(cardDetails.expirationDate);
            });
            await step('Fill in the "CVC" input field', async () => {
                await this.cvvField.fill(cardDetails.cvc);
            });
            await step('Fill in the "Full Name On Card" input field', async () => {
                await this.cardholderNameField.fill(cardDetails.fullNameOnCard);
            });
            await step('Fill in the "ZIP" input field', async () => {
                await this.zipField.fill(cardDetails.zip);
            });
        });
    }

    async fillCardholderNameField(nameOnCard) {
        await step('Fill in the "Full Name On Card" input field', async () => {
            await this.cardholderNameField.fill(nameOnCard);
        });
    }

    async fillCardNumberField(cardNumber) {
        await step('Fill in the "Card Number" input field', async () => {
            await this.cardNumberField.fill(cardNumber);
        })
    }

    async fillExpirationDateField(date) {
        await step('Fill in the "Expiration Date" input field', async () => {
            await this.expirationDateField.fill(date);
        })
    }

    async fillCvvField(number) {
        await step('Fill in the "CVC" input field', async () => {
            await this.cvvField.fill(number);
        })
    }
}
