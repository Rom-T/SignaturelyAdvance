import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK } from '../testData';
import { description, tags, severity, Severity, epic, step, link, feature } from 'allure-js-commons';
import { signInBusinessUserApi, signInNegativeLoginApi, signInNegativePasswordApi } from '../helpers/apiCalls';

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
