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

        await step('Verify click FillTemplateBtn does not open `Prepare for Signature` Modal Window.', async () => {
            await expect(createNewTemplatePage.page).not.toHaveTitle(TITLE_OF_PREPARE_FOR_SIGNATURE_MODAL);
        });

        await signPage.sideMenu.clickTemplates();

        await step('Verify created template has "Draft" status.', async () => {
            await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.draft);
        });
    });
});

test.describe('Templates in case of FREE User', () => {
    test('TC_07_27_01 | Verify Free user can create the template.', async ({
        createFreeUserAndLogin,
        signPage,
        prepareForSignatureModal,
        templatesPage,
        createNewTemplatePage,
        successModal,
    }) => {
        test.setTimeout(440 * 1000);
        await description(
            'To verify Free user can create a new template in the system successfully. This includes ensuring that all required fields are completed correctly, the template is saved, and it is accessible for future use.'
        );
        await severity(Severity.CRITICAL);
        await epic('Templates');
        await tags('Create a template');

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);

        await step('Verify the toast message "Document successfully saved!"', async () => {

            await expect(locator('div').filter({ hasText: 'Upgrade to Personal plan' }).nth(3))
        });

                 //   await expect(await templatesPage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.success);
   //     await step('Verify the upgrade plan message', async () => {
    //        await expect(settingsProfilePage.passwordError).toHaveText(typePasswordField[2]);
  //      });
      //  await expect(await createNewTemplatePage.TOAST_MESSAGE.upgradeYourPlan);
             //   createNewTemplatePage.toast.toastBody.first())         
             //   toHaveText(TOAST_MESSAGE.upgradeYourPlan);
     //   await createNewTemplatePage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);
        // await createNewTemplatePage.clickFillTemplateBtn();
        // await prepareForSignatureModal.clickSignOnFieldsMenu();
        // await prepareForSignatureModal.clickDocumentBody();
        // await prepareForSignatureModal.clickCreateBtn();
    //     await successModal.clickBackToTemplatesBtn();

    //     await step('Verify created template has "Live" status.', async () => {
    //         await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);
    //     });
     });
})
