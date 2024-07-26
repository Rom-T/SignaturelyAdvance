import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { NEGATIVE_EMAIL_DATA_SET, NEGATIVE_PASSWORD_DATA_SET, URL_END_POINTS, CARD_DETAILS } from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { description, tags, severity, Severity, epic, step } from 'allure-js-commons';
import { signUpTrialUserWithoutPayment } from '../helpers/preconditions';

test.describe('Negative tests for Free user Registration', () => {
    test('SP11/SP2/1 | Verify non-successful registration of Free user in case of empty name field', async ({
        page,
        signUpFreePage,
    }) => {
        await description('Verify non-successful registration of Free user in case of empty name field.');
        await tags('Free user', 'Negative');
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

    NEGATIVE_EMAIL_DATA_SET.forEach((typeEmailField) => {
        test(`SP11/SP2/2 | Verify non-successful registration of Free user in case of invalid email: ${typeEmailField[0]}`, async ({
            page,
            signUpFreePage,
        }) => {
            await description('Verify non-successful registration of Free user in case of invalid email');
            await tags('Free user', 'Negative');
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

    NEGATIVE_PASSWORD_DATA_SET.forEach((typePasswordField) => {
        test(`SP11/SP2/3 | Verify non-successful registration of Free user in case of invalid password: ${typePasswordField[0]}`, async ({
            page,
            signUpFreePage,
        }) => {
            await description('Verify non-successful registration of Free user in case of invalid password');
            await tags('Free user', 'Negative');
            await severity(Severity.NORMAL);
            await epic('Registration');

            const newUserData = await generateNewUserData();
            await step('Navigate to Free user registration page.', async () => {
                await page.goto(URL_END_POINTS.signUpFree);
            });

            await signUpFreePage.yourInformation.fillNameInputField(newUserData.name);
            await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
            await signUpFreePage.yourInformation.fillPasswordInputField(typePasswordField[1]);
            await page.keyboard.press('Tab');

            await step('Verify the error message', async () => {
                await expect(signUpFreePage.yourInformation.passwordError).toHaveText(typePasswordField[2]);
            });
            await step('Verify the Create account button is disabled', async () => {
                const buttonDisabled = await signUpFreePage.createAccountBtn.isDisabled();
                expect(buttonDisabled).toBeTruthy();
            });
        });
    });
});

test.describe('Negative tests for Trial user regisctration', () => {
    test('SP11/SP1/1 | Verify user cannot activate Trial period adding only name on Credit Card', async ({
        page,
        request,
        signUpTrialPage,
        activateTrialStripePage,
    }) => {
        await description('Verify user cannot activate Trial period adding only name on Credit Card');
        await tags('Trial user', 'Negative');
        await severity(Severity.NORMAL);
        await epic('Negative registration');

        await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
        await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
        await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

        await step('Verify "Required" sign is popup under the "Billing Zip Code" sign', async () => {
            await expect(activateTrialStripePage.cardDetails.zipError).toHaveText('Required');
        });
    });

    test('SP11/SP/2 | Verify user cannot activate Trial period without adding Zip Code', async ({
        page,
        request,
        signUpTrialPage,
        activateTrialStripePage,
    }) => {
        await description('Verify user cannot activate Trial period without adding Zip Code');
        await tags('Trial user', 'Negative');
        await severity(Severity.NORMAL);
        await epic('Negative registration');

        await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
        await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
        await activateTrialStripePage.cardDetails.fillCardNumberField(CARD_DETAILS.VISA.cardNumber);
        await activateTrialStripePage.cardDetails.fillExpirationDateField(CARD_DETAILS.VISA.expirationDate);
        await activateTrialStripePage.cardDetails.fillCvvField(CARD_DETAILS.VISA.cvc);

        await expect(activateTrialStripePage.cardDetails.zipField).not.toHaveCSS(
            'background-color',
            ERROR_WARNING_BACKGROUND_COLOR
        );
        await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

        await step('Verify "Required" sign is popup under the "Billing Zip Code" sign', async () => {
            await expect(activateTrialStripePage.cardDetails.zipError).toHaveText('Required');
        });

        await step('Verify the empty Zip Code field becomes a pink background color to warn the user ', async () => {
            await expect(activateTrialStripePage.cardDetails.zipField).toHaveCSS(
                'background-color',
                ERROR_WARNING_BACKGROUND_COLOR
            );
        });
    });
});