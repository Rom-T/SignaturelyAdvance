import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { FORM_NAME, JIRA_LINK, URL_END_POINTS } from '../testData.js';
import { description, tag, severity, Severity, link, epic, step, tags, feature } from 'allure-js-commons';
import { createFormRequest, deleteFormRequest, updateFormRequest } from '../helpers/apiCalls.js';

test.describe('Forms via API', () => {
    test('SP24/SP54/1 | Form draft creation via API', async ({
        createBusinessUserAndLogin,
        signPage,
        formsPage,
        request,
    }) => {
        await description('To verify successful form creation via API call.');
        await severity(Severity.CRITICAL);
        await epic('Forms');
        await feature('API');
        await tags('Business user', 'API');
        await link(`${JIRA_LINK}SP-54`, 'Jira task link');

        const response = await createFormRequest(request);

        await step('Verify response code for a form creation request is successful.', async () => {
            expect(response.status()).toBe(201);
        });

        await signPage.sideMenu.clickForms();

        await step('Verify the name of the form is in the list of forms.', async () => {
            await expect(formsPage.table.formTitleList).toHaveText(FORM_NAME);
        });
    });

    test('SP24/SP68/1 | Removing Form Draft via API', async ({ createBusinessUserAndLogin, formsPage, request }) => {
        await description('To verify successful form creation via API call.');
        await severity(Severity.NORMAL);
        await epic('Forms');
        await feature('API');
        await tags('Business user', 'API');
        await link(`${JIRA_LINK}SP-68`, 'Jira task link');

        const response = await createFormRequest(request);
        const body = await response.json();
        const idDoc = body.id;
        const idUser = body.userId;
        await deleteFormRequest(request, idDoc, idUser);

        await step('Verify number of forms in the table is 0.', async () => {
            await expect(await formsPage.table.formsList).toHaveCount(0);
        });
    });

    test('SP24/SP69/1 | Form draft update via API', async ({ createBusinessUserAndLogin, request }) => {
        await description('To verify successful form update via API call - change only message in the json file.');
        await severity(Severity.NORMAL);
        await epic('Forms');
        await feature('API');
        await tags('Business user', 'API');
        await link(`${JIRA_LINK}SP-69`, 'Jira task link');

        const responseBeforeUpdate = await createFormRequest(request);

        const bodyBeforeUpdate = await responseBeforeUpdate.json();
        const idDoc = bodyBeforeUpdate.id;
        const messageBeforeUpdate = bodyBeforeUpdate.message;

        const responseAfterUpdate = await updateFormRequest(request, idDoc);

        const bodyAfterUpdate = await responseAfterUpdate.json();
        const messageAfterUpdate = bodyAfterUpdate.message;

        expect(messageBeforeUpdate).not.toBe(messageAfterUpdate);

        await step('Verify that message is updated', async () => {
            expect(messageAfterUpdate).toBe(idDoc);
        });

        const fieldsBeforeUpdate = {
            documentId: bodyBeforeUpdate.documentId,
            id: bodyBeforeUpdate.id,
            title: bodyBeforeUpdate.title,
        };

        const fieldsAfterUpdate = {
            documentId: bodyAfterUpdate.documentId,
            id: bodyAfterUpdate.id,
            title: bodyAfterUpdate.title,
        };
        await step('Verify that fields documentId, userId and title not changed after update', async () => {
            expect(fieldsBeforeUpdate).toEqual(fieldsAfterUpdate);
        });
    });
});
