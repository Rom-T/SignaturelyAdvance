import { documentIdRequest, documentStatusRequest, signInRequest, signUpRequest } from './apiCalls';
import {
    authorize,
    getLinkFromEmail,
    getConfirmCodeFromEmail,
    getMessageTextFromEmail,
    getPasswordFromEmail,
} from '../index.js';
import { step } from 'allure-js-commons';
import { DOCUMENT_STATUS } from '../testData';
import { dbEditDocumentStatus } from './dbUtils.js';

export function generateNumberForNewUser() {
    let dt = new Date();
    const year = dt.getFullYear().toString().slice(-2);
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    const millis = dt.getMilliseconds().toString().padStart(3, '0');

    return `${year}${month}${day}${hh}${mm}${ss}${millis}`;
}

export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateNewUserEmail(addition) {
    let newEmail;
    await step('Generate new user email', async () => {
        newEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${addition}${process.env.EMAIL_DOMAIN}`;
        console.log(`Generated new user Email: ${newEmail.slice(-29)}`);
    });

    return newEmail;
}

export async function generateNewUserData(free = false, workflowVersion = null) {
    let userData;
    await step('Create new user data', async () => {
        let userNumber = generateNumberForNewUser();
        process.env.NEW_USER_NUMBER = userNumber;
        userData = {
            email: `${process.env.EMAIL_PREFIX}${userNumber}${process.env.EMAIL_DOMAIN}`,
            name: `TestUser${userNumber}`,
            password: `QA_tester${userNumber}`,
        };
        process.env.NEW_USER_EMAIL = userData.email;
        process.env.NEW_USER_NAME = userData.name;
        process.env.NEW_USER_PASSWORD = userData.password;

        if (free) {
            userData.free = true;
        }
        if (workflowVersion) {
            userData.workflowVersion = workflowVersion;
        }
    });
    return userData;
}

export async function createNewUserThroughApi(request) {
    const newUserData = await generateNewUserData();
    console.log(`Generated new user #${process.env.NEW_USER_NUMBER}`);

    await signUpRequest(request, newUserData);

    return newUserData;
}

export async function createNewFreeUserThroughApi(request) {
    const newFreeUserData = await generateNewUserData(true, 'a');
    console.log(`Generated new Free user #${process.env.NEW_USER_NUMBER}`);

    await signUpRequest(request, newFreeUserData);

    return newFreeUserData;
}

export async function retrieveUserEmailConfirmationLink(request, newUserEmail, subject) {
    let confirmationLink;
    await step("Retrieve the confirmation link from the user's email.", async () => {
        const auth = await authorize();
        confirmationLink = await getLinkFromEmail(auth, newUserEmail, subject);
    });
    return confirmationLink;
}

export async function retrieveUserEmailConfirmCode(request, newUserEmail) {
    let confirmCode;
    await step("Retrieve the confirm code from the user's email.", async () => {
        const auth = await authorize();
        confirmCode = await getConfirmCodeFromEmail(auth, newUserEmail);
    });
    return confirmCode;
}

export async function retrievePasswordFromEmail(toEmail, subject) {
    return await step('Retrieve the password from the invitation email.', async () => {
        const auth = await authorize();

        return await getPasswordFromEmail(auth, toEmail, subject);
    });
}

export async function retrieveEmailMessage(request, fromName, toEmail, subject, messageCss) {
    const auth = await authorize();

    return await getMessageTextFromEmail(auth, fromName, toEmail, subject, messageCss);
}

export async function clickCanvas(page, canvasLocator, excludedAreas = []) {
    await canvasLocator.first().waitFor({ state: 'visible' });

    const canvasesCount = await canvasLocator.count();
    const largeCanvases = [];

    for (let i = 0; i < canvasesCount; i++) {
        const canvas = await canvasLocator.nth(i);
        const boundingBox = await canvas.boundingBox();

        if (boundingBox && boundingBox.width > 500) {
            largeCanvases.push(canvas);
        }
    }

    if (largeCanvases.length === 0) {
        throw new Error('No suitable large canvas element found');
    }

    const randomIndex = Math.floor(Math.random() * largeCanvases.length);
    const chosenCanvas = largeCanvases[randomIndex];
    const boundingBox = await chosenCanvas.boundingBox();

    const getRandomPosition = (boundingBox, excludedAreas) => {
        let randomX, randomY;

        do {
            randomX = boundingBox.x + Math.random() * boundingBox.width;
            randomY = boundingBox.y + Math.random() * boundingBox.height;
        } while (
            excludedAreas.some(
                (area) =>
                    randomX >= area.left &&
                    randomX <= area.left + area.width &&
                    randomY >= area.top &&
                    randomY <= area.top + area.height
            )
        );

        return { x: randomX, y: randomY };
    };

    const clickPosition = getRandomPosition(boundingBox, excludedAreas);

    await chosenCanvas.click({
        position: { x: clickPosition.x - boundingBox.x, y: clickPosition.y - boundingBox.y },
        force: true,
    });

    const newIndex = excludedAreas.length + 1;
    const elementAfterClick = page.locator('.fieldDropDown').nth(newIndex);

    try {
        await elementAfterClick.waitFor({ state: 'visible', timeout: 5000 });

        const elementBoundingRect = await elementAfterClick.boundingBox();
        if (elementBoundingRect) {
            const newExcludedArea = {
                left: elementBoundingRect.x - boundingBox.x,
                top: elementBoundingRect.y - boundingBox.y,
                width: elementBoundingRect.width,
                height: elementBoundingRect.height,
            };
            excludedAreas.push(newExcludedArea);
        }
    } catch (error) {
        console.log('The new fieldDropDown element will not be found.');
        return 0;
    }

    return clickPosition;
}

export function generateRandomPassword(length) {
    const digits = '0123456789';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = '!$%&_?';

    function getRandomChar(str) {
        return str[Math.floor(Math.random() * str.length)];
    }

    const password = [
        getRandomChar(digits),
        getRandomChar(lowerCaseLetters),
        getRandomChar(upperCaseLetters),
        getRandomChar(specialCharacters),
    ];

    const allCharacters = digits + lowerCaseLetters + upperCaseLetters + specialCharacters;
    while (password.length < length) {
        password.push(getRandomChar(allCharacters));
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

export async function editDocumentStatus(request, documentName, status) {
    await step('Change status of the document to "expired"', async () => {
        try {
            await signInRequest(request);

            const documentId = await documentIdRequest(request, documentName);
            if (!documentId) {
                console.warn('Failed to get document ID.');
            }
            const documentStatus = await documentStatusRequest(request, documentId);
            console.log(`Status of the document with id ${documentId} is ${documentStatus}`);

            await dbEditDocumentStatus(status, documentId);
            const updatedDocumentStatus = await documentStatusRequest(request, documentId);
            if (updatedDocumentStatus !== DOCUMENT_STATUS.expired) {
                console.warn('Failed to edit status of the document');
            }
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    });
}

export function getRandomIndex(list) {
    return Math.floor(Math.random() * list.length);
}

export function getRandomIndexInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}
