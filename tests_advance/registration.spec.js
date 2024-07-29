import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import {
    NEGATIVE_EMAIL_DATA_SET,
    NEGATIVE_PASSWORD_DATA_SET,
    URL_END_POINTS,
    CARD_DETAILS,
    SUBSCRIPTIONS,
    NEGATIVE_BUSINESS_USER_REGISTRATION,
    ERROR_WARNING_BACKGROUND_COLOR,
    JIRA_LINK,
    SUBSCRIBE_TO_BUSINESS_PLAN,
    INVALID_CARD_NUMBER,
    ERROR_TEXT_COLOR,
    NEGATIVE_CONFIRM_CODE,
    PLEASE_ENTER_CONFIRMATION_CODE,
    TOAST_MESSAGE,
    INVALID_CARD_EXPIRATION_DATE,
    INVALID_CVV,
} from '../testData';
import { generateNewUserData, retrieveUserEmailConfirmCode } from '../helpers/utils';
import { description, tags, severity, Severity, epic, step, tag, link, feature } from 'allure-js-commons';
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
        await feature('Free user');
        await link(`${JIRA_LINK}SP-2`, 'Jira task link');

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
            await feature('Free user');
            await link(`${JIRA_LINK}SP-2`, 'Jira task link');

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
            await feature('Free user');
            await link(`${JIRA_LINK}SP-2`, 'Jira task link');

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

