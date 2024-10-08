import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { createFolder } from '../helpers/preconditions.js';
import { FOLDER_NAME, JIRA_LINK, TOAST_MESSAGE, FILL_RENAME_FOLDER_NAME, FOLDER_NAME_SECOND } from '../testData';
import { description, tag, tags, severity, Severity, epic, step, link, feature } from 'allure-js-commons';

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
        await epic('Folders');

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
        await tag('Folder to folder', 'Free User');
        await epic('Folders');
        await feature('Free user');
        await link(`${JIRA_LINK}SP-48`, 'Jira task link');

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

    test('SP22/SP46/1 | Verify FREE user is able to move folder to foler.', async ({
        createFreeUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal,
    }) => {
        test.setTimeout(150 * 1000);
        await description('To verify Free user is able to move folder to foler.');
        await severity(Severity.NORMAL);
        await tag('Rename Folder', 'Free User');
        await epic('Folders');
        await feature('Free user');
        await link(`${JIRA_LINK}SP-46`, 'Jira task link');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME_SECOND);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify toast notification about successful folder to folder move is displayed.', async () => {
            await documentsPage.toast.toastBody.waitFor({ state: 'visible' });
            await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
        });

        await step('Verify the chosen folder inside another folder.', async () => {
            await documentsPage.table.openFolder(FOLDER_NAME);
            expect(await documentsPage.table.getTitleFolder()).toEqual(FOLDER_NAME_SECOND);
        });
    });
});
