import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { CREATE_TEMPLATE, TEMPLATES_STATUS, UPLOAD_FILE_PATH, JIRA_LINK, TOAST_MESSAGE } from '../testData.js';
import { description, tags, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Negative tests for Templates Options', () => {
    test('SP27/SP37/1 | Verify user can not create the template with `live` status missing Role Field.', async ({
        createBusinessUserAndLogin,
        signPage,
        templatesPage,
        createNewTemplatePage,
    }) => {
        test.setTimeout(440 * 1000);
        await description(
            'To verify user can not create a new template in the system successfully (with `live` status) when the "Role" field is not filled.'
        );
        await severity(Severity.CRITICAL);
        await epic('Templates');
        await tags('Template');
        await link(`${JIRA_LINK}SP-37`);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);

        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);
        await createNewTemplatePage.clickFillTemplateBtn();

        await step('Verify toast message has text "Document must have at least one signer', async () => {
            await expect(templatesPage.toast.toastBody).toHaveText(TOAST_MESSAGE.templateNoSigner);
        });

        await signPage.sideMenu.clickTemplates();

        await step('Verify created template has "Draft" status.', async () => {
            await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.draft);
        });
    });
});
