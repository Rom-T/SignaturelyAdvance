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
import { signInBusinessUserApi, signInNegativeLoginApi, signInNegativePasswordApi } from '../helpers/apiCalls';

test.describe('Negative tests for Authorization process', () => {
    test('SP13/SP7/1 | Verify submitting the login form with a valid password but an empty email address', async ({
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

    test('SP13/SP7/2 | Verify failed login with invalid email and valid password.', async ({ page, loginPage }) => {
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
        test(`SP13/SP7/3,4,5,6,7 | Verify non-successful authorization of Business user in case of invalid email: ${typeEmailField[0]}`, async ({
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

test.describe('API Autorization', () => {
    test('SP13/SP56 | Sign in Business user via API call and verify response code is successful', async ({
        request,
    }) => {
        await description('To verify successful authorization via API call.');
        await severity(Severity.CRITICAL);
        await epic('Authorization');
        await feature('API');
        await tags('Business user', 'API');
        await link(`${JIRA_LINK}SP-56`, 'Jira task link');

        await step('Sign in Business user via API call', async () => {
            const response = await signInBusinessUserApi(request);

            await step('Verify response code for Sign in request is successful.', async () => {
                const body = await response.json();
                console.log('Response body:', body);

                const email = body.user.email;
                const name = body.user.name;
                expect(email).toBe('sign.js.test+05@gmail.com');
                expect(name).toBe('LB_tester');
                expect(response.status()).toBe(201);
            });
        });
    });

    test('SP13/SP66/1 | API Sign in with invalid password', async ({ request }) => {
        await description('To verify not successful authorization via API call.');
        await severity(Severity.NORMAL);
        await epic('Authorization');
        await feature('API');
        await tags('Business user', 'API', 'Negative');
        await link(`${JIRA_LINK}SP-66`, 'Jira task link');

        const response = await signInNegativePasswordApi(request);
        const body = await response.json();

        await step('Verify response code for Sign in request is successful.', async () => {
            expect(response.status()).toBe(401);
        });

        await step('Verify error message as it expected.', async () => {
            const error = body.error;
            expect(error).toBe('Unauthorized');
        });

        await step('Verify message as it expected.', async () => {
            const message = body.message;
            expect(message).toBe('Email or password incorrect. Please try again.');
        });
    });

    test('SP13/SP67/1 | API Sign in with invalid login', async ({ request }) => {
        await description('To verify not successful authorization via API call.');
        await severity(Severity.NORMAL);
        await epic('Authorization');
        await feature('API');
        await tags('Business user', 'API', 'Negative');
        await link(`${JIRA_LINK}SP-67`, 'Jira task link');

        const response = await signInNegativeLoginApi(request);
        const body = await response.json();

        await step('Verify response code as it expected.', async () => {
            expect(response.status()).toBe(401);
        });

        await step('Verify error message as it expected.', async () => {
            const error = body.error;
            expect(error).toBe('Unauthorized');
        });
    });
});
