test.describe('Negative tests for Registration', () => {
    test('TC_01_02_01 | Verify non-successful registration of Free user in case of empty name field', async ({
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