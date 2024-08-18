import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, link, feature, tags } from 'allure-js-commons';
import { getUserByID, healthRequest, userSignOut, signInRequest, getCompanyInfo } from '../helpers/apiCalls';

test.describe('Technical tests API', () => {
    test(`SP65/SP61/1 | Verify The Health Check is successful via API`, async ({ request }) => {
        await description('Verify The Health Check is successful via API');
        await severity(Severity.CRITICAL);
        await epic('Technical Test');
        await tag('API');
        await link(`${JIRA_LINK}SP-61`, 'Jira task link');

        const response = await healthRequest(request);

        await step('Verify response code for the health check request is successful.', async () => {
            console.log(response);
            expect(response.status()).toBe(200);
        });
    });

    test(`SP65/SP62/1 Get User by ID (API test)`, async ({ createFreeUserAndLogin, request }) => {
        await description('Get info about User by ID via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tags('User', 'API');
        await link(`${JIRA_LINK}SP-62`, 'Jira task link');

        await signInRequest(request);

        const response = await getUserByID(request);

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test(`SP65/SP71/1 API Sign-Out Test`, async ({ createFreeUserAndLogin, request }) => {
        await description('User Sign Out via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Technical test');
        await tags('Sign Out', 'API');
        await link(`${JIRA_LINK}SP-71`, 'Jira task link');

        const response = await userSignOut(request);

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(204);
        });
    });

    test(`SP65/SP74/1 Get Company Info by ID (API test)`, async ({ createFreeUserAndLogin, request }) => {
        await description('Get Company info via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tags('Company info', 'API');
        await link(`${JIRA_LINK}SP-74`, 'Jira task link');

        const response = await getCompanyInfo(request);

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });
    });
});
