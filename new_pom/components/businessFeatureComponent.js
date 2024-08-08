import { step } from 'allure-js-commons';

export default class BusinessFeatureComponent {
    constructor(page) {
        this.page = page;

        this.createBusinessFeatureBtn = this.page.locator('.company__billet-text');
    }
    async clickCreateBusinessFeatureBtn() {
        await step('Click on "Business Feature" button.', async () => {
            await this.createBusinessFeatureBtn.click();
        });
    }
}
