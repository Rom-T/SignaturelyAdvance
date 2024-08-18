import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import {
    JIRA_LINK,
    URL_END_POINTS,
    ERROR_COLOR,
    TOAST_MESSAGE,
    INCORRECT_USER_EMAIL,
    NEGATIVE_EMAIL_DATA_SET,
} from '../testData';
import { description, tags, severity, Severity, epic, step, link, feature } from 'allure-js-commons';

test.describe('Negative tests for Authorization process', () => {
    test.skip('SP13/SP7/1 | Verify submitting the login form with a valid password but an empty email address', async ({
        page,
        loginPage,
    }) => {
        await description(
            'To verify non-successful authorization of Business user in case of empty "Email Address" field.'
        );
        await severity(Severity.NORMAL);
        await epic('Authorization');
        await feature('Negative');
        await tags('Business user', 'Login: negative');
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

    test.skip('SP13/SP7/2 | Verify failed login with invalid email and valid password.', async ({
        page,
        loginPage,
    }) => {
        await description(
            'To verify non-successful authorization of Business user in case of invalid Email Address and valid Password.'
        );
        await severity(Severity.CRITICAL);
        await epic('Authorization');
        await feature('Negative');
        await tags('Business user', 'Negative');
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

    NEGATIVE_EMAIL_DATA_SET.forEach((typeEmailField) => {
        test.skip(`SP13/SP7/3,4,5,6,7 | Verify non-successful authorization of Business user in case of invalid email: ${typeEmailField[0]}`, async ({
            page,
            loginPage,
        }) => {
            await description(
                'To verify non-successful authorization of Business user in case of invalid email address without @, without domain, invalid domain, space before and after email, empty field.'
            );
            await severity(Severity.CRITICAL);
            await epic('Authorization');
            await feature('Negative');
            await tags('Business user', 'Negative');
            await link(`${JIRA_LINK}SP-7`, 'Jira task link');

            await step('Navigate to Login page.', async () => {
                await page.goto('/');
            });
            await loginPage.fillEmailAddressInput(typeEmailField[1]);
            await loginPage.fillPasswordInput(process.env.USER_PASSWORD);

            await step('Verify the error message', async () => {
                await expect(loginPage.emailAddressError).toHaveText(typeEmailField[2]);
            });
            await step('Verify the Login button is disabled', async () => {
                const buttonDisabled = await loginPage.loginBtn.isDisabled();
                expect(buttonDisabled).toBeTruthy();
            });
        });
    });
});
