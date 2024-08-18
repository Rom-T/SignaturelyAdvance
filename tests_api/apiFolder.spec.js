import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { signInRequest, createFolderRequest } from '../helpers/apiCalls';
import { FOLDER_NAME, JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, link, feature } from 'allure-js-commons';

test.describe('Folder API', () => {
    test(`SP22/SP33/1 | Verify if a new folder has been created via API`, async ({
        createFreeUserAndLogin,
        request,
        signPage,
        documentsPage,
    }) => {
        await description('Verify if a new folder has been created via API');
        await severity(Severity.NORMAL);
        await epic('Folders');
        await feature('Folders');
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
