import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import {
    signInRequest,
    addTeamMemberRequest,
    getUserIdByCredentials,
    upgradeTeamMemberRoleRequest,
} from '../helpers/apiCalls';
import { EMAIL_SUBJECTS, TOAST_MESSAGE, JIRA_LINK, TEAM_MEMBER_ROLES } from '../testData';
import { description, tag, severity, Severity, epic, step, link } from 'allure-js-commons';
import { retrieveUserEmailConfirmationLink, retrievePasswordFromEmail } from '../helpers/utils';
import { dbGetUserRole } from '../helpers/dbUtils';
import { addTeamMemberRequestPrecondition } from '../helpers/preconditions';

test.describe('Teams API', () => {
    const teamMemberRoles = Object.values(TEAM_MEMBER_ROLES);
    teamMemberRoles.forEach((role) => {
        test(`SP25/SP35/1 | Verify if a business user can add team member with role ${role} user via API`, async ({
            createBusinessUserAndLogin,
            request,
            page,
            signPage,
            teamsAcceptInvitePage,
            teamPage,
        }) => {
            await description('Verify if a business user can add team member via API');
            await severity(Severity.NORMAL);
            await epic('Team');
            await tag('API');
            await link(`${JIRA_LINK}SP-35`, 'Jira task link');

            test.setTimeout(90000);
            const teamMemberData = {
                email: `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${process.env.EMAIL_DOMAIN}`,
                name: `${process.env.NEW_USER_NAME}${'_teammember'}`,
                role: role.toLowerCase(),
            };

            await signInRequest(request);
            const response = await addTeamMemberRequest(request, teamMemberData);

            await step('Verify response code for a folder creation request is successful.', async () => {
                expect(response.status()).toBe(201);
            });

            const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
            const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberData.email, emailSubject);
            await step('Navigate to Invite link', async () => {
                await page.goto(inviteLink);
            });
            await teamsAcceptInvitePage.clickBackToMainPageButton();
            await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
            await signPage.sideMenu.clickTeam();

            await step('Verify team member is listed in Team table.', async () => {
                expect(await teamPage.exactTeamMember(teamMemberData.email)).toBeVisible();
            });

            await step(`Verify team member has role user set in the Team table`, async () => {
                await expect(await teamPage.teamMemberRoleForExactTeamMember(teamMemberData.email)).toHaveText(role);
            });
        });
    });

    test(`SP25/SP53/1 | Verify if a business user can upgrade "User" team member to "Admin": API, DB`, async ({
        createBusinessUserAndLogin,
        request,
        page,
        teamsAcceptInvitePage,
        signPage,
        teamPage,
    }) => {
        test.setTimeout(90000);
        const teamMemberData = {
            email: `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${process.env.EMAIL_DOMAIN}`,
            name: `${process.env.NEW_USER_NAME}${'_teammember'}`,
            role: TEAM_MEMBER_ROLES.user.toLowerCase(),
        };
        const expectedRole = TEAM_MEMBER_ROLES.admin;

        await addTeamMemberRequestPrecondition(teamMemberData, request, page, teamsAcceptInvitePage);

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const teamMemberPassword = await retrievePasswordFromEmail(teamMemberData.email, emailSubject);
        const teamMemberID = await getUserIdByCredentials(request, teamMemberData.email, teamMemberPassword);
        await signInRequest(request);
        await upgradeTeamMemberRoleRequest(request, teamMemberData, teamMemberID);
        const updatedRole = await dbGetUserRole(teamMemberData.email);

        await step(`Verify team member has "Admin" role user set via database`, async () => {
            expect(updatedRole).toBe(expectedRole.toLowerCase());
        });

        await signPage.sideMenu.clickTeam();

        await step(`Verify team member has role user set in the Team table`, async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMember(teamMemberData.email)).toHaveText(
                expectedRole
            );
        });
    });
});
