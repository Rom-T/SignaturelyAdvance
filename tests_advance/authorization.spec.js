import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { ERROR_COLOR } from '../testData';
import { description, tag, severity, Severity, epic, step } from 'allure-js-commons';

test.describe('Negative tests for Authorization process', () => {
    test('SP-13/SP-7/01 | Verify non-successful authorization of Trial user in case of empty "Email Address" field', async ({ page, loginPage, signPage }) => {
        await description('To verify non-successful authorization of Trial user in case of empty "Email Address" field.');
        await severity(Severity.NORMAL);
        await epic('Authorization');
        await tag('Login: negative');

        await step('Navigate to Login page.', async () => {
            await page.goto('/');
        });
        await loginPage.fillEmailAddressInput('');
        await loginPage.fillPasswordInput(process.env.USER_PASSWORD);

        await step('Verify the email field turns red, indicating an error.', async () => {
            await expect(loginPage.emailAddressInput).toHaveCSS('color', ERROR_COLOR);
        });
        await step('Verify the error message "Required"', async () => {
            await expect(loginPage.emailAddressError).toHaveText('Required');
        });
    });
});