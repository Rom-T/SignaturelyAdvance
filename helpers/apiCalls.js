import { API_URL_END_POINTS } from '../apiData';
import { expect } from '@playwright/test';
import { NEGATIVE_EMAIL_DATA_SET, NEGATIVE_PASSWORD_DATA_SET } from '../testData';
import { generateRandomPassword } from './utils';

export async function signUpRequest(request, newUserData) {
    try {
        const response = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signUpEndPoint}`, {
            data: newUserData,
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`User with id #${JSON.stringify(data.userId)} has been successfully created`);
        } else {
            console.error(`Failed to create user: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error during sign-up request:', error);
    }
}

export async function signInRequest(request) {
    try {
        const signInResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signInEndPoint}`, {
            data: {
                email: process.env.NEW_USER_EMAIL,
                password: process.env.NEW_USER_PASSWORD,
            },
        });
        if (!signInResponse.ok()) {
            console.error(`Failed to login: ${signInResponse.statusText()}`);
        }
        const signInData = await signInResponse.json();
        const userId = signInData.user.id;
        console.log('User logged in successfully with id ' + userId);
    } catch (error) {
        console.error(`An error occurred during login: ${error.message}`);
    }
}

export async function documentIdRequest(request, documentName) {
    try {
        const getDocumentsResponse = await request.get(
            `${process.env.API_URL}${API_URL_END_POINTS.getDocumentsEndPoint}`
        );
        if (!getDocumentsResponse.ok) {
            console.warn(`Failed to find documents: ${getDocumentsResponse.statusText()}`);
            return null;
        }
        const documentsResponseData = await getDocumentsResponse.json();
        const documentDataArray = documentsResponseData.items;

        if (!documentDataArray || documentDataArray.length === 0) {
            console.log('No documents found.');
            return null;
        }
        const document = documentDataArray.find((doc) => doc.title === documentName);
        if (!document) {
            console.warn(`Document with name ${documentName} not found.`);
            return null;
        }
        const documentId = document.id;
        console.log(`Retrieved document id ${documentId}`);

        return documentId;
    } catch (error) {
        console.error(`An error occurred while fetching documents: ${error.message}`);
        return null;
    }
}

export async function documentStatusRequest(request, documentId) {
    try {
        const getDocumentResponse = await request.get(
            `${process.env.API_URL}${API_URL_END_POINTS.getDocumentByIdEndPoint}${documentId}`
        );
        if (!getDocumentResponse.ok()) {
            console.warn(`Failed to find document with id ${documentId}: ${getDocumentResponse.statusText()}`);
            return null;
        }
        const documentResponseData = await getDocumentResponse.json();

        return documentResponseData.status;
    } catch (error) {
        console.error(`An error occurred while fetching document: ${error.message}`);
    }
}

export async function createFolderRequest(request, folderName) {
    try {
        const createFolderResponse = await request.post(
            `${process.env.API_URL}${API_URL_END_POINTS.createFolderEndPoint}`,
            {
                data: {
                    title: folderName,
                    type: 'document',
                },
            }
        );
        if (createFolderResponse.ok()) {
            console.log(`Folder "${folderName}" has been successfully created`);
            return createFolderResponse;
        } else {
            console.error(`Failed to create a new folder: ${createFolderResponse.statusText}`);
        }
    } catch (error) {
        console.error('Error during "create a folder" request:', error);
    }
}

export async function updatePasswordRequest(request, newPassword) {
    try {
        const updatePasswordResponse = await request.patch(
            `${process.env.API_URL}${API_URL_END_POINTS.userProfileEndPoint}`,
            {
                data: {
                    password: newPassword,
                    passwordConfirmation: newPassword,
                },
            }
        );
        if (updatePasswordResponse.ok()) {
            console.log(`Password has been successfully updated`);
            return updatePasswordResponse;
        } else {
            console.error(`Failed to create a new folder: ${updatePasswordResponse.statusText}`);
        }
    } catch (error) {
        console.error('Error during "create a folder" request:', error);
    }
}

