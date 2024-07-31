import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    CREATE_TEMPLATE,
    TEMPLATES_STATUS,
    UPLOAD_FILE_PATH,
    JIRA_LINK,
    TOAST_MESSAGE,
    TITLE_OF_PREPARE_FOR_SIGNATURE_MODAL,
} from '../testData.js';
import { description, tags, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Negative tests for Templates Options', () => {
    test('SP27/SP37/1 | Verify if user can not create the template with `live` status missing Role Field.', async ({
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
        await tags('Create a template', 'Negative');
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

        await step('Verify click FillTemplateBtn does not open `Prepare for Signature` Modal Window.', async () => {
            await expect(createNewTemplatePage.page).not.toHaveTitle(TITLE_OF_PREPARE_FOR_SIGNATURE_MODAL);
        });

        await signPage.sideMenu.clickTemplates();

        await step('Verify created template has "Draft" status.', async () => {
            await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.draft);
        });
    });

    test('SP27/SP52/1 | Verify if user can not create the template with `live` status missing Uploded File.', async ({
        createBusinessUserAndLogin,
        signPage,
        templatesPage,
        createNewTemplatePage,
    }) => {
        test.setTimeout(440 * 1000);
        await description(
            'To verify user can not create a new template in the system successfully (with `live` status) when the "File" has not been uploaded.'
        );
        await severity(Severity.CRITICAL);
        await epic('Templates');
        await tags('Create a template', 'Negative');
        await link(`${JIRA_LINK}SP-52`);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);

        await step('Verify "Fill Template" button should be disabled', async () => {
            await expect(createNewTemplatePage.fillTemplateBtn).toBeDisabled();
        });

        await step('Verify user is still on Create Template page in certain condition.', async () => {
            await expect(createNewTemplatePage.createTemplatePageHeader).toBeVisible();
        });
    });
});

test.describe('Templates in case of FREE User', () => {
    test('TC_07_27_01 | Verify Free user is unable to create the template.', async ({
        createFreeUserAndLogin,
        signPage,
        templatesPage,
        createNewTemplatePage,
    }) => {
        test.setTimeout(440 * 1000);
        await description(
            'To verify Free user is unable to create a template. The user is prompted to upgrade after attempting to upload a file.'
        );
        await severity(Severity.NORMAL);
        await epic('Templates');
        await tags('Create a template', 'Free User', 'Negative');
        await link(`${JIRA_LINK}SP-43`);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);

        await step('Verify the toast message Upgrade to Personal plan appears.', async () => {
            await expect(createNewTemplatePage.toast.toastBody).toHaveText(TOAST_MESSAGE.upgradeYourPlan);
        });
    });
});
