import { test } from '../fixtures/base';
import { step } from 'allure-js-commons';

test.describe('Navigation', () => {
    test('test', async ({ page }) => {
        await step('Navigate to Login page.', async () => {
            await page.goto('/');
        });
    });
});
