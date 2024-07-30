import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { createFolder } from '../helpers/preconditions.js';
import { signInRequest, createFolderRequest } from '../helpers/apiCalls';
import { FOLDER_NAME, JIRA_LINK, TOAST_MESSAGE } from '../testData';
import { description, tag, tags, severity, Severity, epic, step, link, feature } from 'allure-js-commons';

test.describe('Folder API', () => {
    test(`SP22/SP33/API1 | Verify if a new folder has been created via API`, async ({
        createFreeUserAndLogin,
        request,
        signPage,
        documentsPage,
    }) => {
        await description('Verify if a new folder has been created via API');
        await severity(Severity.NORMAL);
        await epic('Folders');
        await tag('API');
        await link(`${JIRA_LINK}SP-33`, 'Jira task link');

        await signInRequest(request);
        const response = await createFolderRequest(request, FOLDER_NAME);

        await step('Verify response code for a folder creation request is successful.', async () => {
            expect(response.status()).toBe(201);
        });

        await signPage.sideMenu.clickDocuments();

        await step('Verify new folder has been saved.', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(FOLDER_NAME);
        });
    });
});

test.describe('Folders in case of FREE User', () => {
    test('SP22/SP42/1 | Verify FREE user is able to create folder', async ({
        createFreeUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(120 * 1000);
        await description('To verify Free user is able to create folder.');
        await severity(Severity.NORMAL);
        await link(`${JIRA_LINK}SP-42`, 'Jira task link');
        await tags('Create folder', 'Free User');
        await epic('Folder');

        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(FOLDER_NAME);
        await createFolderModal.clickCreateBtn();
        await step(
            'Verify toast notification with "Folder created successfully" text appears after creating a folder.',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderCreated);
            }
        );

        await step('Verify new folder has been saved.', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(FOLDER_NAME);
        });
    });
    test('SP22/SP47/1 | Verify FREE user is able to delete folder', async ({
        createFreeUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        confirmDeletionModal,
    }) => {
        await description('To verify Free user is able to delete the folder.');
        await severity(Severity.NORMAL);
        await tags('Delete a folder', 'Free user');
        await epic('Folders');
        await feature('Free user');
        await link(`${JIRA_LINK}SP-47`, 'Jira task link');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickDeleteBtn();
        await confirmDeletionModal.clickYesDelete();

        await step(
            'Verify toast notification with "Folder deleted successfully" text appears after deleting folder.',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted);
            }
        );
    });
    test('SP22/SP46/1 | Verify FREE user is able to rename folder.', async ({
        createFreeUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(150 * 1000);
        await description('To verify Free user is able to rename folder.');
        await severity(Severity.NORMAL);
        await tag('Rename Folder', 'Free User');
        await epic('Folders');
        await feature('Free user');
        await link(`${JIRA_LINK}SP-2`, 'Jira task link');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickRenameBtn();
        await documentsPage.table.fillInputNameField(FILL_RENAME_FOLDER_NAME);
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderRename);

        await step('Verify new value has been saved.', async () => {
            expect(await documentsPage.table.getTitleFolder()).toBe(FILL_RENAME_FOLDER_NAME);
        });
    });
});
