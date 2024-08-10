import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { FORM_NAME, JIRA_LINK, URL_END_POINTS } from '../testData.js';
import { description, tag, severity, Severity, link, epic, step, tags, feature } from 'allure-js-commons';
import { createFolderRequest, createFormRequest, signInRequest } from '../helpers/apiCalls.js';
import SideMenuComponent from '../new_pom/components/sideMenuComponent.js';

test.describe('Forms in case of FREE User', () => {
    test('TC_08_32_01 | Verify Free user is not able create form.', async ({
        createFreeUserAndLogin,
        signPage,
        settingsBillingPage,
        formsPage,
    }) => {
        await description('To verify that Free user can not create form.');
        await tag('Create Form');
        await severity(Severity.NORMAL);
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

test.describe('Forms via API', () => {
    test('SP24/SP54/1 | Form draft creation via API', async ({
        createBusinessUserAndLogin,
        signPage,
        formsPage,
        request,
    }) => {
        await description('To verify successful form creation via API call.');
        await severity(Severity.CRITICAL);
        await epic('Forms');
        await feature('API');
        await tags('Business user', 'API');
        await link(`${JIRA_LINK}SP-??`, 'Jira task link');

        const response = await createFormRequest(request);

        await step('Verify response code for a form creation request is successful.', async () => {
            expect(response.status()).toBe(201);
        });

        await signPage.sideMenu.clickForms();

        await step('Verify the name of the form is in the list of forms.', async () => {
            await expect(formsPage.table.formTitleList).toHaveText(FORM_NAME);
        });
    });
});
