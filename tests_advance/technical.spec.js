import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, link } from 'allure-js-commons';
import { healthRequest } from '../helpers/apiCalls';

test.describe('Teams API', () => {
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
});
