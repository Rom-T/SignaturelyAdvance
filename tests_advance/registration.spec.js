import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import {
    URL_END_POINTS,
} from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { description, tag, severity, Severity, epic, step } from 'allure-js-commons';

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
        await signUpFreePage.yourInformation.fillNameInputField("");
        
        expect (await signUpFreePage.yourInformation.nameError).toHaveText('Required');
        await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);

        await step('Verify the error message', async () => {
        expect (await signUpFreePage.yourInformation.nameError).toHaveText('Required');
        });        

        await step('Verify the Create account button is disabled', async () => {       
        const buttonDisabled = await signUpFreePage.createAccountBtn.isDisabled();
        expect (buttonDisabled).toBeTruthy();
        expect (await signUpFreePage.yourInformation.nameError).toHaveText('Required');
        }); 
    })
})