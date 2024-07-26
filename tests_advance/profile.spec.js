import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { NEGATIVE_PASSWORD_DATA_SET, PASSWORD_CONFIRMATION_ERROR_MESSAGE, JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, feature, link } from 'allure-js-commons';
import { generateRandomPassword } from '../helpers/utils';

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
            await link(
                `${JIRA_LINK}SP-9?atlOrigin=eyJpIjoiNTM5NWFjZmRjOTFkNDI1MGI1YWZiNWYxNjQyZDkzYTMiLCJwIjoiaiJ9`,
                'Jira task link'
            );

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

    test(`SP15/SP12/N2 | Verify an error message when "New password" input doesn't match "Repeat new Password" input`, async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
    }) => {
        await description(
            `Verify an error message when "New password" input doesn't match "Repeat new Password" input`
        );
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(
            `${JIRA_LINK}SP-9?atlOrigin=eyJpIjoiNTM5NWFjZmRjOTFkNDI1MGI1YWZiNWYxNjQyZDkzYTMiLCJwIjoiaiJ9`,
            'Jira task link'
        );

        const randomNewPassword = generateRandomPassword(15);
        const randomRepeatNewPassword = generateRandomPassword(15);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.fillNewPasswordInputField(randomNewPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(randomRepeatNewPassword);

        await step('Verify a "Save" button is disabled', async () => {
            await expect(settingsProfilePage.saveButton).not.toBeEnabled();
        });

        await settingsProfilePage.clickProfileSettingsForm();
        await step('Verify the password confirmation error message', async () => {
            await expect(settingsProfilePage.confirmationPasswordError).toHaveText(PASSWORD_CONFIRMATION_ERROR_MESSAGE);
        });

        await step('Verify a "Save" button is still disabled', async () => {
            await expect(settingsProfilePage.saveButton).not.toBeEnabled();
        });
    });
});
