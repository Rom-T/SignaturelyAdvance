import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { retrieveUserEmailConfirmationLink, retrieveUserEmailConfirmCode } from '../helpers/utils';
import {
    URL_END_POINTS,
    BUSINESS_MONTHLY_PLAN,
    CARD_DETAILS,
    FREE_PLAN_DESCRIPTION,
    SUBSCRIPTIONS,
    SUBSCRIBE_TO_PERSONAL_PLAN,
    SUBSCRIBE_TO_BUSINESS_PLAN,
    PLEASE_ENTER_CONFIRMATION_CODE,
    PERSONAL_PLAN_DESCRIPTION,
    BUSINESS_PLAN_DESCRIPTION,
    NO_ATTACHED_CARD,
    EMAIL_SUBJECTS,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

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
        await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);

        expect (await signUpFreePage.yourInformation.nameError).toHaveText('Required');

        const buttonDisabled = await signUpFreePage.createAccountBtn.isDisabled();
        expect (buttonDisabled).toBeTruthy();
    })
})