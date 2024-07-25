import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { NEGATIVE_PASSWORD_DATA_SET } from '../testData';
import { description, tag, tags, severity, Severity, epic, step, feature } from 'allure-js-commons';

test.describe("Negative tests for User's profile settings", () => {
    NEGATIVE_PASSWORD_DATA_SET.slice(0, -1).forEach((typePasswordField) =>
        test(`SP15/SP12/N1 | Verify a "New password" input field error message while trying to update a password with invalid data: ${typePasswordField[0]}`, async ({
            createBusinessUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsProfilePage,
        }) => {
            await description(
                'Verify a "New password" input field error message while trying to update a password with invalid data'
            );
            await severity(Severity.NORMAL);
            await epic('Settings');
            await feature('Profile');
            await tag('Password');

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.sideMenuSettings.clickProfile();
            await settingsProfilePage.fillNewPasswordInputField(typePasswordField[1]);
            await settingsProfilePage.fillRepeatNewPasswordInputField(typePasswordField[1]);

            await step('Verify the error message', async () => {
                await expect(settingsProfilePage.passwordError).toHaveText(typePasswordField[2]);
            });

            await step('Verify a "Save" button is disabled', async () => {
                await expect(settingsProfilePage.saveButton).not.toBeEnabled();
            });
        })
    );
});