test.describe('Negative tests for Trial user Registration', () => {
    test('SP11/SP1/1 | Verify user cannot activate Trial period adding only name on Credit Card', async ({
        page,
        request,
        signUpTrialPage,
        activateTrialStripePage,
    }) => {
        await description('Verify user cannot activate Trial period adding only name on Credit Card');
        await tags('Trial user', 'Negative');
        await severity(Severity.BLOCKER);
        await epic('Registration');
        await feature('Trial user');

        await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
        await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
        await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

        await step('Verify "Required" sign is popup under the "Billing Zip Code" sign', async () => {
            await expect(activateTrialStripePage.cardDetails.zipError).toHaveText('Required');
        });
    });

    test('SP11/SP1/2 | Verify user cannot activate Trial period without adding Zip Code', async ({
        page,
        request,
        signUpTrialPage,
        activateTrialStripePage,
    }) => {
        await description('Verify user cannot activate Trial period without adding Zip Code');
        await tags('Trial user', 'Negative');
        await severity(Severity.BLOCKER);
        await epic('Registration');
        await feature('Trial user');
        await link(`${JIRA_LINK}?selectedIssue=SP-1`);

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

    INVALID_CARD_NUMBER.forEach(({ problem, cardNumber, toastErrorMessage }) => {
        test(`SP11/SP1/3 | Verify user cannot activate Trial period with ${problem}`, async ({
            page,
            request,
            signUpTrialPage,
            activateTrialStripePage,
        }) => {
            await description('Verify user cannot activate Trial period with invalid card number');
            await tags('Trial user', 'Negative');
            await severity(Severity.BLOCKER);
            await epic('Registration');
            await feature('Trial user');
            await link(`${JIRA_LINK}?selectedIssue=SP-1`);

            await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
            await activateTrialStripePage.toast.waitForToastCompleted();

            await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
            await activateTrialStripePage.cardDetails.fillCardNumberField(cardNumber);
            await activateTrialStripePage.cardDetails.fillExpirationDateField(CARD_DETAILS.VISA.expirationDate);
            await activateTrialStripePage.cardDetails.fillCvvField(CARD_DETAILS.VISA.cvc);
            await activateTrialStripePage.cardDetails.fillZipField(CARD_DETAILS.VISA.zip);
            await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

            await activateTrialStripePage.toast.toastBody.waitFor({ state: 'visible' });

            await step(`Verify toast with Error message ${toastErrorMessage}`, async () => {
                await expect(activateTrialStripePage.toast.toastBody).toHaveText(toastErrorMessage);
            });

            await step('Verify card number has warning red color', async () => {
                await expect(activateTrialStripePage.cardDetails.cardNumberField).toHaveCSS('color', ERROR_TEXT_COLOR);
            });
        });
    });

    INVALID_CARD_EXPIRATION_DATE.forEach(({ problem, expirationDate, toastErrorMessage }) => {
        test(`SP11/SP1/4 | Verify user cannot activate Trial period with ${problem}`, async ({
            page,
            request,
            signUpTrialPage,
            activateTrialStripePage,
        }) => {
            await description('Verify user cannot activate Trial period with invalid card number');
            await tags('Trial user', 'Negative');
            await severity(Severity.BLOCKER);
            await epic('Registration');
            await feature('Trial user');
            await link(`${JIRA_LINK}?selectedIssue=SP-1`);

            await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
            await activateTrialStripePage.toast.waitForToastCompleted();

            await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
            await activateTrialStripePage.cardDetails.fillCardNumberField(CARD_DETAILS.VISA.cardNumber);
            await activateTrialStripePage.cardDetails.fillExpirationDateField(expirationDate);
            await activateTrialStripePage.cardDetails.fillCvvField(CARD_DETAILS.VISA.cvc);
            await activateTrialStripePage.cardDetails.fillZipField(CARD_DETAILS.VISA.zip);
            await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

            await activateTrialStripePage.toast.toastBody.waitFor({ state: 'visible' });

            await step(`Verify toast with Error message ${toastErrorMessage}`, async () => {
                await expect(activateTrialStripePage.toast.toastBody).toHaveText(toastErrorMessage);
            });

            await step('Verify card number has warning red color', async () => {
                await expect(activateTrialStripePage.cardDetails.expirationDateField).toHaveCSS(
                    'color',
                    ERROR_TEXT_COLOR
                );
            });
        });
    });

    INVALID_CVV.forEach(({ problem, cvv, toastErrorMessage }) => {
        test(`SP11/SP1/5 | Verify user cannot activate Trial period with ${problem}`, async ({
            page,
            request,
            signUpTrialPage,
            activateTrialStripePage,
        }) => {
            await description('Verify user cannot activate Trial period without CVV');
            await tags('Trial user', 'Negative');
            await severity(Severity.BLOCKER);
            await epic('Registration');
            await feature('Trial user');
            await link(`${JIRA_LINK}?selectedIssue=SP-1`);

            await signUpTrialUserWithoutPayment(page, request, signUpTrialPage);
            await activateTrialStripePage.toast.waitForToastCompleted();

            await activateTrialStripePage.cardDetails.fillCardholderNameField(CARD_DETAILS.VISA.fullNameOnCard);
            await activateTrialStripePage.cardDetails.fillCardNumberField(CARD_DETAILS.VISA.cardNumber);
            await activateTrialStripePage.cardDetails.fillExpirationDateField(CARD_DETAILS.VISA.expirationDate);
            await activateTrialStripePage.cardDetails.fillCvvField(cvv);
            await activateTrialStripePage.cardDetails.fillZipField(CARD_DETAILS.VISA.zip);
            await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();

            await step(`Verify toast with Error message ${toastErrorMessage}`, async () => {
                await expect(activateTrialStripePage.toast.toastBody).toHaveText(toastErrorMessage);
            });

            await step('Verify CVV has warning red color', async () => {
                await expect(activateTrialStripePage.cardDetails.cvvField).toHaveCSS('color', ERROR_TEXT_COLOR);
            });
        });
    });
});

test.describe('Negative tests for Business user Registration', () => {
    NEGATIVE_BUSINESS_USER_REGISTRATION.forEach(({ desc, field, value, expectedError }) => {
        test(`SP11/SP6/01 | Verify non-successful registration of Business user in case of ${desc}`, async ({
            page,
            signUpBusinessPage,
        }) => {
            await description(`To verify Business user can not register in case of ${desc}.`);
            await tag('Business user');
            await severity(Severity.BLOCKER);
            await epic('Registration');
            await feature('Business user');
            await link(`${JIRA_LINK}?selectedIssue=SP-6`);

            const newUserData = await generateNewUserData();

            await step('Navigate to Business user registration page', async () => {
                await page.goto(URL_END_POINTS.signUpBusinessEndPoint);
            });
            await step('Verify Business user registration page title', async () => {
                await expect(signUpBusinessPage.businessPageLabelTitle).toHaveText(SUBSCRIBE_TO_BUSINESS_PLAN);
            });

            await signUpBusinessPage.yourInformation.fillNameInputField(newUserData.name);
            await signUpBusinessPage.yourInformation.fillEmailInputField(newUserData.email);
            await signUpBusinessPage.yourInformation.fillPasswordInputField(newUserData.password);
            await signUpBusinessPage.clickSubscriptionButton(SUBSCRIPTIONS[1]);

            let cardDetails = { ...CARD_DETAILS.INVALID };
            if (field === 'cardholderNameField') {
                cardDetails.fullNameOnCard = value;
            } else if (field === 'zipField') {
                cardDetails.zip = value;
            }

            await signUpBusinessPage.cardDetails.fillData(cardDetails);
            await page.keyboard.press('Tab');

            await step(`Verify error message is ${expectedError}`, async () => {
                await expect(signUpBusinessPage.cardDetails.requiredFieldCardError).toHaveText(expectedError);
            });
        });
    });

    NEGATIVE_CONFIRM_CODE.forEach(({ desc, value }) => {
        test(`SP11/SP6/02 | Verify non-successful registration of Business user in case of ${desc}`, async ({
            request,
            page,
            signUpBusinessPage,
            confirmCodeModal,
        }) => {
            await description(
                `To verify Business user can not register because "Send" button is disabled in case of ${desc}.`
            );
            await tag('Business user');
            await severity(Severity.BLOCKER);
            await epic('Registration');
            await feature('Business user');
            await link(`${JIRA_LINK}?selectedIssue=SP-6`);

            const newUserData = await generateNewUserData();

            await step('Navigate to Business user registration page', async () => {
                await page.goto(URL_END_POINTS.signUpBusinessEndPoint);
            });
            await step('Verify Business user registration page title', async () => {
                await expect(signUpBusinessPage.businessPageLabelTitle).toHaveText(SUBSCRIBE_TO_BUSINESS_PLAN);
            });

            await signUpBusinessPage.yourInformation.fillNameInputField(newUserData.name);
            await signUpBusinessPage.yourInformation.fillEmailInputField(newUserData.email);
            await signUpBusinessPage.yourInformation.fillPasswordInputField(newUserData.password);
            await signUpBusinessPage.clickSubscriptionButton(SUBSCRIPTIONS[1]);
            await signUpBusinessPage.cardDetails.fillData(CARD_DETAILS.VISA);
            await signUpBusinessPage.clickPurchaseNowButton();

            await step('Verify Confirm modal title', async () => {
                await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);
            });
            let confirmCode;

            if (desc === 'Empty Confirm Code field' || desc === 'Invalid Confirm Code') {
                confirmCode = value;
            } else if (desc === 'leading space in Confirm Code') {
                confirmCode = ' ' + (await retrieveUserEmailConfirmCode(request, newUserData.email));
            } else if (desc === 'trailing space in Confirm Code') {
                confirmCode = (await retrieveUserEmailConfirmCode(request, newUserData.email)) + ' ';
            }
            await confirmCodeModal.fillConfirmCodeInputField(confirmCode);

            await step('Verify the "Send" button is disabled', async () => {
                const confirmCodeButtonDisabled = await confirmCodeModal.sendButton.isDisabled();
                expect(confirmCodeButtonDisabled).toBeTruthy();
            });
        });
    });

    test(`SP11/SP6/03 | Verify non-successful registration of Business user in case of expired Confirm Code`, async ({
        request,
        page,
        signUpBusinessPage,
        confirmCodeModal,
    }) => {
        await description(`To verify Business user can not register in case of expired Confirm Code.`);
        await tag('Business user');
        await severity(Severity.BLOCKER);
        await epic('Registration');
        await feature('Business user');
        await link(`${JIRA_LINK}?selectedIssue=SP-6`);

        const newUserData = await generateNewUserData();

        await step('Navigate to Business user registration page', async () => {
            await page.goto(URL_END_POINTS.signUpBusinessEndPoint);
        });
        await step('Verify Business user registration page title', async () => {
            await expect(signUpBusinessPage.businessPageLabelTitle).toHaveText(SUBSCRIBE_TO_BUSINESS_PLAN);
        });

        await signUpBusinessPage.yourInformation.fillNameInputField(newUserData.name);
        await signUpBusinessPage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpBusinessPage.yourInformation.fillPasswordInputField(newUserData.password);
        await signUpBusinessPage.clickSubscriptionButton(SUBSCRIPTIONS[1]);
        await signUpBusinessPage.cardDetails.fillData(CARD_DETAILS.VISA);
        await signUpBusinessPage.clickPurchaseNowButton();

        await step('Verify Confirm modal title', async () => {
            await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);
        });

        const firstConfirmCode = await retrieveUserEmailConfirmCode(request, newUserData.email);
        await confirmCodeModal.clickResendButton();
        const SecondConfirmCode = await retrieveUserEmailConfirmCode(request, newUserData.email);

        await step('Verify the last Confirm Code is not equal to the first one', async () => {
            expect(firstConfirmCode).not.toMatch(SecondConfirmCode);
        });

        await confirmCodeModal.fillConfirmCodeInputField(firstConfirmCode);
        await confirmCodeModal.clickSendButtonAndStay();

        await step('Wait toast appears', async () => {
            await confirmCodeModal.toast.toastBody.waitFor();
        });
        await step('Verify toast message Confirm code is not valid.', async () => {
            await expect(confirmCodeModal.toast.toastBody).toHaveText(TOAST_MESSAGE.invalidConfirmCode);
        });

        await step('Verify the Confirm modal title, which indicates that the Confirm modal is still open', async () => {
            await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);
        });
    });

    
});
