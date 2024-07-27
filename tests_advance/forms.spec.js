import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { JIRA_LINK, URL_END_POINTS } from '../testData.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Forms in case of FREE User', () => {
    test('TC_08_32_01 | Verify Free user can not create form.', async ({
        createFreeUserAndLogin,
        signPage,
        settingsBillingPage,
        formsPage,
    }) => {
        await description('To verify that Free user can not create form.');
        await tag('Create Form');
        await severity(Severity.CRITICAL);
        await link(`${JIRA_LINK}SP-41`, 'Jira task link');
        await epic('Forms');

        await signPage.sideMenu.clickForms();
        await formsPage.clickCreateBusinessFeatureBtn();

        await step('Verify that the user is on the settings page to change to the Business Feature.', async () => {
            await expect(settingsBillingPage.page).toHaveURL(
                process.env.URL + URL_END_POINTS.settingsBillingPlanEndPoint
            );
        });
    });
});
