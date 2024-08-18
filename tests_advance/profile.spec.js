import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import {
    NEGATIVE_PASSWORD_DATA_SET,
    PASSWORD_CONFIRMATION_ERROR_MESSAGE,
    JIRA_LINK,
    URL_END_POINTS,
    DATA_FOR_UPDATE_USER,
} from '../testData';
import { description, tag, severity, Severity, epic, step, feature, link } from 'allure-js-commons';
import { generateRandomPassword, getRandomString } from '../helpers/utils';
import {
    signInRequest,
    updatePasswordRequest,
    userNameUpdateViaAPI,
    userDataUpdateViaAPI,
    userAvatarUpdateViaAPI,
} from '../helpers/apiCalls';

test.describe("Negative tests for User's profile settings", () => {
    NEGATIVE_PASSWORD_DATA_SET.slice(0, -1).forEach((typePasswordField) =>
        test.skip(`SP15/SP9/1 | Verify a "New password" input field error message while trying to update a password with invalid data: ${typePasswordField[0]}`, async ({
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
            await link(`${JIRA_LINK}SP-9`, 'Jira task link');

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

    test.skip(`SP15/SP9/2 | Verify an error message when "New password" input doesn't match "Repeat new Password" input`, async ({
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
        await link(`${JIRA_LINK}SP-9`, 'Jira task link');

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

test.describe("API tests for User's profile settings", () => {
    test(`SP15/SP34/1 | Verify Free User’s password update via API`, async ({
        createFreeUserAndLogin,
        request,
        page,
        loginPage,
        signPage,
    }) => {
        await description(
            'Verify a "New password" input field error message while trying to update a password with invalid data'
        );
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-34`, 'Jira task link');

        const randomNewPassword = generateRandomPassword(15);
        await signInRequest(request);
        const response = await updatePasswordRequest(request, randomNewPassword);

        await step('Verify response code for a folder creation request is successful.', async () => {
            expect(response.status()).toBe(200);
        });

        await step('Navigate to Login page.', async () => {
            await page.goto('/');
        });
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(randomNewPassword);
        await loginPage.clickLogin();

        await step('Verify user is on Sign page', async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
        });
    });

    test(`SP15/SP72/1 Update User name via API`, async ({ createFreeUserAndLogin, request }) => {
        await description('Update User name via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-72`, 'Jira task link');

        await signInRequest(request);

        const userName = getRandomString(10);
        const response = await userNameUpdateViaAPI(request, userName);

        const responseBody = await response.json();
        const name = responseBody.name;
        await step('Verify that name updated successfully.', async () => {
            expect(name).toBe(userName);
        });
        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });
    });

    DATA_FOR_UPDATE_USER.forEach(({ desc, value }) => {
        const fieldName = Object.keys(value)[0];
        const fieldValue = value[fieldName];
        test(`SP15/SP63/1 Update User data via API: ${desc}`, async ({ createFreeUserAndLogin, request }) => {
            await description(`Update User data via API: ${desc}`);
            await severity(Severity.NORMAL);
            await epic('Settings');
            await feature('Profile');
            await tag('Password');
            await link(`${JIRA_LINK}SP-63`, 'Jira task link');

            await signInRequest(request);

            const updateData = { [fieldName]: fieldValue };
            const response = await userDataUpdateViaAPI(request, updateData);
            const responseBody = await response.json();

            await step(`Verify that field ${fieldName} updated successfully.`, async () => {
                expect(responseBody[fieldName]).toBe(fieldValue);
            });

            await step('Verify response code for the user request is successful.', async () => {
                expect(response.status()).toBe(200);
            });
        });
    });

    test(`SP15/SP73/1 Update User avatar via API`, async ({ createFreeUserAndLogin, request }) => {
        await description('Update User avatar via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Password');
        await link(`${JIRA_LINK}SP-73`, 'Jira task link');

        await signInRequest(request);

        const avatar = getRandomString(10);
        const response = await userAvatarUpdateViaAPI(request, avatar);

        const responseBody = await response.json();
        const newAvatar = responseBody.avatarUrl;

        await step('Verify that avatar updated successfully.', async () => {
            expect(newAvatar).toContain(avatar);
        });
        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });
    });
});
