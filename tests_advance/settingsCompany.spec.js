import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { NEGATIVE_COMPANY_INFO_ARR, NEGATIVE_FIELD_DATA, COMPANY_INFO, TOAST_MESSAGE, URL_END_POINTS } from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { description, tag, tags, severity, Severity, epic, feature, step } from 'allure-js-commons';

test.describe('Negative tests for Settings Company', () => {
    test(`SP26/SP30/1 | Verify the creation of a company profile fails when the entered Company Name exceeds 99 characters.`, async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
    }) => {
        await description(
            'To verify that the creation of a company profile fails when the entered Company Name exceeds 99 characters.'
        );
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Company');
        await tags('Company form', 'Negative');

        const newUserData = await generateNewUserData();

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.fillCompanyName(NEGATIVE_FIELD_DATA);
        await settingsCompanyPage.clickSaveBtn();

        await step('Verify toast "Something went wrong" appears', async () => {
            await expect(settingsCompanyPage.toast.toastBody).toHaveText(TOAST_MESSAGE.nonsuccess);
        });
    });

    test(`SP26/SP30/2 | Verify the field of Redirection Page is disabled if not select checkbox to 
Activate custom redirection page`, async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
    }) => {
        await description(
            'Verify the field of Redirection Page is disabled if not select checkbox to Activate custom redirection page'
        );
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Company');
        await tags('Company form', 'Negative');

        await signPage.sideMenu.clickSettings();
        await expect (settingsCompanyPage.checkboxActivateCompany).toHaveClass('uiCheckbox__inner uiCheckbox--unChecked');

        const fieldDisabled = await settingsCompanyPage.redirectionPage.isDisabled
        expect(fieldDisabled).toBeTruthy();

        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage(COMPANY_INFO.redirectionPage);
});
})