export async function addTeamMemberRequest(request, teamMemberData) {
    let addTeamMemberResponse;
    let attempt = 0;
    let maxRetries = 3;
    while (attempt < maxRetries) {
        attempt++;
        addTeamMemberResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.addTeamMember}`, {
            data: {
                members: [teamMemberData],
            },
        });
        if (addTeamMemberResponse.ok()) {
            console.log(`Team member with role '${teamMemberData.role}' has been added`);
            return addTeamMemberResponse;
        }
        if (attempt === maxRetries) {
            throw new Error(
                `Failed to proceed Add Team Member request after ${maxRetries} attempts: ${addTeamMemberResponse.status()}`
            );
        }
        console.error(
            `Attempt ${attempt} failed: ${addTeamMemberResponse.status()} - ${await addTeamMemberResponse.text()}. Retrying...`
        );
    }
}

export async function getUserIdByCredentials(request, userEmail, userPassword) {
    try {
        const signInResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signInEndPoint}`, {
            data: {
                email: userEmail,
                password: userPassword,
            },
        });
        if (!signInResponse.ok()) {
            console.error(`Failed to login: ${signInResponse.statusText()}`);
        }
        const signInData = await signInResponse.json();
        const userId = signInData.user.id;
        console.log('User logged in successfully with id ' + userId);
        return userId;
    } catch (error) {
        console.error(`An error occurred during login: ${error.message}`);
    }
}

export async function upgradeTeamMemberRoleRequest(request, teamMemberData, teamMemberID) {
    let addTeamMemberResponse;
    let attempt = 0;
    let maxRetries = 3;
    while (attempt < maxRetries) {
        attempt++;
        addTeamMemberResponse = await request.post(
            `${process.env.API_URL}${API_URL_END_POINTS.upgradeTeamMemberRole(teamMemberID)}`,
            {
                data: {
                    email: teamMemberData.email,
                    id: teamMemberID,
                    name: teamMemberData.name,
                    role: teamMemberData.role,
                },
            }
        );
        if (addTeamMemberResponse.ok()) {
            console.log(`Team member with id ${teamMemberID} has been upgraded to "Admin"`);
            return addTeamMemberResponse;
        }
        if (attempt === maxRetries) {
            throw new Error(
                `Failed to proceed Team Member Upgrade request after ${maxRetries} attempts: ${addTeamMemberResponse.status()}`
            );
        }
        console.error(
            `Attempt ${attempt} failed: ${addTeamMemberResponse.status()} - ${await addTeamMemberResponse.text()}. Retrying...`
        );
    }
}

export async function signInBusinessUserApi(request) {
    try {
        const getSignInResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signInEndPoint}`, {
            data: {
                email: process.env.USER_EMAIL,
                password: '***',
            },
        });
        expect(getSignInResponse.ok()).toBeTruthy();

        return getSignInResponse;
    } catch (error) {
        console.error(`An error occurred during login: ${error.message}`);
    }
}

export async function healthRequest(request) {
    try {
        const response = await request.get(`${process.env.API_URL}${API_URL_END_POINTS.healthEndPoint}`);

        if (response.ok()) {
            return response;
        } else {
            console.error(`Request failed with status: ${response.status()}`);
            return null;
        }
    } catch (error) {
        console.error(`Error during API request: ${error}`);
        return null;
    }
}

export async function signInNegativePasswordApi(request) {
    try {
        const invalidPassword = generateRandomPassword();
        const getSignInResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signInEndPoint}`, {
            data: {
                email: process.env.USER_EMAIL,
                password: invalidPassword,
            },
        });
        return getSignInResponse;
    } catch (error) {
        console.error(`An error occurred during login: ${error.message}`);
    }
}

export async function signInNegativeLoginApi(request) {
    try {
        const invalidLogin = generateRandomPassword();
        const getSignInResponse = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signInEndPoint}`, {
            data: {
                email: invalidLogin,
                password: process.env.NEW_USER_PASSWORD,
            },
        });

        return getSignInResponse;
    } catch (error) {
        console.error(`An error occurred during login: ${error.message}`);
    }
}
