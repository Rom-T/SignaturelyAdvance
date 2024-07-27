import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK, URL_END_POINTS, ERROR_COLOR, TOAST_MESSAGE, INCORRECT_USER_EMAIL } from '../testData';
import { description, tag, severity, Severity, epic, step, link } from 'allure-js-commons';

test.describe('Negative tests for Authorization process', () => {
    test('SP-13/SP-7/1 | Verify submitting the login form with a valid password but an empty username', async ({
        page,
        loginPage,
    }) => {
        await description(
            'To verify non-successful authorization of Business user in case of empty "Email Address" field.'
        );
        await severity(Severity.NORMAL);
        await epic('Authorization');
        await tag('Login: negative');
        await link(`${JIRA_LINK}SP-7`, 'Jira task link');

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

    test('SP-13/SP-7/2 | Verify failed login with invalid email and valid password.', async ({
        page,
        loginPage,
    }) => {
        await description(
            'To verify non-successful authorization of Business user in case of invalid Username and valid Password.'
        );
        await severity(Severity.CRITICAL);
        await epic('Authorization');
        await tag('Business user');
        await link(`${JIRA_LINK}SP-7`, 'Jira task link');

        await step('Navigate to Login page.', async () => {
            await page.goto('/');
        });
        await loginPage.fillEmailAddressInput(INCORRECT_USER_EMAIL);
        await loginPage.fillPasswordInput(process.env.USER_PASSWORD);
        await loginPage.clickLogin();

        await step('Verify user is on Login page', async () => {
            await expect(loginPage.page).toHaveURL(process.env.URL + URL_END_POINTS.loginEndPoint);
        });

        await step('Verify error toast "Email or password incorrect. Please try again." appears.', async () => {
            await expect(loginPage.toast.toastBody).toHaveText(TOAST_MESSAGE.incorrectEmailOrPassword);
        });
    });
});
