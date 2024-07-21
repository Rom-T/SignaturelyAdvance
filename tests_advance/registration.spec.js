import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { negativeEmailsArr, URL_END_POINTS } from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { negativeEmails } from '../testData';
import { description, tag, severity, Severity, epic, step } from 'allure-js-commons';
import { type } from 'os';

test.describe('Negative tests for Free user Registration', () => {
    test('SP11/SP2/1 | Verify non-successful registration of Free user in case of empty name field', async ({
        page,
        request,
        signUpFreePage,
    }) => {
        await description('Verify non-successful registration of Free user in case of empty name field.');
        await tag('Free user');
        await severity(Severity.NORMAL);
        await epic('Registration');

        const newUserData = await generateNewUserData();
        await step('Navigate to Free user registration page.', async () => {
            await page.goto(URL_END_POINTS.signUpFree);
        });
        await signUpFreePage.yourInformation.fillNameInputField('');
        await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);

        await step('Verify the error message', async () => {
            await expect(signUpFreePage.yourInformation.nameError).toHaveText('Required');
        });
        await step('Verify the Create account button is disabled', async () => {
            const buttonDisabled = await signUpFreePage.createAccountBtn.isDisabled();
            expect(buttonDisabled).toBeTruthy();
        });
    });

    negativeEmailsArr.forEach((typeEmailField) => {
        test(`SP11/SP2/2 | Verify non-successful registration of Free user in case of invalid email: ${typeEmailField[0]}`, async ({
            page,
            request,
            signUpFreePage,
        }) => {
            await tag('Free user');
            await severity(Severity.NORMAL);
            await epic('Registration');

            const newUserData = await generateNewUserData();
            await step('Navigate to Free user registration page.', async () => {
                await page.goto(URL_END_POINTS.signUpFree);
            });
            await signUpFreePage.yourInformation.fillNameInputField(newUserData.name);
            await signUpFreePage.yourInformation.fillEmailInputField(typeEmailField[1]);
            await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);

            await step('Verify the error message', async () => {
                await expect(signUpFreePage.yourInformation.emailError).toHaveText(typeEmailField[2]);
            });
            await step('Verify the Create account button is disabled', async () => {
                const buttonDisabled = await signUpFreePage.createAccountBtn.isDisabled();
                expect(buttonDisabled).toBeTruthy();
            });
        });
    });
});
