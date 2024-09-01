import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { signInRequest, getAllDocumentsviaAPI, getDocumentsEndPoint } from '../helpers/apiCalls';
import { FOLDER_NAME, JIRA_LINK } from '../testData';
import { description, tag, severity, Severity, epic, step, link, feature } from 'allure-js-commons';
import { API_URL_END_POINTS } from '../apiData';

test.describe('Document API', () => {
    test(`SP/SP/1 | Verify creation of a documents via API`, async ({
        createFreeUserAndLogin,
        request,
        signPage,
        documentsPage,
    }) => {
        await description('Verify if a list of documents can be get via API') 
            await severity(Severity.NORMAL);
            await epic('Document');
            await feature('Document');
            await tag('API');
            await link(`${JIRA_LINK}SP-??`, 'Jira task link');
    
            await signInRequest(request);
    
            await step('Verify response code for a document list is successful.', async () => {
                const response = await createDocumentsviaAPI(request);
            })
        })

        test(`SP/SP/1 | Verify if a list of documents can be get via API`, async ({
            createFreeUserAndLogin,
            request,
            signPage,
            documentsPage,
        }) => {
            await description('Verify if a list of documents can be get via API') 
                await severity(Severity.NORMAL);
                await epic('Document');
                await feature('Document');
                await tag('API');
                await link(`${JIRA_LINK}SP-??`, 'Jira task link');
        
                await signInRequest(request);
        
                await step('Verify response code for a document list is successful.', async () => {
                    const responseDocuments = await getAllDocumentsviaAPI(request);
                    const responseBody = await responseDocuments.json();

                    console.log("JSON: " + responseBody);
                    expect(responseDocuments.status()).toBe(200);
            });
        });
    })

