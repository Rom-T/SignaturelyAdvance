import { createNewClient } from '../dbClient.js';
import { step } from 'allure-js-commons';

export async function dbEditDocumentStatus(status, documentId) {
    await step('DataBase query: Change status of the document to "expired"', async () => {
        if (!documentId) {
            console.warn(`Invalid documentId: ${documentId}`);
        }
        const client = createNewClient();
        await client.connect();
        const query = `UPDATE public.documents  
                    SET "status" = '${status}'
                    WHERE "id" = '${documentId}'`;
        try {
            await client.query(query);
            console.log(`The status of document ${documentId} has been successfully changed to "${status}".`);
        } catch (err) {
            console.error(err.message);
            throw err;
        } finally {
            await client.end();
        }
    });
}

export async function dbGetUserRole(userEmail) {
    return await step("DataBase query: Get user's team role", async () => {
        if (!userEmail) {
            throw new Error('Invalid email provided');
        }
        const client = createNewClient();
        await client.connect();
        const query = `SELECT "role"
                    FROM public.users
                    WHERE "email" = '${userEmail}'`;
        try {
            const result = await client.query(query);
            if (result.rows.length === 0) {
                throw new Error('No role found for the given email');
            }
            const updatedRole = await result.rows[0].role;
            return updatedRole;

        } catch (err) {
            console.error(err.message);
            throw err;
        } finally {
            await client.end();
        }
    });
}
