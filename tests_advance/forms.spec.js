import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { JIRA_LINK, URL_END_POINTS } from '../testData';
import { description, severity, Severity, link, epic, step, tags, feature } from 'allure-js-commons';

test.describe('Forms in case of FREE User', () => {
    test('TC_08_32_01 | Verify Free user is not able create form.', async ({
        createFreeUserAndLogin,
        signPage,
        settingsBillingPage,
        formsPage,
    }) => {
        await description('To verify that Free user can not create form.');
        await tags('Create Form', 'Negative');
        await severity(Severity.NORMAL);
        await feature('Forms');
        await link(`${JIRA_LINK}SP-41`, 'Jira task link');
        await epic('Forms');

        await signPage.sideMenu.clickForms();
        await formsPage.businessFeature.clickCreateBusinessFeatureBtn();

        await step('Verify that the user is on the settings page to change to the Business Feature.', async () => {
            await expect(settingsBillingPage.page).toHaveURL(
                process.env.URL + URL_END_POINTS.settingsBillingPlanEndPoint
            );
        });
    });
});
