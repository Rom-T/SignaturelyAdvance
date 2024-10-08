import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { JIRA_LINK, URL_END_POINTS, DATA_FOR_UPDATE_USER, DATA_FOR_UPDATE_COMPANY } from '../testData';
import { description, tag, severity, Severity, epic, step, feature, link } from 'allure-js-commons';
import { generateRandomPassword, getRandomString } from '../helpers/utils';
import {
    signInRequest,
    updatePasswordRequest,
    userNameUpdateViaAPI,
    userDataUpdateViaAPI,
    userAvatarUpdateViaAPI,
    getUserByID,
    companyUpdateViaAPI,
    companyNameUpdateViaAPI,
    getCompanyInfo,
} from '../helpers/apiCalls';

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

        await step('Verify response code for the user request is successful.', async () => {
            expect(response.status()).toBe(200);
        });

        const responseUser = await getUserByID(request);
        const responseBody = await responseUser.json();
        const name = responseBody.name;

        await step('Verify that name updated successfully.', async () => {
            expect(name).toBe(userName);
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

            await step('Verify response code for the user data update is successful.', async () => {
                expect(response.status()).toBe(200);
            });

            const responseUser = await getUserByID(request);
            const responseBody = await responseUser.json();

            await step(`Verify that field ${fieldName} updated successfully.`, async () => {
                expect(responseBody[fieldName]).toBe(fieldValue);
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

        await step('Verify response code for the user avatar update is successful.', async () => {
            expect(response.status()).toBe(200);
        });

        const responseUser = await getUserByID(request);
        const responseBody = await responseUser.json();
        const newAvatar = responseBody.avatarUrl;

        await step('Verify that avatar updated successfully.', async () => {
            expect(newAvatar).toContain(avatar);
        });
    });

    test(`SP15/SP64/1 Update company name via API`, async ({ createBusinessUserAndLogin, request }) => {
        await description('Update company name via API');
        await severity(Severity.NORMAL);
        await epic('Settings');
        await feature('Profile');
        await tag('Update company info');
        await link(`${JIRA_LINK}SP-64`, 'Jira task link');

        await signInRequest(request);

        const companyName = getRandomString(12);

        const response = await companyNameUpdateViaAPI(request, companyName);

        await step('Verify response code for the company name update is successful.', async () => {
            expect(response.status()).toBe(200);
        });

        const responseCompany = await getCompanyInfo(request);
        const responseBody = await responseCompany.json();
        const name = responseBody.companyName;

        await step('Verify that name updated successfully.', async () => {
            expect(name).toBe(companyName);
        });
    });

    DATA_FOR_UPDATE_COMPANY.forEach(({ desc, value }) => {
        const fieldName = Object.keys(value)[0];
        const fieldValue = value[fieldName];
        test(`SP15/SP75/1 Update Company data via API: ${desc}`, async ({ createBusinessUserAndLogin, request }) => {
            await description(`Update Company data via API: ${desc}`);
            await severity(Severity.NORMAL);
            await epic('Settings');
            await feature('Profile');
            await tag('Password');
            await link(`${JIRA_LINK}SP-75`, 'Jira task link');

            await signInRequest(request);

            const updateData = { [fieldName]: fieldValue };
            const response = await companyUpdateViaAPI(request, updateData);

            await step('Verify response code for the company update is successful.', async () => {
                expect(response.status()).toBe(200);
            });

            const responseCompany = await getCompanyInfo(request);
            const responseBody = await responseCompany.json();
            const updateValue = responseBody[fieldName];

            await step(`Verify that field ${fieldName} updated successfully.`, async () => {
                expect(updateValue).toBe(fieldValue);
            });
        });
    });
});
