import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, link, feature } from 'allure-js-commons';
import { getUserByID, healthRequest, signInRequest, userSignOut } from '../helpers/apiCalls';

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

    test(`SP/SP/1 Get info about User by ID`, async ({ createFreeUserAndLogin, request }) => {
        await description('Get info about User by ID');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-??`, 'Jira task link');

        const response = await getUserByID(request);

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });
    });

    test.skip(`SP/SP/1 Update info about User by ID`, async ({ createFreeUserAndLogin, request }) => {
        await description('Update User by ID');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-??`, 'Jira task link');

        //  const response = await userUpdateByID(request);

        const userID = await signInRequest(request);
        console.log(userID);
        console.log(process.env.NEW_USER_EMAIL);
        console.log(process.env.NEW_USER_PASSWORD);
    });

    test(`SP/SP/1 API Sign-Out Test`, async ({ createFreeUserAndLogin, request }) => {
        await description('User Sign Out via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-??`, 'Jira task link');

        const response = await userSignOut(request);

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(204);
        });
    });
});
